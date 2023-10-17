import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { JwtModule } from '@nestjs/jwt';
import { LessorModule } from '../lessor/lessor.module';
import { UsersModule } from '../users/users.module';
import { TenantModule } from '../tenant/tenant.module';

@Module({
	imports: [UsersModule, LessorModule, TenantModule, JwtModule.register({})],
	controllers: [AuthController],
	providers: [AuthService, AccessTokenStategy, RefreshTokenStrategy],
})
export class AuthModule {}
