import { Test, TestingModule } from '@nestjs/testing';
import { CommnueService } from './ward.service';

describe('CommnueService', () => {
	let service: CommnueService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [CommnueService],
		}).compile();

		service = module.get<CommnueService>(CommnueService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
