import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
	IsDateString,
	IsEnum,
	IsNumber,
	IsOptional,
	Min,
} from 'class-validator';
import { PAYMENT_STATE } from 'src/shared/enums/common.enum';

export class CreatePaymentRecordDto {
	@ApiHideProperty()
	@IsOptional()
	roomingSubscriptionId?: number;

	@ApiHideProperty()
	@IsOptional()
	month?: number;

	@ApiHideProperty()
	@IsOptional()
	year?: number;

	@ApiProperty()
	@IsNumber()
	@Min(0)
	waterAmount: number;

	@ApiProperty()
	@IsNumber()
	@Min(0)
	electricityAmount: number;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	@Min(0)
	surcharge?: number;

	@ApiProperty()
	@IsOptional()
	@IsDateString()
	paidDate?: Date;

	@ApiProperty({
		enum: PAYMENT_STATE,
	})
	@IsOptional()
	@IsEnum(PAYMENT_STATE)
	state?: PAYMENT_STATE;

	@ApiHideProperty()
	@IsOptional()
	monthWaterPrice?: number;

	@ApiHideProperty()
	@IsOptional()
	waterPrice?: number;

	@ApiHideProperty()
	@IsOptional()
	electricityPrice?: number;

	@ApiHideProperty()
	@IsOptional()
	monthElectricityPrice?: number;

	@ApiHideProperty()
	@IsOptional()
	monthRoomPrice?: number;

	@ApiHideProperty()
	@IsOptional()
	monthTotalPrice?: number;
}
