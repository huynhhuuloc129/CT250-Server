import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
	IsDateString,
	IsNumber,
	IsOptional,
	IsString,
	Min,
} from 'class-validator';

export class CreateRoomingHouseDto {
	@ApiHideProperty()
	@IsOptional()
	tenantID?: number;

	@ApiHideProperty()
	@IsOptional()
	totalRoomNumber?: number;

	@ApiHideProperty()
	@IsOptional()
	availableRoomNumber?: number;

	@ApiProperty({ default: 1 })
	@IsNumber()
	@Min(1)
	communeID: number;

	@ApiProperty({ default: 1 })
	@IsNumber()
	@Min(1)
	categoryID: number;

	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsString()
	description: string;

	@ApiProperty()
	@IsString()
	address: string;

	@ApiProperty()
	@IsDateString()
	paymentExpiresDate: Date;
}
