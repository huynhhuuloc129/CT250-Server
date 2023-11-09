import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, IsDateString } from 'class-validator';

export class UpdateTemporaryTenantDto {
	@ApiHideProperty()
	@IsOptional()
	roomingSubscriptionId?: number;

	@ApiProperty()
	@IsOptional()
	@IsString()
	@MaxLength(30)
	fullName?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	@MaxLength(12)
	citizenI?: string;

	@ApiProperty()
	@IsOptional()
	@IsDateString()
	startDate?: Date;

	@ApiProperty()
	@IsOptional()
	@IsDateString()
	endDate?: Date;
}
