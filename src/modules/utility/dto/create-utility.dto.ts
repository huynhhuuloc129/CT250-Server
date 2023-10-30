import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUtilityDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	description?: string;
}
