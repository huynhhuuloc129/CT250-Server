import { Test, TestingModule } from '@nestjs/testing';
import { CommnueController } from './commnue.controller';
import { CommnueService } from './commnue.service';

describe('CommnueController', () => {
	let controller: CommnueController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CommnueController],
			providers: [CommnueService],
		}).compile();

		controller = module.get<CommnueController>(CommnueController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
