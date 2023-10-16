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
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/utils';
import { CreateRoomingHouseDto } from './dto/create-rooming-house.dto';
import { UpdateRoomingHouseDto } from './dto/update-rooming-house.dto';
import { GetRoomingHouseDto } from './dto/get-rooming-house.dto';
import { CreateRoomDto } from '../rooms/dto/create-room.dto';
import { RoomingHousesService } from './rooming-houses.service';
import { GetRoomDto } from '../rooms/dto/get-room.dto';

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

	@Public()
	@Post()
	@ApiBody({ type: CreateRoomingHouseDto })
	async create(@Body() input: CreateRoomingHouseDto) {
		//TODO: add tenant
		return await this.roomingHousesService.createOne(input);
	}

	@Public()
	@Patch(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdateRoomingHouseDto,
	) {
		return await this.roomingHousesService.updateOne({ id }, input);
	}

	@Public()
	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number) {
		//TODO: delete room before deleting roomingHouse
		return await this.roomingHousesService.deleteOne({ id });
	}

	//NOTE: ROOM
	@Public()
	@Post(':roomingHouseId/rooms')
	@ApiBody({ type: CreateRoomDto })
	async createRoom(
		@Param('roomingHouseId', ParseIntPipe) roomingHouseId: number,
		@Body() input: CreateRoomDto,
	) {
		//TODO: create many room description
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
