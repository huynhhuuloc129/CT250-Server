import { SetMetadata } from '@nestjs/common';
import { USER_ROLE } from 'src/modules/users/entities/user.entity';

export const ROLES_KEY = 'roles';
export const RequiredRoles = (...roles: USER_ROLE[]) =>
	SetMetadata(ROLES_KEY, roles);
