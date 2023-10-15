import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { USER_GENDER, USER_ROLE } from '../entities/user.entity';
import {
	IsOptional,
	IsString,
	IsNotEmpty,
	IsDate,
	IsEnum,
	IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
	@ApiProperty({ default: 'user_1' })
	@IsNotEmpty()
	@IsString()
	username: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	password: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	refreshToken?: string;

	@ApiHideProperty()
	@IsNotEmpty()
	@IsEnum(USER_ROLE)
	role: USER_ROLE;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	@IsEmail()
	email?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	firstName?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	lastName?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	citizenID?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@Type(() => Date)
	@IsDate()
	dob?: Date;

	@ApiProperty({ default: USER_GENDER.M })
	@IsOptional()
	@IsEnum(USER_GENDER)
	gender?: USER_GENDER;

	@ApiProperty({ required: false })
	@IsOptional()
	address?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	tel?: string;
}
