import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomingSubscriptionRequest } from './entities/rooming-subscription-request.entity';
import { RoomingSubscriptionRequestController } from './rooming-subscription-requests.controller';
import { RoomingSubscriptionRequestService } from './rooming-subscription-requests.service';

@Module({
	imports: [TypeOrmModule.forFeature([RoomingSubscriptionRequest])],
	controllers: [RoomingSubscriptionRequestController],
	providers: [RoomingSubscriptionRequestService],
	exports: [RoomingSubscriptionRequestService],
})
export class RoomingSubscriptionRequestsModule {}
