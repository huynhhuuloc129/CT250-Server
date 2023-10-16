import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTemporaryLessorDto {
	@ApiHideProperty()
	@IsOptional()
	roomingSubscriptionId: number;

	@ApiProperty()
	@IsString()
	@MaxLength(30)
	fullName: string;

	@ApiProperty()
	@IsString()
	@MaxLength(12)
	citizenId: string;

	@ApiProperty()
	@IsDateString()
	startDate: Date;

	@ApiProperty()
	@IsDateString()
	endDate: Date;
}
