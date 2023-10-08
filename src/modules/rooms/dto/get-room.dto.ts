import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { DefaultListDto } from 'src/shared/dtos/default-list.dto';
import { ROOM_STATE } from 'src/shared/enums/common.enum';

export class RoomDto extends DefaultListDto {
	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	tenantID?: number;

	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	roomingHouseID?: number;

	@ApiProperty({
		required: false,
		enum: ROOM_STATE,
	})
	@IsOptional()
	@IsEnum(ROOM_STATE)
	state?: ROOM_STATE;
}
