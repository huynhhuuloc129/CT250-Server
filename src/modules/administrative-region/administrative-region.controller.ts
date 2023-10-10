import { Controller } from '@nestjs/common';
import { AdministrativeRegionService } from './administrative-region.service';

@Controller('administrative-region')
export class AdministrativeRegionController {
  constructor(private readonly administrativeRegionService: AdministrativeRegionService) {}
}
