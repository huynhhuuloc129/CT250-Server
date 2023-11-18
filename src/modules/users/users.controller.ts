import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { USER_ROLE, User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';
import { RequiredRoles } from '../auth/decorators/required-roles.decorator';
import { Public } from '../auth/utils';

@Controller('users')
@ApiTags('users')
export class UsersController {
	constructor(private usersService: UsersService) {}
	@Get()
	@RequiredRoles(USER_ROLE.ADMIN)
	@ApiBearerAuth('bearer')
	@ApiOperation({ summary: 'Find many user' })
	async findMany(): Promise<User[]> {
		return await this.usersService.findMany();
	}

	@Get('me')
	@ApiBearerAuth('bearer')
	@ApiOperation({ summary: 'Get current user' })
	findMe(@GetCurrentUser() user: User) {
		return user;
	}

	@Get(':userId')
	@Public()
	@ApiOperation({ summary: 'Find one user' })
	async findOneById(
		@Param('userId', ParseIntPipe) userId: number,
	): Promise<User> {
		return await this.usersService.findOneById(userId);
	}

	@Patch(':userId')
	// @RequiredRoles(USER_ROLE.ADMIN)
	@ApiBearerAuth('bearer')
	@ApiOperation({ summary: 'Upate one user' })
	async updateOneByID(
		@Param('userId', ParseIntPipe) userId: number,
		@Body() updateDto: UpdateUserDto,
	): Promise<User> {
		return await this.usersService.updateOneByCondititon(
			{ id: userId },
			updateDto,
		);
	}

	@Delete(':userId')
	@RequiredRoles(USER_ROLE.ADMIN)
	@ApiOperation({ summary: 'Delete one user' })
	deleteOneByID(
		@Param('userId', ParseIntPipe) userId: number,
	): Promise<object> {
		return this.usersService.deleteOneById(userId);
	}
}
