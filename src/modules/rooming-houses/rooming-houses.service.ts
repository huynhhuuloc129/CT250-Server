import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/bases/service.base';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomingHouse } from './entities/romming-house.entity';

@Injectable()
export class RoomingHousesService extends BaseService<RoomingHouse> {
	constructor(
		@InjectRepository(RoomingHouse)
		private RoomingHouseRepository: Repository<RoomingHouse>,
	) {
		super(RoomingHouseRepository);
	}
}
