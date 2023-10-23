import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { USER_ROLE } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Injectable()
export class TenantService {
	constructor(
		@InjectRepository(Tenant) private tenantsRepository: Repository<Tenant>,
		private usersService: UsersService,
	) {}
	async createOne(createDto: CreateTenantDto): Promise<Tenant> {
		const user = await this.usersService.createOne({
			...createDto,
			role: USER_ROLE.tenant,
		});

		const newEntity = new Tenant();

		newEntity.user = user;

		return await this.tenantsRepository.save(newEntity);
	}

	async findOneById(id: number): Promise<Tenant> {
		return await this.tenantsRepository.findOne({
			where: { id },
			relations: {
				user: true,
			},
		});
	}

	async findOneByCondititon(filter: object | object[]): Promise<Tenant> {
		return await this.tenantsRepository.findOne({
			where: filter,
			relations: {
				user: true,
			},
		});
	}

	async findMany(filter: object | object[] = {}): Promise<Tenant[]> {
		return this.tenantsRepository.find({
			where: filter,
			relations: {
				user: true,
			},
		});
	}

	async updateOneByCondititon(
		filter: object | object[],
		updateDto: UpdateTenantDto,
	): Promise<Tenant> {
		const entity = await this.tenantsRepository.findOne({ where: filter });

		if (!entity) {
			throw new NotFoundException(`Not found user`);
		}

		return await this.tenantsRepository.save({
			...entity,
			...updateDto,
		});
	}

	async deleteOneById(id: number): Promise<object> {
		const tenant = await this.findOneById(id);

		return await this.usersService.deleteOneById(tenant.user.id);
	}
}
