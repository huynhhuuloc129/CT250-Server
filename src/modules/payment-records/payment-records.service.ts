import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/bases/service.base';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentRecord } from './entities/payment-record.entity';

@Injectable()
export class PaymentRecordsService extends BaseService<PaymentRecord> {
	constructor(
		@InjectRepository(PaymentRecord)
		private paymentRecordRepository: Repository<PaymentRecord>,
	) {
		super(paymentRecordRepository);
	}
}
