import {
	Controller,
	Get,
	NotFoundException,
	Param,
	ParseIntPipe,
	Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/utils';
import { RoomingSubscriptionRequestService } from './rooming-subscription-requests.service';
import { GetRoomingSubscriptionRequestDto } from './dto/get-rooming-subscription-request.dto';

@Controller('rooming-subcription-requests')
@ApiTags('rooming-subcription-requests')
export class RoomingSubscriptionRequestController {
	constructor(
		private readonly roomingSubscriptionRequestService: RoomingSubscriptionRequestService,
	) {}

	@Public()
	@Get()
	async findMany(@Query() filter: GetRoomingSubscriptionRequestDto) {
		return await this.roomingSubscriptionRequestService.findManyRSRequest(
			filter,
		);
	}

	@Public()
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		const data =
			await this.roomingSubscriptionRequestService.findOneWithRelation({
				where: { id },
				relations: { room: true, tenant: true },
			});
		if (!data) {
			throw new NotFoundException('rooming subscription request not found');
		}
		return data;
	}
}
