import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/utils';
import { RoomDescriptionService } from './room-descriptions.service';
import { DefaultListDto } from 'src/shared/dtos/default-list.dto';
import { UpdateRoomDescriptionDto } from './dto/update-room-description.dto';
import { CreateRoomDescriptionDto } from './dto/create-room-description.dto';
import { RequiredRoles } from '../auth/decorators/required-roles.decorator';
import { USER_ROLE, User } from '../users/entities/user.entity';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';

@Controller('room-descriptions')
@ApiTags('room-descriptions')
export class RoomDescriptionController {
	constructor(
		private readonly roomDescriptionService: RoomDescriptionService,
	) {}

	@Post()
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	@ApiBody({ type: CreateRoomDescriptionDto })
	async create(
		@Body() input: CreateRoomDescriptionDto,
		@GetCurrentUser() user: User,
	) {
		console.log(user);
		return await this.roomDescriptionService.createOne(input);
	}

	@Public()
	@Get()
	async findAll(@Query() filter: DefaultListDto) {
		return await this.roomDescriptionService.findAll(filter);
	}

	@Public()
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return await this.roomDescriptionService.findOneWithRelation({
			where: { id },
			relations: { room: true },
		});
	}

	@Patch(':id')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdateRoomDescriptionDto,
		@GetCurrentUser() user: User,
	) {
		console.log(user);
		return await this.roomDescriptionService.updateOne({ id }, input);
	}

	@Delete(':id')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	async remove(
		@Param('id', ParseIntPipe) id: number,
		@GetCurrentUser() user: User,
	) {
		console.log(user);
		return await this.roomDescriptionService.deleteOne({ id });
	}
}
