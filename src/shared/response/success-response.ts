import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponse<T, F = unknown> {
	@ApiProperty({ type: Number })
	total?: number;

	@ApiProperty({ type: Object })
	filter?: F | unknown;

	@ApiProperty({ type: Object, isArray: true })
	data?: T | unknown;
}
