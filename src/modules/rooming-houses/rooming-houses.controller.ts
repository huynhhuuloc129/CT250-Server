import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
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
	async findMany(@Query() filter: GetRoomingHouseDto) {
		return await this.roomingHousesService.findManyRoomingHouse(filter);
	}

	@Public()
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		const data = await this.roomingHousesService.findOneWithRelation({
			where: { id },
			relations: {
				category: true,
				lessor: { user: true },
				photos: true,
				rooms: true,
				ward: { districtCode: { provinceCode: true } },
			},
		});
		if (!data) {
			throw new NotFoundException('roomingHouse not found');
		}
		return data;
	}

	@Post()
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	async create(
		@Body() input: CreateRoomingHouseDto,
		@GetCurrentUser() user: User,
	) {
		input.lessorId = user.id;
		return await this.roomingHousesService.createRoomingHouse(input);
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
		console.log(user);
		return await this.roomingHousesService.deleteRoomingHouse(id);
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
		input.lessorId = user.id;
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

	@Delete(':roomingHouseId/rooms:roomId')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	async removeRoom(
		@Param('roomingHouseId', ParseIntPipe) roomingHouseId: number,
		@Param('roomId', ParseIntPipe) roomId: number,
		@GetCurrentUser() user: User,
	) {
		console.log(user);
		return await this.roomingHousesService.deleteRoom(roomingHouseId, roomId);
	}
}
