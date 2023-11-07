import { ErrorType, IError } from '@libs/types'
import { HttpException, HttpStatus } from '@nestjs/common'

export interface IAppError {
  code: string
  status: HttpStatus
  message: string
}

export class AppException extends HttpException {
  constructor(private readonly error: IAppError) {
    super(error, error.status)
  }

  override getResponse(): IError {
    return {
      type: ErrorType.REST,
      code: this.error.code,
      time: new Date().toISOString(),
      message: this.error.message,
    }
  }
}
