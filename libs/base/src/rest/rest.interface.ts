import { Pag, Res } from '@libs/common'
import { Readable } from 'stream'

export type Str = { name: string; data: Readable }
export interface IRestService<Result, Create, Update, Params, Query, Info> {
  getAll(info: Info, param: Params, query: Query): Promise<Pag<Result> | Str>
  create(info: Info, param: Params, data: Create): Promise<Res<Result>>
  update(info: Info, param: Params, data: Update): Promise<Res<Result>>
  getOne(info: Info, param: Params): Promise<Res<Result> | null>
  remove(info: Info, param: Params): Promise<Res<Result> | null>
}
