import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Prisma, PrismaClient } from '@prisma/user'

@Injectable()
export class PrismaUserService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'beforeExit'>
  implements OnModuleInit
{
  private readonly logger = new Logger(PrismaUserService.name)

  constructor(private readonly config: ConfigService) {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
      errorFormat: 'colorless',
    })
    if (this.config.get('env') === 'default') {
      super.$on('query', (event: Prisma.QueryEvent) => {
        this.logger.log('Query: ' + event.query)
        this.logger.log('Duration: ' + event.duration + 'ms')
      })
    }
  }
  async onModuleInit() {
    await this.$connect()
  }
}
