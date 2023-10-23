import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/bases/service.base';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomingSubscription } from './entities/rooming-subscription.entity';

@Injectable()
export class RoomingSubscriptionService extends BaseService<RoomingSubscription> {
	constructor(
		@InjectRepository(RoomingSubscription)
		private roomingSubscriptionRepository: Repository<RoomingSubscription>,
	) {
		super(roomingSubscriptionRepository);
	}
}
