import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomingHouse } from './entities/romming-house.entity';
import { RoomingHousesService } from './rooming-houses.service';
import { RoomingHousesController } from './rooming-houses.controller';
import { RoomsModule } from '../rooms/rooms.module';
import { TenantModule } from '../tenant/tenant.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([RoomingHouse]),
		RoomsModule,
		TenantModule,
	],
	controllers: [RoomingHousesController],
	providers: [RoomingHousesService],
	exports: [RoomingHousesService],
})
export class RoomingHousesModule {}
