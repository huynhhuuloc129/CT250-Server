import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ROOMING_SUBSCRIPTION_REQUEST_STATE } from 'src/shared/enums/common.enum';

export class UpdateRoomingSubscriptionRequestDto {
	@ApiProperty({
		enum: ROOMING_SUBSCRIPTION_REQUEST_STATE,
	})
	@IsEnum(ROOMING_SUBSCRIPTION_REQUEST_STATE)
	state: ROOMING_SUBSCRIPTION_REQUEST_STATE;
}
