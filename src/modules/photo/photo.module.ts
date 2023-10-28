import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Photo } from './entities/photo.entity';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { UtilityModule } from '../utility/utility.module';

@Module({
	imports: [TypeOrmModule.forFeature([Photo]), UsersModule, UtilityModule],
	controllers: [PhotoController],
	providers: [PhotoService],
	exports: [PhotoService],
})
export class PhotoModule {}
