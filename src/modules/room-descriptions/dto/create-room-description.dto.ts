import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateRoomDescriptionDto {
	@ApiHideProperty()
	@IsOptional()
	roomID?: string;

	@ApiProperty()
	@IsString()
	title: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	content?: string;
}
