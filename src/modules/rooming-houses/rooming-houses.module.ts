import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomingHouse } from './entities/romming-house.entity';

@Module({
	imports: [TypeOrmModule.forFeature([RoomingHouse])],
})
export class RoomingHousesModule {}
