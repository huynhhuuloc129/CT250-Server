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
import { RoomDescriptionService } from './room-descriptions.service';
import { DefaultListDto } from 'src/shared/dtos/default-list.dto';
import { UpdateRoomDescriptionDto } from './dto/update-room-description.dto';
import { CreateRoomDescriptionDto } from './dto/create-room-description.dto';

@Controller('room-descriptions')
@ApiTags('room-descriptions')
export class RoomDescriptionController {
	constructor(
		private readonly roomDescriptionService: RoomDescriptionService,
	) {}

	@Public()
	@Post()
	@ApiBody({ type: CreateRoomDescriptionDto })
	async create(@Body() input: CreateRoomDescriptionDto) {
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

	@Public()
	@Patch(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdateRoomDescriptionDto,
	) {
		return await this.roomDescriptionService.updateOne({ id }, input);
	}

	@Public()
	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number) {
		return await this.roomDescriptionService.deleteOne({ id });
	}
}
