import { PickType } from '@nestjs/swagger';
import { CreateRoomDescriptionDto } from './create-room-description.dto';

export class UpdateRoomDescriptionDto extends PickType(
	CreateRoomDescriptionDto,
	['title', 'content'],
) {}
