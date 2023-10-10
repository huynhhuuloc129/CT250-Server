import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { ROOMING_SUBSCRIPTION_REQUEST_STATE } from 'src/shared/enums/common.enum';

export class CreateRoomingSubscriptionRequestDto {
	@ApiHideProperty()
	@IsOptional()
	lessorId: number;

	@ApiHideProperty()
	@IsOptional()
	roomId: number;

	@ApiProperty({
		enum: ROOMING_SUBSCRIPTION_REQUEST_STATE,
	})
	@IsEnum(ROOMING_SUBSCRIPTION_REQUEST_STATE)
	state: ROOMING_SUBSCRIPTION_REQUEST_STATE;
}
