import { Module } from '@nestjs/common';
import { AdministrativeUnitService } from './administrative-unit.service';
import { AdministrativeUnitController } from './administrative-unit.controller';

@Module({
  controllers: [AdministrativeUnitController],
  providers: [AdministrativeUnitService],
})
export class AdministrativeUnitModule {}
