import { Test, TestingModule } from '@nestjs/testing';
import { AdministrativeRegionService } from './administrative-region.service';

describe('AdministrativeRegionService', () => {
  let service: AdministrativeRegionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdministrativeRegionService],
    }).compile();

    service = module.get<AdministrativeRegionService>(AdministrativeRegionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
