import { PartialType } from '@nestjs/swagger';
import { CreateRoomDescriptionDto } from './create-room-description.dto';

export class UpdateRoomDescriptionDto extends PartialType(
	CreateRoomDescriptionDto,
) {}
