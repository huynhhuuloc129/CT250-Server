import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/bases/service.base';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { RoomingSubscription } from './entities/rooming-subscription.entity';
import { GetRoomingSubscriptionDto } from './dto/get-rooming-subscription.dto';
// import { CreateRoomingSubscriptionDto } from './dto/create-rooming-subscription.dto';

@Injectable()
export class RoomingSubscriptionService extends BaseService<RoomingSubscription> {
	constructor(
		@InjectRepository(RoomingSubscription)
		private roomingSubscriptionRepository: Repository<RoomingSubscription>,
	) {
		super(roomingSubscriptionRepository);
	}

	async findManyRoomingSubscription(filter: GetRoomingSubscriptionDto) {
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

			if (filter.state) {
				where['state'] = filter.state;
			}
			if (filter.tenantId) {
				where['tenantId'] = filter.tenantId;
			}
			if (filter.roomId) {
				where['roomId'] = filter.roomId;
			}

			const [count, data] = await Promise.all([
				this.roomingSubscriptionRepository.count({
					where,
				}),
				this.roomingSubscriptionRepository.find({
					where,
					order,
					take: limit ? (limit <= 100 ? limit : 100) : 10,
					skip: offset ? offset : 0,
					// TODO: Should not put relations in getAll
					relations: { tenant: true, room: true },
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

	// async createRoomingSubscription(input: CreateRoomingSubscriptionDto) {
	// 	try {
	// 		const data = await this.createOne(input);
	// 		return data;
	// 	} catch (err) {
	// 		throw new BadRequestException(err);
	// 	}
	// }
}
