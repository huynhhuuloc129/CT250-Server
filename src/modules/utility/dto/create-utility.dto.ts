import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUtilityDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	name: string;

	@IsOptional()
	@IsString()
	@ApiProperty({ required: false })
	description?: string;
}
