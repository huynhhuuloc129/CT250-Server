import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/bases/service.base';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomingSubscriptionRequest } from './entities/rooming-subscription-request.entity';

@Injectable()
export class RoomingSubscriptionRequestService extends BaseService<RoomingSubscriptionRequest> {
	constructor(
		@InjectRepository(RoomingSubscriptionRequest)
		private roomingSubscriptionRequestRepository: Repository<RoomingSubscriptionRequest>,
	) {
		super(roomingSubscriptionRequestRepository);
	}
}
