import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentRecord } from './entities/payment-record.entity';
import { PaymentRecordsController } from './payment-records.controller';
import { PaymentRecordsService } from './payment-records.service';

@Module({
	imports: [TypeOrmModule.forFeature([PaymentRecord])],
	controllers: [PaymentRecordsController],
	providers: [PaymentRecordsService],
})
export class PaymentRecordsModule {}
