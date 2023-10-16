import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { DefaultListDto } from 'src/shared/dtos/default-list.dto';

export class GetRoomingHouseDto extends DefaultListDto {
	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@Type(() => String)
	@IsString()
	categoryId?: string;

	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@Type(() => String)
	@IsString()
	tenantId?: string;

	// @ApiProperty({
	// 	required: false,
	// })
	// @IsOptional()
	// @Type(() => String)
	// @IsString()
	// communeId?: string;
}
