import { ApiProperty } from '@nestjs/swagger';
import { USER_GENDER } from '../entities/user.entity';
import {
	IsOptional,
	IsString,
	IsNotEmpty,
	IsDate,
	IsEnum,
} from 'class-validator';

export class CreateUserDto {
	@ApiProperty()
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
	email?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	fullName?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	firstName?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	lastName?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	citizenID?: string;

	@ApiProperty()
	@IsOptional()
	@IsDate()
	dob?: Date;

	@ApiProperty()
	@IsOptional()
	@IsEnum(USER_GENDER)
	gender?: USER_GENDER;

	@ApiProperty()
	@IsOptional()
	address?: string;

	@ApiProperty()
	@IsOptional()
	tel?: string;
}
