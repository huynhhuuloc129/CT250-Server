import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { Photo } from './entities/photo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsModule } from '../rooms/rooms.module';
import { RoomingHousesModule } from '../rooming-houses/rooming-houses.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Photo]),
		RoomsModule,
		RoomingHousesModule,
	],
	controllers: [PhotoController],
	providers: [PhotoService],
	exports: [PhotoService],
})
export class PhotoModule {}
