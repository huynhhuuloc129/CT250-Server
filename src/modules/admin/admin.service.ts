import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UsersService } from '../users/users.service';
import { USER_ROLE, User } from '../users/entities/user.entity';

@Injectable()
export class AdminService {
	constructor(private usesrService: UsersService) {}
	async createOneAdmin(createDto: CreateAdminDto): Promise<User> {
		return await this.usesrService.createOne({
			...createDto,
			role: USER_ROLE.ADMIN,
		});
	}
}
