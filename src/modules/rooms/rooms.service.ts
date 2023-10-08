import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/bases/service.base';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService extends BaseService<Room> {
	constructor(
		@InjectRepository(Room)
		private RoomRepository: Repository<Room>,
	) {
		super(RoomRepository);
	}

	async secondDescriptionOfRoom(id: number) {
		const des = await this.RoomRepository.findOne({ where: { id } });
		return des.descriptions[1].title;
	}
}
