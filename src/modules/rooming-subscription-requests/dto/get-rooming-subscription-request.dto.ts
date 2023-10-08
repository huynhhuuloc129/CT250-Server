import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { DefaultListDto } from 'src/shared/dtos/default-list.dto';
import { ROOMING_SUBSCRIPTION_REQUEST_STATE } from 'src/shared/enums/common.enum';

export class GetRoomingSubscriptionRequestDto extends DefaultListDto {
	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	roomID?: number;

	@ApiProperty({
		required: false,
		enum: ROOMING_SUBSCRIPTION_REQUEST_STATE,
	})
	@IsOptional()
	@IsEnum(ROOMING_SUBSCRIPTION_REQUEST_STATE)
	state?: ROOMING_SUBSCRIPTION_REQUEST_STATE;
}
