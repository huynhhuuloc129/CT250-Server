import { PartialType } from '@nestjs/swagger';
import { CreateRoomingHouseDto } from './create-rooming-house.dto';

export class UpdateRoomingHouseDto extends PartialType(CreateRoomingHouseDto) {}
