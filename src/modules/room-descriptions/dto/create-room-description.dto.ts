import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateRoomDescriptionDto {
	@ApiProperty()
	@IsString()
	roomId: number;

	@ApiProperty()
	@IsString()
	title: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	content?: string;
}
