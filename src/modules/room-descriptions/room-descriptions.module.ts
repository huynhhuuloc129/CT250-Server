import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomDescription } from './entities/room-description.entity';

@Module({
	imports: [TypeOrmModule.forFeature([RoomDescription])],
})
export class RoomDescriptionsModule {}
