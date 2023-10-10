import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { DefaultListDto } from 'src/shared/dtos/default-list.dto';
import { NOTIFICATION_TYPE } from 'src/shared/enums/common.enum';

export class GetNotificationDto extends DefaultListDto {
	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	roomingHouseId?: number;

	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	roomId?: number;

	@ApiProperty({
		required: false,
		enum: NOTIFICATION_TYPE,
	})
	@IsOptional()
	@IsEnum(NOTIFICATION_TYPE)
	type?: NOTIFICATION_TYPE;
}
