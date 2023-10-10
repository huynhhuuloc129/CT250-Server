import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/utils';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsService } from './rooms.service';
import { GetRoomDto } from './dto/get-room.dto';

@Controller('rooms')
@ApiTags('rooms')
export class RoomsController {
	constructor(private readonly roomService: RoomsService) {}

	@Public()
	@Get()
	async findAll(@Query() filter: GetRoomDto) {
		return await this.roomService.findAll(filter);
	}

	@Public()
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return await this.roomService.findOneWithRelation({
			where: { id },
			relations: { roomingHouse: true },
		});
	}

	@Public()
	@Patch(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateRoomDto: UpdateRoomDto,
	) {
		return { id, updateRoomDto };
	}

	// @Public()
	// @Delete(':id')
	// remove(@Param('id', ParseIntPipe) id: number) {
	// 	return id;
	// }
}
