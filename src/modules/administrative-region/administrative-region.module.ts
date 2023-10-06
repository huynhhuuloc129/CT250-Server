import { Module } from '@nestjs/common';
import { AdministrativeRegionService } from './administrative-region.service';
import { AdministrativeRegionController } from './administrative-region.controller';

@Module({
  controllers: [AdministrativeRegionController],
  providers: [AdministrativeRegionService],
})
export class AdministrativeRegionModule {}
