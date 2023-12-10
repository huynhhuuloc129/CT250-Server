import { ApiProperty, PickType } from '@nestjs/swagger';
import { LoginDto } from './login.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto extends PickType(LoginDto, ['password']) {
	@ApiProperty({ default: 'string' })
	@IsNotEmpty()
	@IsString()
	newPassword: string;

	@ApiProperty({ default: 'string' })
	@IsNotEmpty()
	@IsString()
	newPasswordConfirm: string;
}
