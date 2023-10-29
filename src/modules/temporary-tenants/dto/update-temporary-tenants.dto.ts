import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, IsDateString } from 'class-validator';

export class UpdateTemporaryTenantDto {
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
	citizenI: string;

	@ApiProperty()
	@IsDateString()
	startDate: Date;

	@ApiProperty()
	@IsDateString()
	endDate: Date;
}
