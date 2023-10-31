import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/bases/service.base';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { PaymentRecord } from './entities/payment-record.entity';
import { CreatePaymentRecordDto } from './dto/create-payment-record.dto';
import { RoomingSubscription } from '../rooming-subscriptions/entities/rooming-subscription.entity';
import { PAYMENT_STATE } from 'src/shared/enums/common.enum';
import { GetPaymentRecordDto } from './dto/get-payment-record.dto';
import { UpdatePaymentRecordDto } from './dto/update-payment-record.dto';

@Injectable()
export class PaymentRecordsService extends BaseService<PaymentRecord> {
	constructor(
		@InjectRepository(PaymentRecord)
		private paymentRecordRepository: Repository<PaymentRecord>,
	) {
		super(paymentRecordRepository);
	}

	async createPaymentRecord(
		input: CreatePaymentRecordDto,
		roomingSubscription: RoomingSubscription,
	) {
		try {
			const { roomPrice, waterPrice, electricityPrice } =
				roomingSubscription.room;

			input.waterPrice = waterPrice;
			input.electricityPrice = electricityPrice;
			input.monthRoomPrice = roomPrice;

			input.monthElectricityPrice = electricityPrice * input.electricityAmount;
			input.monthWaterPrice = waterPrice * input.waterAmount;
			input.monthTotalPrice =
				input.monthRoomPrice +
				input.monthElectricityPrice +
				input.monthWaterPrice;

			if (input.surcharge) {
				input.monthTotalPrice += input.surcharge;
			}
			if (input.paidDate) {
				input.month = new Date(input.paidDate).getMonth();
				input.year = new Date(input.paidDate).getFullYear();
			}
			if (!input.state) {
				input.state = PAYMENT_STATE.CREATED;
			}

			const paymentRecord = this.paymentRecordRepository.create(input);
			return this.paymentRecordRepository.save(paymentRecord);
		} catch (err) {
			throw new BadRequestException(err);
		}
	}

	async getManyPaymentRecord(filter: GetPaymentRecordDto) {
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
			if (filter.roomingSubscriptionId) {
				where['roomingSubscriptionId'] = filter.roomingSubscriptionId;
			}
			if (filter.year) {
				where['year'] = filter.year;
			}

			if (filter.month) {
				where['month'] = filter.month;
			}

			const [count, data] = await Promise.all([
				this.paymentRecordRepository.count({
					where,
				}),
				this.paymentRecordRepository.find({
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

	async updatePaymentRecord(id: number, input: UpdatePaymentRecordDto) {
		try {
			const paymentRecord = await this.paymentRecordRepository.findOne({
				where: { id },
				relations: { roomingSubscription: { room: true } },
			});
			const { surcharge, ...data } = input;

			if (!paymentRecord) {
				throw new BadRequestException('Payment record not found');
			}

			if (surcharge) {
				paymentRecord.monthTotalPrice -= paymentRecord.surcharge;
				paymentRecord.surcharge = surcharge;
				paymentRecord.monthTotalPrice += surcharge;

				await this.paymentRecordRepository.save(paymentRecord);
			}

			const res = await this.updateOne({ id }, data);
			return res;
		} catch (err) {
			throw new BadRequestException(err);
		}
	}
}
