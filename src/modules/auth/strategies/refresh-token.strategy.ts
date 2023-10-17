import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../types/token-payload.type';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { TokenPayloadWithRefreshToken } from '../types/token-payload-refresh.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
	Strategy,
	'jwt-refresh',
) {
	constructor(private configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get('JWT_REFRESH_SECRET'),
			passReqToCallback: true,
		});
	}
	async validate(
		req: Request,
		payload: TokenPayload,
	): Promise<TokenPayloadWithRefreshToken> {
		const refreshToken = req.headers.authorization.split(' ')[1];
		return { ...payload, refreshToken };
	}
}
