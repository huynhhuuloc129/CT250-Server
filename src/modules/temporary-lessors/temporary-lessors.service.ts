import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/bases/service.base';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemporaryLessor } from './entities/temporary-lessor.entity';

@Injectable()
export class TemporaryLessorService extends BaseService<TemporaryLessor> {
	constructor(
		@InjectRepository(TemporaryLessor)
		private temporaryLessorRepository: Repository<TemporaryLessor>,
	) {
		super(temporaryLessorRepository);
	}
}
