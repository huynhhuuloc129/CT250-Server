import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { TokenPayload } from './types/token-payload.type';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateLessorDto } from '../lessor/dto/create-lessor.dto';
import { LessorService } from '../lessor/lessor.service';
import { TokenResponse } from './types/token-response.type';
import { UsersService } from '../users/users.service';
import { TenantService } from '../tenant/tenant.service';
import { CreateTenantDto } from '../tenant/dto/create-tenant.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
	constructor(
		private configService: ConfigService,
		private jwtService: JwtService,
		private lessorsService: LessorService,
		private tenantsService: TenantService,
		private usersService: UsersService,
	) {}
	async updateRefreshTokenHashed(userId: number, refreshToken: string) {
		const refreshTokenHashed = await this.usersService.hashData(refreshToken);
		await this.usersService.updateOneByCondititon(
			{ id: userId },
			{
				refreshToken: refreshTokenHashed,
			},
		);
	}

	async signTokens(sub: number): Promise<TokenResponse> {
		const tokenPayload: TokenPayload = { sub };

		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(tokenPayload, {
				secret: this.configService.get('JWT_SECRET'),
				expiresIn: this.configService.get('JWT_SECRET_EXPIRES'),
			}),
			this.jwtService.signAsync(tokenPayload, {
				secret: this.configService.get('JWT_REFRESH_SECRET'),
				expiresIn: this.configService.get('JWT_REFRESH_SECRET_EXPIRES'),
			}),
		]).catch(async () => {
			await this.usersService.deleteOneById(sub);
			throw new InternalServerErrorException('Sign token failed');
		});

		return {
			accessToken,
			refreshToken,
		};
	}

	async signUpLessor(createDto: CreateLessorDto): Promise<TokenResponse> {
		const lessor = await this.lessorsService.createOne(createDto);

		const tokenReponse: TokenResponse = await this.signTokens(lessor.user.id);

		await this.updateRefreshTokenHashed(
			lessor.user.id,
			tokenReponse.refreshToken,
		);

		return tokenReponse;
	}

	async signUpTenant(createDto: CreateTenantDto): Promise<TokenResponse> {
		const tenant = await this.tenantsService.createOne(createDto);

		const tokenReponse: TokenResponse = await this.signTokens(tenant.user.id);

		await this.updateRefreshTokenHashed(
			tenant.user.id,
			tokenReponse.refreshToken,
		);

		return tokenReponse;
	}

	async login(loginDto: LoginDto): Promise<TokenResponse> {
		const user = await this.usersService.findOneByCondititon({
			username: loginDto.username,
		});

		if (!user) {
			throw new NotFoundException(
				`Not found user with username: ${loginDto.username}`,
			);
		}

		const isValidPassword = await this.usersService.verifyData(
			user.password,
			loginDto.password,
		);

		if (!isValidPassword) {
			throw new BadRequestException('Password invalid');
		}

		const tokenReponse: TokenResponse = await this.signTokens(user.id);

		await this.updateRefreshTokenHashed(user.id, tokenReponse.refreshToken);

		return tokenReponse;
	}

	async logout(userId: number): Promise<boolean> {
		const user = await this.usersService.findOneById(userId);

		if (user.refreshToken === null) {
			throw new BadRequestException('User already logout');
		}

		await this.usersService.updateOneByCondititon(
			{ id: userId },
			{ refreshToken: null },
		);

		return true;
	}

	async refreshToken(
		userId: number,
		refreshToken: string,
	): Promise<TokenResponse> {
		const user = await this.usersService.findOneById(userId);
		if (!user.refreshToken) throw new UnauthorizedException('Unauthorized');

		const isValid = await this.usersService.verifyData(
			user.refreshToken,
			refreshToken,
		);

		if (!isValid) throw new UnauthorizedException('Unauthorized');

		const tokenReponse: TokenResponse = await this.signTokens(user.id);

		await this.updateRefreshTokenHashed(user.id, tokenReponse.refreshToken);

		return tokenReponse;
	}
}
