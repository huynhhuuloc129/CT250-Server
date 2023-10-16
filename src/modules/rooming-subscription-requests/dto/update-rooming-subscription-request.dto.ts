import { PickType } from '@nestjs/swagger';
import { CreateRoomingSubscriptionRequestDto } from './create-rooming-subscription-request.dto';

export class UpdateRoomingSubscriptionRequestDto extends PickType(
	CreateRoomingSubscriptionRequestDto,
	['state'],
) {}
