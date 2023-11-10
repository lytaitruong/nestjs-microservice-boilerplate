import { Global, Module } from '@nestjs/common'
import { PrismaBookService } from './prisma.service'

@Global()
@Module({
  providers: [PrismaBookService],
  exports: [PrismaBookService],
})
export class PrismaBookModule {}
