import { PartialType } from '@nestjs/swagger';
import { CreateRoomingSubscriptionRequestDto } from './create-rooming-subscription-request.dto';

export class UpdateRoomingSubscriptionRequestDto extends PartialType(
	CreateRoomingSubscriptionRequestDto,
) {}
