export interface IPaginationMeta {
  page: number
  last: number
  size: number
  next: number | null
  prev: number | null
  total: number
  link?: { [key: string]: string }
}

export type IPaginationRes<T> = {
  data: T[]
  meta: IPaginationMeta
}
