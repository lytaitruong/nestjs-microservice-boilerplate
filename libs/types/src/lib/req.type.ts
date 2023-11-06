export enum Sort {
  ASC = 'asc',
  DESC = 'desc',
}

export interface IPaginationQueryParams<T> {
  page: number
  size: number
  lang?: string
  sort?: { [data in keyof T]: Sort }
  filter?: keyof T[]
  search?: string
  export?: boolean
}

export type IPaginationReq<T> = Partial<T> & IPaginationQueryParams<T>
