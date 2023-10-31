import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomDescriptionsModule } from '../room-descriptions/room-descriptions.module';
import { RoomingSubscriptionRequestsModule } from '../rooming-subscription-requests/rooming-subscription-requests.module';
import { RoomingSubscriptionsModule } from '../rooming-subscriptions/rooming-subscriptions.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Room]),
		RoomDescriptionsModule,
		RoomingSubscriptionRequestsModule,
		RoomingSubscriptionsModule,
	],
	controllers: [RoomsController],
	providers: [RoomsService],
	exports: [RoomsService],
})
export class RoomsModule {}
