import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomDescription } from './entities/room-description.entity';
import { RoomDescriptionController } from './room-descriptions.controller';
import { RoomDescriptionService } from './room-descriptions.service';

@Module({
	imports: [TypeOrmModule.forFeature([RoomDescription])],
	controllers: [RoomDescriptionController],
	providers: [RoomDescriptionService],
	exports: [RoomDescriptionService],
})
export class RoomDescriptionsModule {}
