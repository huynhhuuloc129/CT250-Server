import { PartialType } from '@nestjs/swagger';
import { CreateRoomDescriptionDto } from './create-room-description.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDescriptionDto) {}
