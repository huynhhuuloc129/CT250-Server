import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { BaseService } from 'src/shared/bases/service.base';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomingHouse } from './entities/romming-house.entity';
import { CreateRoomDto } from '../rooms/dto/create-room.dto';
import { RoomsService } from '../rooms/rooms.service';
import { ROOM_STATE } from 'src/shared/enums/common.enum';
import { GetRoomDto } from '../rooms/dto/get-room.dto';

@Injectable()
export class RoomingHousesService extends BaseService<RoomingHouse> {
	constructor(
		@InjectRepository(RoomingHouse)
		private roomingHouseRepository: Repository<RoomingHouse>,
		private roomService: RoomsService,
	) {
		super(roomingHouseRepository);
	}

	async createRoom(roomingHouseId: number, input: CreateRoomDto) {
		const roomingHouse = await this.roomingHouseRepository.findOne({
			where: { id: roomingHouseId },
		});
		if (!roomingHouse) {
			throw new NotFoundException('Rooming House not found!');
		}

		input.roomingHouseID = roomingHouseId;
		input.state = ROOM_STATE.AVAILABLE;
		return await this.roomService.createOne(input);
	}

	async findManyRoom(roomingHouseId: number, filter: GetRoomDto) {
		try {
			const roomingHouse = await this.roomingHouseRepository.findOne({
				where: { id: roomingHouseId },
			});
			if (!roomingHouse) {
				throw new NotFoundException('Rooming House not found!');
			}

			return await this.roomService.findManyRoomWithRommingHouse(
				roomingHouseId,
				filter,
			);
		} catch (err) {
			throw new BadRequestException(err);
		}
	}
}
