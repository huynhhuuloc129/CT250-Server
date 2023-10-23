import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/bases/service.base';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomDescription } from './entities/room-description.entity';

@Injectable()
export class RoomDescriptionService extends BaseService<RoomDescription> {
	constructor(
		@InjectRepository(RoomDescription)
		private roomDescriptionRepository: Repository<RoomDescription>,
	) {
		super(roomDescriptionRepository);
	}
}
