import { ApiFailedRes } from '@libs/common'
import { Controller, UseGuards, applyDecorators } from '@nestjs/common'
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger'
import { GUARD_ERROR } from './guard.exception'
import { JwtAccessGuard } from './jwt/access.guard'
import { RoleGuard } from './jwt/role.guard'

// ! The order of guard is important, which will be execute first
export const GuardController = (name: string, tags = name) => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiCookieAuth(),
    ApiTags(tags),
    Controller(name),
    UseGuards(JwtAccessGuard, RoleGuard),
    ApiFailedRes(
      GUARD_ERROR.ACCESS_TOKEN_REQUIRE,
      GUARD_ERROR.ACCESS_TOKEN_INVALID,
      GUARD_ERROR.ACCESS_TOKEN_EXPIRED,
      GUARD_ERROR.ACCESS_TOKEN_CLAIMS_BEFORE,
    ),
    ApiFailedRes(GUARD_ERROR.FORBIDDEN_RESOURCE),
  )
}
