import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomingSubscriptionRequest } from './entities/rooming-subscription-request.entity';

@Module({
	imports: [TypeOrmModule.forFeature([RoomingSubscriptionRequest])],
})
export class RoomingSubscriptionRequestsModule {}
