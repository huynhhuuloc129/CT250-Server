import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utility } from './entities/utility.entity';
import { UpdatePhoto } from '../photo/type/update-photo.type';
import { UpdateUtilityDto } from './dto/update-utility.dto';
import { CreateUtilityDto } from './dto/create-utility.dto';

@Injectable()
export class UtilityService {
	constructor(
		@InjectRepository(Utility) private utilitiesRepository: Repository<Utility>,
	) {}

	async updateOneByCondititon(
		filter: object | object[],
		updateDto: UpdateUtilityDto | UpdatePhoto,
	): Promise<Utility> {
		const entity = await this.utilitiesRepository.findOne({ where: filter });

		if (!entity) {
			throw new NotFoundException(`Not found utility`);
		}

		return await this.utilitiesRepository.save({
			...entity,
			...updateDto,
		});
	}

	async findOneByCondititon(filter: object | object[]): Promise<Utility> {
		return await this.utilitiesRepository.findOne({
			where: filter,
			relations: {
				photo: true,
			},
		});
	}

	async findMany(filter: object | object[] = {}): Promise<Utility[]> {
		return await this.utilitiesRepository.find({
			where: filter,
		});
	}

	async deleteOne(id: number): Promise<object> {
		return await this.utilitiesRepository.delete(id);
	}

	async createOne(createDto: CreateUtilityDto): Promise<Utility> {
		const utility = this.utilitiesRepository.create(createDto);

		return this.utilitiesRepository.save(utility);
	}
}
