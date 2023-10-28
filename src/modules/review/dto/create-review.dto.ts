import { ApiProperty } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsNumber,
	IsString,
	Max,
	Min,
	MinLength,
} from 'class-validator';

export class CreateReviewDto {
	@ApiProperty({ default: 4.5 })
	@IsNotEmpty()
	@IsNumber()
	@Min(0)
	@Max(5)
	rating: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MinLength(2)
	comment: string;
}
