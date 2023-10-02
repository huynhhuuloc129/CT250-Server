import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomingSubscription } from './entities/rooming-subscription.entity';

@Module({
	imports: [TypeOrmModule.forFeature([RoomingSubscription])],
})
export class RoomingSubscriptionsModule {}
