import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomingHouse } from './entities/romming-house.entity';
import { RoomingHousesService } from './rooming-houses.service';
import { RoomingHousesController } from './rooming-houses.controller';

@Module({
	imports: [TypeOrmModule.forFeature([RoomingHouse])],
	controllers: [RoomingHousesController],
	providers: [RoomingHousesService],
})
export class RoomingHousesModule {}
