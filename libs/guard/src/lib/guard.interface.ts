import type { JwtPayload } from 'jsonwebtoken'

export enum GuardType {
  JWT_ACCESS = 'jwt-access',
  JWT_REFRESH = 'jwt-refresh',
  JWT_ROLE = 'jwt-role',
}

export interface IConfigJwt {
  accessSecret: string
  accessPublic: string
  accessMaxAge: number
  refreshSecret: string
  refreshPublic: string
  refreshMaxAge: number
}

export type JwtInfo = Omit<JwtPayload, 'sub'> & {
  sub: string
  role: string
  device: string

  iat?: number
  exp?: number
}
