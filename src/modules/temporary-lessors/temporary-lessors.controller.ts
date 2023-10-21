import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/utils';
import { TemporaryLessorService } from './temporary-lessors.service';
import { GetTemporaryLessorDto } from './dto/get-temporary-lessors.dto';
import { UpdateTemporaryLessorDto } from './dto/update-temporary-lessors.dto';
import { USER_ROLE, User } from '../users/entities/user.entity';
import { RequiredRoles } from '../auth/decorators/required-roles.decorator';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';

@Controller('temporary-lessors')
@ApiTags('temporary-lessors')
export class TemporaryLessorController {
	constructor(
		private readonly temporaryLessorService: TemporaryLessorService,
	) {}

	@Public()
	@Get()
	async findAll(@Query() filter: GetTemporaryLessorDto) {
		return await this.temporaryLessorService.findAll(filter);
	}

	@Public()
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return await this.temporaryLessorService.findOne({ id });
	}

	@Patch(':id')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdateTemporaryLessorDto,
		@GetCurrentUser() user: User,
	) {
		console.log(user);
		return await this.temporaryLessorService.updateOne({ id }, input);
	}

	@Delete(':id')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	async remove(
		@Param('id', ParseIntPipe) id: number,
		@GetCurrentUser() user: User,
	) {
		console.log(user);
		return await this.temporaryLessorService.deleteOne({ id });
	}
}
