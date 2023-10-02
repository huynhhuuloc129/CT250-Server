import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, Min } from 'class-validator';
import { NOTIFICATION_TYPE } from 'src/shared/enums/common.enum';

export class CreateNotificationDto {
	@ApiProperty()
	@IsNumber()
	@Min(1)
	roomingHouseID: number;

	@ApiProperty()
	@IsNumber()
	@Min(1)
	roomID: number;

	@ApiProperty()
	@IsString()
	title: string;

	@ApiProperty()
	@IsString()
	content: string;

	@ApiProperty({
		enum: NOTIFICATION_TYPE,
	})
	@IsEnum(NOTIFICATION_TYPE)
	type: NOTIFICATION_TYPE;
}
