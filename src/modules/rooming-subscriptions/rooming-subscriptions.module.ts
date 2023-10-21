import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomingSubscription } from './entities/rooming-subscription.entity';
import { RoomingSubscriptionController } from './rooming-subscriptions.controller';
import { RoomingSubscriptionService } from './rooming-subscriptions.service';
import { PaymentRecordsModule } from '../payment-records/payment-records.module';
import { TemporaryLessorsModule } from '../temporary-tenants/temporary-tenants.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([RoomingSubscription]),
		PaymentRecordsModule,
		TemporaryLessorsModule,
	],
	controllers: [RoomingSubscriptionController],
	providers: [RoomingSubscriptionService],
	exports: [RoomingSubscriptionService],
})
export class RoomingSubscriptionsModule {}
