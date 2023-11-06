import { Global, Module } from '@nestjs/common'
import { PrismaUserService } from './prisma.service'

@Global()
@Module({
  providers: [PrismaUserService],
  exports: [PrismaUserService],
})
export class PrismaUserModule {}
