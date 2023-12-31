import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'
import { configuration } from './common.config'
import { Env, IConfigCommon, IReq } from './common.interface'

@Global()
@Module({
  imports: [
    ConfigModule.forFeature(configuration),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<IConfigCommon>) => {
        const { version } = config.get('app')
        return {
          pinoHttp: {
            useLevel: 'info',
            level: config.get('env') !== Env.PRODUCTION ? 'debug' : 'info',
            redact: ['req.headers.authorization', 'req.headers.cookie', 'body.password'],
            autoLogging: {
              ignore: (req) => {
                return (
                  (req as unknown as IReq).originalUrl === `/api/${version}/healthcheck` ||
                  (req as unknown as IReq).originalUrl.startsWith(`/api/${version}/docs`)
                )
              },
            },
            transport: {
              targets: [
                {
                  target: 'pino-pretty',
                  level: 'info',
                  options: {
                    levelFirst: true,
                    singleLine: true,
                    colorize: true,
                    translateTime: "yyyy-mm-dd'T'HH:MM:ss.l'Z'",
                    ignore: 'pid,hostname,context,res,responseTime',
                    errorLikeObjectKeys: ['err', 'error'],
                  },
                },
              ],
            },
            forRoutes: ['*'],
            exclude: [
              `/api/${version}/healthcheck`,
              `/api/${version}/docs`,
              `/api/${version}/docs/swagger-ui-init.js`,
              `/api/${version}/docs/swagger-ui.css`,
              `/api/${version}/docs/swagger-ui-bundle.js`,
              `/api/${version}/docs/swagger-ui-standalone-preset.js`,
              `/api/${version}/docs/favicon-32x32.png`,
            ],
          },
        }
      },
    }),
  ],
})
export class CommonModule {}
