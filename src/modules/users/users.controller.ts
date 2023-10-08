import { Controller, Get, Patch, Delete, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
	@Get()
	getMany() {
		return 'get list user';
	}

	@Get(':userID')
	getOneByID() {
		return 'get user by id';
	}

	@Post()
	createOne() {
		return 'createOne';
	}

	@Patch(':userID')
	updateOneByID() {
		return 'updateOne';
	}

	@Delete(':userID')
	deleteOneByID() {
		return 'updateOne';
	}
}
