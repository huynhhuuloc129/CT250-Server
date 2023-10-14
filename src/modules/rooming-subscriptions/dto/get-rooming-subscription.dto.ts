import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { DefaultListDto } from 'src/shared/dtos/default-list.dto';
import { ROOMING_SUBSCRIPTION_STATE } from 'src/shared/enums/common.enum';

export class GetRoomingSubscriptionDto extends DefaultListDto {
	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	lessorId?: number;

	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	roomId?: number;

	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	month?: number;

	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	year?: number;

	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@Type(() => Date)
	@IsDate()
	startDate?: Date;

	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@Type(() => Date)
	@IsDate()
	endDate?: Date;

	@ApiProperty({
		required: false,
		enum: ROOMING_SUBSCRIPTION_STATE,
	})
	@IsOptional()
	@IsEnum(ROOMING_SUBSCRIPTION_STATE)
	state?: ROOMING_SUBSCRIPTION_STATE;
}
