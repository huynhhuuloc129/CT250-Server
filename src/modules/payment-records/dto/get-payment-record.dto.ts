import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { DefaultListDto } from 'src/shared/dtos/default-list.dto';
import { PAYMENT_STATE } from 'src/shared/enums/common.enum';

export class GetPaymentRecordDto extends DefaultListDto {
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
	@Type(() => Number)
	@IsNumber()
	roomingSubscriptionId?: number;

	@ApiProperty({
		required: false,
		enum: PAYMENT_STATE,
	})
	@IsOptional()
	@IsEnum(PAYMENT_STATE)
	state?: PAYMENT_STATE;
}
