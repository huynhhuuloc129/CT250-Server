import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	@Post('login')
	login() {
		return 'login here';
	}

	@Post('signup')
	signup() {
		return 'signup here';
	}

	@Post('logout')
	logout() {
		return 'logout';
	}

	@Post('refresh')
	refreshTokens() {
		return 'refreshTokens';
	}
}
