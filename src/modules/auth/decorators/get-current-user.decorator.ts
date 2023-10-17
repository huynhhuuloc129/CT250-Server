import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from 'src/modules/users/entities/user.entity';
import { TokenPayload } from '../types/token-payload.type';

export type UserWithTokenPayload = User & TokenPayload;

export const GetCurrentUser = createParamDecorator(
	(data: keyof UserWithTokenPayload | undefined, context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest();
		if (!data) return request.user;

		return request.user[data];
	},
);
