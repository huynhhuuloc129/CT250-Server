import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemporaryLessor } from './entities/temporary-lessor.entity';
import { TemporaryLessorService } from './temporary-lessors.service';
import { TemporaryLessorController } from './temporary-lessors.controller';

@Module({
	imports: [TypeOrmModule.forFeature([TemporaryLessor])],
	controllers: [TemporaryLessorController],
	providers: [TemporaryLessorService],
	exports: [TemporaryLessorService],
})
export class TemporaryLessorsModule {}
