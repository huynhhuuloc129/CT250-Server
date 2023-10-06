import { Module } from '@nestjs/common';
import { CommnueService } from './ward.service';
import { CommnueController } from './ward';
import { Ward } from './entities/ward.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([Ward])],
	controllers: [CommnueController],
	providers: [CommnueService],
})
export class WardModule {}
