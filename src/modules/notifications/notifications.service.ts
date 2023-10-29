import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/bases/service.base';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { GetNotificationDto } from './dto/get-notification.dto';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { RoomingHousesService } from '../rooming-houses/rooming-houses.service';
import { RoomsService } from '../rooms/rooms.service';

@Injectable()
export class NotificationsService extends BaseService<Notification> {
	constructor(
		@InjectRepository(Notification)
		private notificationRepository: Repository<Notification>,
		private roomingHouseService: RoomingHousesService,
		private roomService: RoomsService,
	) {
		super(notificationRepository);
	}

	async findManyNotification(filter: GetNotificationDto) {
		try {
			const { limit, offset, sortField, sortOrder, ...condition } = filter;

			const where = {};
			if (condition?.searchField && condition?.searchValue) {
				where[condition.searchField] = ILike(`%${condition.searchValue}%`);
			}

			const order = {};
			if (sortField && sortOrder) {
				order[sortField] = sortOrder;
			}

			if (filter.roomingHouseId) {
				where['roomingHouseId'] = filter.roomingHouseId;
			}
			if (filter.roomId) {
				where['roomId'] = filter.roomId;
			}
			if (filter.type) {
				where['type'] = filter.type;
			}

			const [count, data] = await Promise.all([
				this.notificationRepository.count({
					where,
				}),
				this.notificationRepository.find({
					where,
					order,
					take: limit ? (limit <= 100 ? limit : 100) : 10,
					skip: offset ? offset : 0,
				}),
			]);

			return {
				filter: filter,
				total: count,
				data,
			};
		} catch (err) {
			throw new BadRequestException(err);
		}
	}

	async createManyNotification(input: CreateNotificationDto) {
		try {
			const roomingHouse = await this.roomingHouseService.findOneWithRelation({
				where: { id: input.roomingHouseId },
				relations: { rooms: true },
			});
			if (!roomingHouse) {
				throw new BadRequestException('rooming house not found');
			}
			if (!roomingHouse?.rooms.length) {
				throw new BadRequestException('room is empty');
			}

			let count = 0;
			const notifications = [];
			for (const room of roomingHouse.rooms) {
				const data = await this.createOne({
					type: input.type,
					roomId: room.id,
					roomingHouseId: room.roomingHouseId,
					title: input.title,
					content: input.content,
				});
				count++;
				notifications.push(data);
			}

			return {
				total: count,
				data: notifications,
			};
		} catch (err) {
			throw new BadRequestException(err);
		}
	}

	async createNotification(input: CreateNotificationDto) {
		try {
			const room = await this.roomService.findOneWithRelation({
				where: { id: input.roomId, roomingHouseId: input.roomingHouseId },
			});
			if (!room) {
				throw new BadRequestException('room not found');
			}

			return await this.createOne(input);
		} catch (err) {
			throw new BadRequestException(err);
		}
	}
}
