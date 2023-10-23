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
import { RoomingSubscriptionRequestService } from './rooming-subscription-requests.service';
import { CreateRoomingSubscriptionRequestDto } from './dto/create-rooming-subscription-request.dto';
import { GetRoomingSubscriptionRequestDto } from './dto/get-rooming-subscription-request.dto';
import { UpdateRoomingSubscriptionRequestDto } from './dto/update-rooming-subscription-request.dto';

@Controller('rooming-subcription-requests')
@ApiTags('rooming-subcription-requests')
export class RoomingSubscriptionRequestController {
	constructor(
		private readonly roomingSubscriptionRequestService: RoomingSubscriptionRequestService,
	) {}

	@Public()
	@Post()
	@ApiBody({ type: CreateRoomingSubscriptionRequestDto })
	async create(@Body() input: CreateRoomingSubscriptionRequestDto) {
		return await this.roomingSubscriptionRequestService.createOne(input);
	}

	@Public()
	@Get()
	async findAll(@Query() filter: GetRoomingSubscriptionRequestDto) {
		return await this.roomingSubscriptionRequestService.findAll(filter);
	}

	@Public()
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		// relations: { room: true, tenant: true },
		return await this.roomingSubscriptionRequestService.findOneWithRelation({
			where: { id },
			relations: { room: true },
		});
	}

	@Public()
	@Patch(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdateRoomingSubscriptionRequestDto,
	) {
		return await this.roomingSubscriptionRequestService.updateOne(
			{ id },
			input,
		);
	}

	@Public()
	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number) {
		return await this.roomingSubscriptionRequestService.deleteOne({ id });
	}
}
