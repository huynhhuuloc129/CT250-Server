import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/bases/service.base';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomingHouse } from './entities/romming-house.entity';
import { CreateRoomDto } from '../rooms/dto/create-room.dto';
import { RoomsService } from '../rooms/rooms.service';
import { ROOM_STATE } from 'src/shared/enums/common.enum';

@Injectable()
export class RoomingHousesService extends BaseService<RoomingHouse> {
	constructor(
		@InjectRepository(RoomingHouse)
		private roomingHouseRepository: Repository<RoomingHouse>,
		private roomService: RoomsService,
	) {
		super(roomingHouseRepository);
	}

	async createRoom(input: CreateRoomDto) {
		input.state = ROOM_STATE.AVAILABLE;
		return await this.roomService.createOne(input);
	}
}
