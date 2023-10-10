import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { ROOMING_SUBSCRIPTION_STATE } from 'src/shared/enums/common.enum';

export class CreateRoomingSubscriptionDto {
	@ApiHideProperty()
	@IsOptional()
	lessorId: number;

	@ApiHideProperty()
	@IsOptional()
	month: number;

	@ApiHideProperty()
	@IsOptional()
	year: number;

	@ApiHideProperty()
	@IsOptional()
	roomId: number;

	@ApiProperty()
	@IsDateString()
	startDate: Date;

	@ApiProperty()
	@IsDateString()
	endDate: Date;

	@ApiProperty({
		enum: ROOMING_SUBSCRIPTION_STATE,
	})
	@IsEnum(ROOMING_SUBSCRIPTION_STATE)
	state: ROOMING_SUBSCRIPTION_STATE;
}
