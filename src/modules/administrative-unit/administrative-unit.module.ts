import { Module } from '@nestjs/common';
import { AdministrativeUnitService } from './administrative-unit.service';
import { AdministrativeUnitController } from './administrative-unit.controller';
import { AdministrativeUnit } from './entities/administrative-unit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([AdministrativeUnit])],
	controllers: [AdministrativeUnitController],
	providers: [AdministrativeUnitService],
	exports: [AdministrativeUnitService],
})
export class AdministrativeUnitModule {}
