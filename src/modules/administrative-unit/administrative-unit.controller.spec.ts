import { Test, TestingModule } from '@nestjs/testing';
import { AdministrativeUnitController } from './administrative-unit.controller';
import { AdministrativeUnitService } from './administrative-unit.service';

describe('AdministrativeUnitController', () => {
  let controller: AdministrativeUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdministrativeUnitController],
      providers: [AdministrativeUnitService],
    }).compile();

    controller = module.get<AdministrativeUnitController>(AdministrativeUnitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
