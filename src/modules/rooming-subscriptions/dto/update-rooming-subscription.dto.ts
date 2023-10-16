import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { ROOMING_SUBSCRIPTION_STATE } from 'src/shared/enums/common.enum';

export class UpdateRoomingSubscriptionDto {
	@ApiProperty()
	@IsOptional()
	@IsDateString()
	endDate?: Date;

	@ApiProperty({
		enum: ROOMING_SUBSCRIPTION_STATE,
	})
	@IsOptional()
	@IsEnum(ROOMING_SUBSCRIPTION_STATE)
	state?: ROOMING_SUBSCRIPTION_STATE;
}
