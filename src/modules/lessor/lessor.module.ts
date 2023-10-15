import { Module } from '@nestjs/common';
import { LessorService } from './lessor.service';
import { LessorController } from './lessor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lessor } from './entities/lessor.entity';
import { UsersModule } from '../users/users.module';

@Module({
	imports: [TypeOrmModule.forFeature([Lessor]), UsersModule],
	controllers: [LessorController],
	providers: [LessorService],
	exports: [LessorService],
})
export class LessorModule {}
