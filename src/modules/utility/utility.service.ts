import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utility } from './entities/utility.entity';
import { UpdatePhoto } from '../photo/type/update-photo.type';
import { UpdateUtilityDto } from './dto/update-utility.dto';

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
	findMany() {}
	deleteOne() {}
}
