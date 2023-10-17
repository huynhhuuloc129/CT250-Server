import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTenantDto } from '../tenant/dto/create-tenant.dto';
import { AuthService } from './auth.service';
import { TokenResponse } from './types/token-response.type';
import { CreateLessorDto } from '../lessor/dto/create-lessor.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './utils';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { GetCurrentUser } from './decorators/get-current-user.decorator';

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth('bearer')
export class AuthController {
	constructor(private authService: AuthService) {}
	@Post('login')
	@Public()
	@ApiOperation({ summary: 'Login account' })
	@ApiBody({
		type: Object,
		examples: {
			admin_1: {
				value: {
					username: 'admin_1',
					password: 'string',
				},
			},
			lessor_1: {
				value: { username: 'lessor_1', password: 'string' },
			},
			tenant_1: {
				value: { username: 'tenant_1', password: 'string' },
			},
		},
	})
	async login(@Body() loginDto: LoginDto): Promise<TokenResponse> {
		return await this.authService.login(loginDto);
	}

	@Post('signup-lessor')
	@Public()
	@ApiOperation({ summary: 'Sign up lessor account' })
	async signupLessor(
		@Body() createDto: CreateLessorDto,
	): Promise<TokenResponse> {
		return await this.authService.signUpLessor(createDto);
	}

	@Post('signup-tenant')
	@Public()
	@ApiOperation({ summary: 'Sign up tenant account' })
	async signupTenant(
		@Body() createDto: CreateTenantDto,
	): Promise<TokenResponse> {
		return await this.authService.signUpTenant(createDto);
	}

	@Post('logout')
	@ApiOperation({ summary: 'Logout current account' })
	async logout(@GetCurrentUser('id') userId: number) {
		return await this.authService.logout(userId);
	}

	@Post('refresh')
	@UseGuards(RefreshTokenGuard)
	@Public()
	@ApiOperation({ summary: 'Refresh Tokens' })
	async refreshTokens(
		@GetCurrentUser('sub') userId: number,
		@GetCurrentUser('refreshToken') refreshToken: string,
	): Promise<TokenResponse> {
		return await this.authService.refreshToken(userId, refreshToken);
	}
}
