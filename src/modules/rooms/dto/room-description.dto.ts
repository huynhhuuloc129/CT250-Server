import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class RoomDescriptionDto {
	@ApiProperty()
	@IsString()
	title: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	content?: string;
}
