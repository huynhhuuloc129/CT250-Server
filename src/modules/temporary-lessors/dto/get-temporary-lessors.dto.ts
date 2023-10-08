import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { DefaultListDto } from 'src/shared/dtos/default-list.dto';

export class GetTemporaryLessorDto extends DefaultListDto {
	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	roomingSubscriptionID?: number;

	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@Type(() => String)
	@IsString()
	fullName?: string;

	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@Type(() => String)
	@IsString()
	citizenID?: string;

	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@Type(() => Date)
	@IsDate()
	startDate?: Date;

	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@Type(() => Date)
	@IsDate()
	endDate?: Date;
}
