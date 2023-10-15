import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from './dto/create-admin.dto';
import { USER_ROLE, User } from '../users/entities/user.entity';
import { RequiredRoles } from '../auth/decorators/required-roles.decorator';

@Controller('admin')
@ApiTags('admin')
@ApiBearerAuth('bearer')
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@Post()
	@RequiredRoles(USER_ROLE.ADMIN)
	@ApiOperation({ summary: 'Create one admin user' })
	async createOne(@Body() createDto: CreateAdminDto): Promise<User> {
		return await this.adminService.createOneAdmin(createDto);
	}
}
