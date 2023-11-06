export enum ErrorType {
  REST = 'rest',
  GRPC = 'grpc',
  GRAPHQL = 'graphql',
}

export interface IError {
  type: ErrorType
  time: string // ISO_DATE
  code: string
  message: string
}
