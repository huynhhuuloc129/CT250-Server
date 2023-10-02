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
	@IsNumber()
	@Min(1)
	roomingSubscriptionID?: number;

	@ApiHideProperty()
	@IsOptional()
	@IsNumber()
	month?: number;

	@ApiHideProperty()
	@IsOptional()
	@IsNumber()
	year?: number;

	@ApiProperty()
	@IsNumber()
	waterAmount: number;

	@ApiProperty()
	@IsNumber()
	electricityAmount: number;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	surcharge: number;

	@ApiProperty()
	@IsOptional()
	@IsDateString()
	paidDate: Date;

	@ApiProperty({
		enum: PAYMENT_STATE,
	})
	@IsOptional()
	@IsEnum(PAYMENT_STATE)
	state?: PAYMENT_STATE;

	@ApiHideProperty()
	@IsOptional()
	@IsNumber()
	monthWaterPrice?: number;

	@ApiHideProperty()
	@IsOptional()
	@IsNumber()
	monthElectricityPrice?: number;

	@ApiHideProperty()
	@IsOptional()
	@IsNumber()
	monthTotalPrice: number;
}
