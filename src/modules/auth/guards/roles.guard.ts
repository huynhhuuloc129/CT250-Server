import {
	Injectable,
	CanActivate,
	ExecutionContext,
	InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { USER_ROLE } from 'src/modules/users/entities/user.entity';
import { ROLES_KEY } from '../decorators/required-roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		try {
			const requiredRoles = this.reflector.getAllAndOverride<USER_ROLE[]>(
				ROLES_KEY,
				[context.getHandler(), context.getClass()],
			);

			if (!requiredRoles) {
				return true;
			}

			const { user } = context.switchToHttp().getRequest();

			return requiredRoles.some((role) => user.role?.includes(role));
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}
}
