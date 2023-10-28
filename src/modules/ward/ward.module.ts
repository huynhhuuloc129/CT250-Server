import { Module } from '@nestjs/common';
import { Ward } from './entities/ward.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WardController } from './ward.controller';
import { WardService } from './ward.service';

@Module({
	imports: [TypeOrmModule.forFeature([Ward])],
	controllers: [WardController],
	providers: [WardService],
	exports: [WardService],
})
export class WardModule {}
