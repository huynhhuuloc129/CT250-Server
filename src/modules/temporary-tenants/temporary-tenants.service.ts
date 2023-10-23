import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/bases/service.base';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemporaryTenant } from './entities/temporary-tenants.entity';

@Injectable()
export class TemporaryTenantService extends BaseService<TemporaryTenant> {
	constructor(
		@InjectRepository(TemporaryTenant)
		private temporaryLessorRepository: Repository<TemporaryTenant>,
	) {
		super(temporaryLessorRepository);
	}
}
