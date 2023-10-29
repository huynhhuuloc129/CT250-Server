import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { ROOMING_SUBSCRIPTION_STATE } from 'src/shared/enums/common.enum';

export class CreateRoomingSubscriptionDto {
	@ApiProperty()
	@IsNumber()
	tenantId: number;

	@ApiProperty()
	@IsNumber()
	roomId: number;

	@ApiProperty({
		enum: ROOMING_SUBSCRIPTION_STATE,
	})
	@IsEnum(ROOMING_SUBSCRIPTION_STATE)
	state: ROOMING_SUBSCRIPTION_STATE;
}
