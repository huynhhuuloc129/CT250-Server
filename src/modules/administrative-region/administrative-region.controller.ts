import { Controller } from '@nestjs/common';
import { AdministrativeRegionService } from './administrative-region.service';

@Controller('administrative-regions')
export class AdministrativeRegionController {
	constructor(
		private readonly administrativeRegionService: AdministrativeRegionService,
	) {}
}
