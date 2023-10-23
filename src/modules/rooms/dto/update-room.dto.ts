import { ApiProperty } from '@nestjs/swagger';
import {
	IsString,
	IsNumber,
	Min,
	IsOptional,
	MaxLength,
} from 'class-validator';

export class UpdateRoomDto {
	@ApiProperty()
	@IsOptional()
	@IsString()
	@MaxLength(100)
	name?: string;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	@Min(0)
	width?: number;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	@Min(0)
	height?: number;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	@Min(0)
	roomPrice?: number;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	@Min(0)
	waterPrice?: number;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	@Min(0)
	electricityPrice?: number;

	@ApiProperty()
	@IsOptional()
	@IsString()
	@MaxLength(200)
	summary?: string;
}
