import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
	@ApiProperty({ default: 'admin_1' })
	@IsNotEmpty()
	@IsString()
	username: string;

	@ApiProperty({ default: 'string' })
	@IsNotEmpty()
	@IsString()
	password: string;
}
