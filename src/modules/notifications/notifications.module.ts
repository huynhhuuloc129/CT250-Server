import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { RoomsModule } from '../rooms/rooms.module';
import { RoomingHousesModule } from '../rooming-houses/rooming-houses.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Notification]),
		RoomsModule,
		RoomingHousesModule,
	],
	controllers: [NotificationsController],
	providers: [NotificationsService],
	exports: [NotificationsService],
})
export class NotificationsModule {}
