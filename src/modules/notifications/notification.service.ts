import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/bases/service.base';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService extends BaseService<Notification> {
	constructor(
		@InjectRepository(Notification)
		private notificationRepository: Repository<Notification>,
	) {
		super(notificationRepository);
	}
}
