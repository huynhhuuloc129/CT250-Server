import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class CreateLessorDto extends PartialType(
	OmitType(CreateUserDto, [
		'role',
		'username',
		'email',
		'password',
		'refreshToken',
	] as const),
) {
	@ApiProperty({ default: 'lessor_1' })
	@IsNotEmpty()
	@IsString()
	username: string;

	@ApiProperty({ default: 'lessor_1@istay.com', required: false })
	@IsOptional()
	@IsString()
	@IsEmail()
	email?: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	password: string;
}
