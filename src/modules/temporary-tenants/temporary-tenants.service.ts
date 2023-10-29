import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/bases/service.base';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { TemporaryTenant } from './entities/temporary-tenants.entity';
import { GetTemporaryTenantDto } from './dto/get-temporary-tenants.dto';

@Injectable()
export class TemporaryTenantService extends BaseService<TemporaryTenant> {
	constructor(
		@InjectRepository(TemporaryTenant)
		private temporaryLessorRepository: Repository<TemporaryTenant>,
	) {
		super(temporaryLessorRepository);
	}

	async getManyTemporaryTenant(filter: GetTemporaryTenantDto) {
		try {
			const { limit, offset, sortField, sortOrder, ...condition } = filter;

			const where = {};
			if (condition?.searchField && condition?.searchValue) {
				where[condition.searchField] = ILike(`%${condition.searchValue}%`);
			}

			const order = {};
			if (sortField && sortOrder) {
				order[sortField] = sortOrder;
			}
			if (filter.roomingSubscriptionId) {
				where['roomingSubscriptionId'] = filter.roomingSubscriptionId;
			}
			if (filter.citizenId) {
				where['citizenId'] = filter.citizenId;
			}
			if (filter.startDate) {
				where['startDate'] = filter.startDate;
			}
			if (filter.endDate) {
				where['endDate'] = filter.endDate;
			}

			const [count, data] = await Promise.all([
				this.temporaryLessorRepository.count({
					where,
				}),
				this.temporaryLessorRepository.find({
					where,
					order,
					take: limit ? (limit <= 100 ? limit : 100) : 10,
					skip: offset ? offset : 0,
				}),
			]);

			return {
				filter: filter,
				total: count,
				data,
			};
		} catch (err) {
			throw new BadRequestException(err);
		}
	}
}
