import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Public } from '../auth/utils';
import { User } from '../users/entities/user.entity';

@Controller('admin')
@ApiTags('admin')
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@Post()
	@Public()
	@ApiOperation({ summary: 'Create one admin user' })
	async createOne(@Body() createDto: CreateAdminDto): Promise<User> {
		return await this.adminService.createOneAdmin(createDto);
	}
}
