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

@Controller('rooming-houses')
@ApiTags('rooming-houses')
export class RoomingHousesController {
	@Public()
	@Get()
	findAll(@Query() filter: GetRoomingHouseDto) {
		return filter;
	}

	@Public()
	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return id;
	}

	@Public()
	@Post()
	@ApiBody({ type: CreateRoomingHouseDto })
	create(@Body() input: CreateRoomingHouseDto) {
		return input;
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
