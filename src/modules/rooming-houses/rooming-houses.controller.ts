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

@Controller('rooming-houses')
@ApiTags('rooming-houses')
export class RoomingHousesController {
	constructor(private readonly roomingHousesService: RoomingHousesService) {}

	@Public()
	@Get()
	findAll(@Query() filter: GetRoomingHouseDto) {
		return filter;
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
		return await this.roomingHousesService.createOne(input);
	}

	@Public()
	@Post(':id/rooms')
	@ApiBody({ type: CreateRoomDto })
	async createRoom(
		@Body() input: CreateRoomDto,
		@Param('id', ParseIntPipe) id: number,
	) {
		input.roomingHouseID = id;
		return await this.roomingHousesService.createRoom(input);
	}

	@Public()
	@Patch(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateCategoryDto: UpdateRoomingHouseDto,
	) {
		return updateCategoryDto;
	}

	@Public()
	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return id;
	}
}
