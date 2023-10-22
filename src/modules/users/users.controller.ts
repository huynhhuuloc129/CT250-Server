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
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';

@Controller('users')
@ApiTags('users')
export class UsersController {
	constructor(private usersService: UsersService) {}
	@Get()
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
	@ApiOperation({ summary: 'Find one user' })
	async findOneById(
		@Param('userId', ParseIntPipe) userId: number,
	): Promise<User> {
		return await this.usersService.findOneById(userId);
	}

	@Patch(':userId')
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
	@ApiOperation({ summary: 'Delete one user' })
	deleteOneByID(
		@Param('userId', ParseIntPipe) userId: number,
	): Promise<object> {
		return this.usersService.deleteOneById(userId);
	}
}
