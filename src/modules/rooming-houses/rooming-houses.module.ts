import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomingHouse } from './entities/romming-house.entity';
import { RoomingHousesService } from './rooming-houses.service';
import { RoomingHousesController } from './rooming-houses.controller';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
	imports: [TypeOrmModule.forFeature([RoomingHouse]), RoomsModule],
	controllers: [RoomingHousesController],
	providers: [RoomingHousesService],
	exports: [RoomingHousesService],
})
export class RoomingHousesModule {}
