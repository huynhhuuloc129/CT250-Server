import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemporaryLessor } from './entities/temporary-lessor.entity';

@Module({
	imports: [TypeOrmModule.forFeature([TemporaryLessor])],
})
export class TemporaryLessorsModule {}
