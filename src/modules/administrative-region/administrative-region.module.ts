import { Module } from '@nestjs/common';
import { AdministrativeRegionService } from './administrative-region.service';
import { AdministrativeRegionController } from './administrative-region.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministrativeRegion } from './entities/administrative-region.entity';

@Module({
	imports: [TypeOrmModule.forFeature([AdministrativeRegion])],
	controllers: [AdministrativeRegionController],
	providers: [AdministrativeRegionService],
})
export class AdministrativeRegionModule {}
