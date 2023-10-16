import { PartialType } from '@nestjs/swagger';
import { CreateTemporaryLessorDto } from './create-temporary-lessors.dto';

export class UpdateTemporaryLessorDto extends PartialType(
	CreateTemporaryLessorDto,
) {}
