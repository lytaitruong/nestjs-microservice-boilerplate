import type { Multipart } from '@fastify/multipart'
import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import type { FastifyRequest } from 'fastify'
import { isArray } from 'lodash'
import { Observable, map } from 'rxjs'

@Injectable()
export class UploadInterceptor<T> implements NestInterceptor<T> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    const req: FastifyRequest = context.switchToHttp().getRequest()

    if (!req.isMultipart())
      throw new BadRequestException({
        code: `0000`,
        message: `content-type must be multipart/form-data`,
        status: HttpStatus.BAD_REQUEST,
      })
    for (const key in req.body as Record<string, Multipart | Multipart>) {
      const data: Partial<Multipart | Multipart[]> = (req.body as Record<string, Multipart | Multipart>)[key]
      if (!isArray(data)) delete data.fields
      else {
        data.forEach((item: Partial<Multipart>) => {
          delete item.fields
        })
      }
    }
    return next.handle().pipe(map((data: T) => data))
  }
}
