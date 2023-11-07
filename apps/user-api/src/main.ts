import compression from '@fastify/compress'
import cookie from '@fastify/cookie'
import csrf from '@fastify/csrf-protection'
import helmet from '@fastify/helmet'
import upload from '@fastify/multipart'
import {
  CORS,
  Env,
  IConfigApp,
  IConfigCookie,
  IConfigSwagger,
  configSwagger,
  helmetSetting,
  uploadSetting,
} from '@libs/common'
import { PrismaClientExceptionFilter } from '@libs/prisma-user'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { randomUUID } from 'crypto'
import { Logger } from 'nestjs-pino'
import { AppModule } from './app/app.module'

async function bootstrap() {
  const adapter = new FastifyAdapter({ logger: false, genReqId: (req) => req.id ?? randomUUID() })
  //! TL'RD: Because Fastify not allow body be serialized inside req method
  //* Reference: https://fastify.dev/docs/v2.15.x/Documentation/Logging/#logging
  adapter.getInstance().addHook('preHandler', (req, res, next) => {
    if (req.body) logger.log({ body: req.body })
    next()
  })

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter, { bufferLogs: true, rawBody: true })
  const config = app.get(ConfigService)
  const logger = app.get(Logger)
  // CONFIG
  const { port, version, service, whitelist } = config.get<IConfigApp>('app')
  const { domain, path, secret, secure, httpOnly } = config.get<IConfigCookie>('cookie')
  // PLUGIN
  app.setGlobalPrefix(`/api/${version}`)
  app.register(helmet, helmetSetting)
  app.register(upload, uploadSetting)
  app.register(cookie, { secret, parseOptions: { sameSite: 'strict', domain, path, secure, httpOnly } })
  app.register(compression, { encodings: ['gzip', 'deflate'] })
  app.register(csrf, {
    sessionPlugin: '@fastify/cookie',
    csrfOpts: { hmacKey: secret },
    cookieOpts: { sameSite: 'strict', httpOnly, secure, signed: true },
    getToken: (req) => req.headers['xsrf-token'] as string | void,
  })
  // GLOBAL MIDDLEWARE
  app.useLogger(logger)
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
  app.useGlobalFilters(new PrismaClientExceptionFilter())
  // SWAGGER
  if (config.get<Env>('env') !== Env.PRODUCTION) {
    configSwagger(app, version, service, config.get<IConfigSwagger>('swagger'))
  }
  // CORS
  app.enableCors(CORS(whitelist))
  // EXIT
  app.enableShutdownHooks()
  // START
  await app.listen(port, '0.0.0.0')
  logger.log(`🚀 Application is running on: http://localhost:${port}/api/${version}`)
}
bootstrap()
