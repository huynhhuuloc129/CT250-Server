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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/utils';
import { CreateRoomingHouseDto } from './dto/create-rooming-house.dto';
import { UpdateRoomingHouseDto } from './dto/update-rooming-house.dto';
import { GetRoomingHouseDto } from './dto/get-rooming-house.dto';
import { CreateRoomDto } from '../rooms/dto/create-room.dto';
import { RoomingHousesService } from './rooming-houses.service';
import { GetRoomDto } from '../rooms/dto/get-room.dto';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';
import { USER_ROLE, User } from '../users/entities/user.entity';
import { RequiredRoles } from '../auth/decorators/required-roles.decorator';

@Controller('rooming-houses')
@ApiTags('rooming-houses')
export class RoomingHousesController {
	constructor(private readonly roomingHousesService: RoomingHousesService) {}

	@Public()
	@Get()
	async findAll(@Query() filter: GetRoomingHouseDto) {
		return await this.roomingHousesService.findAll(filter);
	}

	@Public()
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return await this.roomingHousesService.findOne({ id });
	}

	@Post()
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	async create(
		@Body() input: CreateRoomingHouseDto,
		@GetCurrentUser() user: User,
	) {
		//TODO: add tenant
		input.tenantId = user.id;
		return await this.roomingHousesService.createOne(input);
	}

	@Patch(':id')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdateRoomingHouseDto,
		@GetCurrentUser() user: User,
	) {
		console.log(user);
		return await this.roomingHousesService.updateOne({ id }, input);
	}

	@Delete(':id')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	async remove(
		@Param('id', ParseIntPipe) id: number,
		@GetCurrentUser() user: User,
	) {
		//TODO: delete room before deleting roomingHouse
		console.log(user);
		return await this.roomingHousesService.deleteOne({ id });
	}

	//NOTE: ROOM
	@Post(':roomingHouseId/rooms')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	async createRoom(
		@Param('roomingHouseId', ParseIntPipe) roomingHouseId: number,
		@Body() input: CreateRoomDto,
		@GetCurrentUser() user: User,
	) {
		//TODO: create many room description
		console.log(user);
		return await this.roomingHousesService.createRoom(roomingHouseId, input);
	}

	@Public()
	@Get(':roomingHouseId/rooms')
	async findManyRoom(
		@Param('roomingHouseId', ParseIntPipe) roomingHouseId: number,
		@Query() filter: GetRoomDto,
	) {
		return await this.roomingHousesService.findManyRoom(roomingHouseId, filter);
	}
}
