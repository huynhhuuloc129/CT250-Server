import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateRoomingHouseDto {
	@ApiHideProperty()
	@IsOptional()
	lessorId?: number;

	@ApiHideProperty()
	@IsOptional()
	totalRoomNumber?: number;

	@ApiHideProperty()
	@IsOptional()
	availableRoomNumber?: number;

	//NOTE: wardCode
	// @ApiProperty({ default: 1 })
	// @IsNumber()
	// @Min(1)
	// wardcode: number;

	@ApiProperty({ default: 1 })
	@IsNumber()
	@Min(1)
	categoryId: number;

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
	@IsNumber()
	@Min(1)
	@Max(31)
	paymentExpiresDay: number;
}
