import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/bases/service.base';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { RoomingSubscription } from './entities/rooming-subscription.entity';
import { GetRoomingSubscriptionDto } from './dto/get-rooming-subscription.dto';
import { CreatePaymentRecordDto } from '../payment-records/dto/create-payment-record.dto';
import { PaymentRecordsService } from '../payment-records/payment-records.service';

@Injectable()
export class RoomingSubscriptionService extends BaseService<RoomingSubscription> {
	constructor(
		@InjectRepository(RoomingSubscription)
		private roomingSubscriptionRepository: Repository<RoomingSubscription>,
		private paymentRecordService: PaymentRecordsService,
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

	async createPaymentRecord(input: CreatePaymentRecordDto) {
		try {
			const roomingSubscription =
				await this.roomingSubscriptionRepository.findOne({
					where: { id: input.roomingSubscriptionId },
					relations: { room: true },
				});
			if (!roomingSubscription) {
				throw new BadRequestException('rooming subscription not found');
			}

			return await this.paymentRecordService.createPaymentRecord(
				input,
				roomingSubscription,
			);
		} catch (err) {
			throw new BadRequestException(err);
		}
	}
}
