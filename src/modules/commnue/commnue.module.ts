import { Module } from '@nestjs/common';
import { CommnueService } from './commnue.service';
import { CommnueController } from './commnue.controller';

@Module({
	controllers: [CommnueController],
	providers: [CommnueService],
})
export class CommnueModule {}
