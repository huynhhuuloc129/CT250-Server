import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ROOMING_SUBSCRIPTION_REQUEST_STATE } from 'src/shared/enums/common.enum';

export class CreateRoomingSubscriptionRequestDto {
	@ApiHideProperty()
	@IsOptional()
	lessorId?: number;

	@ApiProperty()
	@IsNumber()
	roomId: number;

	@ApiProperty({
		enum: ROOMING_SUBSCRIPTION_REQUEST_STATE,
	})
	@IsEnum(ROOMING_SUBSCRIPTION_REQUEST_STATE)
	state: ROOMING_SUBSCRIPTION_REQUEST_STATE;
}
