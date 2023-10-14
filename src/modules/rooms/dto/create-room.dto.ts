import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	ArrayMinSize,
	IsArray,
	IsNumber,
	IsOptional,
	IsString,
	Min,
	ValidateNested,
} from 'class-validator';
import { ROOM_STATE } from 'src/shared/enums/common.enum';
import { RoomDescriptionDto } from './room-description.dto';

export class CreateRoomDto {
	@ApiHideProperty()
	@IsOptional()
	tenantID?: number;

	@ApiHideProperty()
	@IsOptional()
	roomingHouseID?: number;

	@ApiHideProperty()
	@IsOptional()
	dimensions?: number;

	@ApiHideProperty()
	@IsOptional()
	state?: ROOM_STATE;

	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsNumber()
	@Min(0)
	width: number;

	@ApiProperty()
	@IsNumber()
	@Min(0)
	height: number;

	@ApiProperty()
	@IsNumber()
	@Min(0)
	roomPrice: number;

	@ApiProperty()
	@IsNumber()
	@Min(0)
	waterPrice: number;

	@ApiProperty()
	@IsNumber()
	@Min(0)
	electricityPrice: number;

	@ApiProperty()
	@IsString()
	summary: string;

	@ApiProperty({
		type: [RoomDescriptionDto],
		example: [
			{
				title: 'Trọ không ngập nước',
			},
			{
				title: 'Phòng có gác',
				content: 'Phòng có gác lửng với diện tích bằng nửa diện tích sàn',
			},
		] as RoomDescriptionDto[],
	})
	@IsOptional()
	@Type(() => RoomDescriptionDto)
	@ValidateNested({ each: true })
	@IsArray()
	@ArrayMinSize(0)
	descriptions?: RoomDescriptionDto[];
}
