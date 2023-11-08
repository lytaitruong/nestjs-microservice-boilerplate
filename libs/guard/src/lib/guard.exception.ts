import type { IAppError } from '@libs/common'
import { HttpStatus } from '@nestjs/common'

export type GuardCode =
  | 'FORBIDDEN_RESOURCE'
  | 'ACCESS_TOKEN_REQUIRE'
  | 'ACCESS_TOKEN_EXPIRED'
  | 'ACCESS_TOKEN_INVALID'
  | 'ACCESS_TOKEN_CLAIMS_BEFORE'
  | 'REFRESH_TOKEN_REQUIRE'
  | 'REFRESH_TOKEN_EXPIRED'
  | 'REFRESH_TOKEN_INVALID'
  | 'REFRESH_TOKEN_CLAIMS_BEFORE'

export const GUARD_ERROR: Record<GuardCode, IAppError> = {
  FORBIDDEN_RESOURCE: {
    code: `1000`,
    message: `Your don't have enough permission to access this resource`,
    status: HttpStatus.FORBIDDEN,
  },
  ACCESS_TOKEN_REQUIRE: {
    code: `1001`,
    message: `Require access token in header`,
    status: HttpStatus.UNAUTHORIZED,
  },
  ACCESS_TOKEN_EXPIRED: {
    code: `1002`,
    message: `Your access token has been expired`,
    status: HttpStatus.UNAUTHORIZED,
  },
  ACCESS_TOKEN_INVALID: {
    code: `1003`,
    message: `Your access token has been invalid`,
    status: HttpStatus.UNAUTHORIZED,
  },
  ACCESS_TOKEN_CLAIMS_BEFORE: {
    code: `1004`,
    message: `Your access token has been claims before create`,
    status: HttpStatus.UNAUTHORIZED,
  },
  REFRESH_TOKEN_REQUIRE: {
    code: `1005`,
    message: `Require refresh token in header`,
    status: HttpStatus.UNAUTHORIZED,
  },
  REFRESH_TOKEN_EXPIRED: {
    code: `1006`,
    message: `Your refresh token has been expired`,
    status: HttpStatus.UNAUTHORIZED,
  },
  REFRESH_TOKEN_INVALID: {
    code: `1007`,
    message: `Your refresh token has been invalid`,
    status: HttpStatus.UNAUTHORIZED,
  },
  REFRESH_TOKEN_CLAIMS_BEFORE: {
    code: `1008`,
    message: `Your Refresh token has been claims before create`,
    status: HttpStatus.UNAUTHORIZED,
  },
}
