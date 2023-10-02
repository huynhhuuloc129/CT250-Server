import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentRecord } from './entities/payment-record.entity';

@Module({
	imports: [TypeOrmModule.forFeature([PaymentRecord])],
})
export class PaymentRecordsModule {}
