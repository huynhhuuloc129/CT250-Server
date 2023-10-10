import { Test, TestingModule } from '@nestjs/testing';
import { AdministrativeRegionController } from './administrative-region.controller';
import { AdministrativeRegionService } from './administrative-region.service';

describe('AdministrativeRegionController', () => {
  let controller: AdministrativeRegionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdministrativeRegionController],
      providers: [AdministrativeRegionService],
    }).compile();

    controller = module.get<AdministrativeRegionController>(AdministrativeRegionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
