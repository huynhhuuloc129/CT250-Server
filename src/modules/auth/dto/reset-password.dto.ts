import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
	@ApiProperty({ default: 'string' })
	@IsNotEmpty()
	@IsString()
	newPassword: string;

	@ApiProperty({ default: 'string' })
	@IsNotEmpty()
	@IsString()
	newPasswordConfirm: string;
}
