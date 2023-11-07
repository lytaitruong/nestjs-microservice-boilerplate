import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('healthcheck')
  @ApiTags('healthcheck')
  @ApiOkResponse({ schema: { example: 'Hello API' }, description: 'Server alive' })
  getData() {
    return this.appService.getData()
  }
}
