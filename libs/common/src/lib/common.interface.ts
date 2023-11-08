import type { FastifyReply, FastifyRequest } from 'fastify'
import type { PaginatedResult } from 'prisma-pagination'

export type UUID = string
export type GUID = string
export type CUID = string
export type ISO_DATE = string //YYYY-MM-DDTHH:mm:ss.sssZ
export type MIN_DATE = string //YYYY-MM-DD
export type NUM_DATE = number //Date.now()

export enum Env {
  DEFAULT = 'default',
  STAGING = 'staging',
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export interface IConfigApp {
  port: number
  version: string
  service: string
  whitelist: string[] | '*'
}

export interface IConfigCookie {
  path: string
  domain: string
  secret: string
  secure: boolean
  httpOnly: boolean
}

export interface IConfigSwagger {
  name: string
  pass: string
  enable: boolean
}

export interface IConfigCommon {
  env: Env
  app: IConfigApp
  cookie: IConfigCookie
  swagger: IConfigSwagger
}

export type IReq<T = void> = FastifyRequest & { user: T }
export type IRes = FastifyReply

// CRUD Interface
export type Pag<T> = PaginatedResult<T | Partial<T>>
export type Res<T> = T | Partial<T>
