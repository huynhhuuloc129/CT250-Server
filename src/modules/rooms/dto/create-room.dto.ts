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
import { CreateRoomDescriptionDto } from 'src/modules/room-descriptions/dto/create-room-description.dto';
import { ROOM_STATE } from 'src/shared/enums/common.enum';

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
		type: [CreateRoomDescriptionDto],
		example: [
			{
				title: 'Trọ không ngập nước',
			},
			{
				title: 'Phòng có gác',
				content: 'Phòng có gác lửng với diện tích bằng nửa diện tích sàn',
			},
		] as CreateRoomDescriptionDto[],
	})
	@Type(() => CreateRoomDescriptionDto)
	@ValidateNested({ each: true })
	@IsArray()
	@ArrayMinSize(0)
	descriptions: CreateRoomDescriptionDto[];
}
