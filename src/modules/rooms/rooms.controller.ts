import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/utils';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsService } from './rooms.service';

@Controller('rooms')
@ApiTags('rooms')
export class RoomsController {
	constructor(private readonly roomService: RoomsService) {}

	// @Public()
	// @Get()
	// findAll(@Query() filter: GetRoomingHouseDto) {
	// 	return filter;
	// }

	@Public()
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return await this.roomService.findOneWithRelation({
			where: { id },
			relations: { roomingHouse: true },
		});
	}

	@Public()
	@Get(':id/secondDescriptionOfRoom')
	async secondDescriptionOfRoom(@Param('id', ParseIntPipe) id: number) {
		return await this.roomService.secondDescriptionOfRoom(id);
	}

	// @Public()
	// @Post()
	// @ApiBody({ type: CreateRoomingHouseDto })
	// create(@Body() input: CreateRoomingHouseDto) {
	// 	return input;
	// }

	// @Public()
	// @Post(':id/rooms')
	// @ApiBody({ type: CreateRoomDto })
	// createRoom(
	// 	@Body() input: CreateRoomDto,
	// 	@Param('id', ParseIntPipe) id: number,
	// ) {
	// 	return { id, input };
	// }

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
