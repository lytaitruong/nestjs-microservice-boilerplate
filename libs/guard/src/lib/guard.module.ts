import { Module } from '@nestjs/common'
import { ConfigModule, registerAs } from '@nestjs/config'
import { JwtAccessStrategy } from './jwt/access.guard'
import { JwtRefreshStrategy } from './jwt/refresh.guard'

@Module({
  imports: [
    ConfigModule.forFeature(
      registerAs('guard', () => ({
        accessPublic: process.env.JWT_ACCESS_PUBLIC,
        refreshPublic: process.env.JWT_REFRESH_PUBLIC,
      })),
    ),
  ],
  exports: [JwtAccessStrategy, JwtRefreshStrategy],
  providers: [JwtAccessStrategy, JwtRefreshStrategy],
})
export class GuardModule {}
