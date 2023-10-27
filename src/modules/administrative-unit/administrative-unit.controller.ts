import { Controller } from '@nestjs/common';
import { AdministrativeUnitService } from './administrative-unit.service';

@Controller('administrative-units')
export class AdministrativeUnitController {
	constructor(
		private readonly administrativeUnitService: AdministrativeUnitService,
	) {}
}
