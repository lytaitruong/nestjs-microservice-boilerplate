import { ErrorType, IError } from '@libs/types'
import { HttpStatus, Type, applyDecorators } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { IAppError } from '../common.error'

export const ApiPassedRes = <DataDto extends Type<unknown>>(dataDto: DataDto, status: HttpStatus = 200) => {
  return ApiResponse({ type: dataDto, status })
}

export const ApiFailedRes = (...schemas: IAppError[]) => {
  const mapping = (schema: IAppError, time = new Date().toISOString()): IError => {
    return {
      time,
      type: ErrorType.REST,
      code: schema.code,
      message: schema.message,
    }
  }
  return applyDecorators(
    ApiResponse({
      status: schemas[0].status,
      content: {
        'application/json': {
          examples: schemas.reduce((list, schema) => ({ ...list, [schema.code]: { value: mapping(schema) } }), {}),
        },
      },
    }),
  )
}
