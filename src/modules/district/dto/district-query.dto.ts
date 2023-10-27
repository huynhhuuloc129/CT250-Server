import { PickType } from '@nestjs/swagger';
import { DefaultListDto } from 'src/shared/dtos/default-list.dto';

export class DistrictQueryDto extends PickType(DefaultListDto, [
	'searchField',
	'searchValue',
	'limit',
	'offset',
]) {}
