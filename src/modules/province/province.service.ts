import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Province } from './entities/province.entity';
import { ILike, Repository } from 'typeorm';
import { ProvinceQueryDto } from './dto/province-query.dto';

@Injectable()
export class ProvinceService {
	constructor(
		@InjectRepository(Province) private provinceService: Repository<Province>,
	) {}

	async findMany(
		query: ProvinceQueryDto,
		relations: object = {},
	): Promise<Province[]> {
		const { searchField, searchValue, limit, offset } = query;
		const where = {};

		const allowedSearchFields = [
			'code',
			'name',
			'nameEn',
			'fullName',
			'fullNameEn',
			'codeName',
		];

		if (searchField && !allowedSearchFields.includes(searchField)) {
			throw new BadRequestException('Invalid search field');
		}

		if (searchField && searchValue) {
			where[searchField] = ILike(`%${searchValue}%`);
		}

		return await this.provinceService.find({
			where,
			relations,
			skip: offset,
			take: limit,
		});
	}

	async findOneByCode(
		provinceCode: string,
		relations: object = {},
	): Promise<Province> {
		const province = await this.provinceService.findOne({
			where: {
				code: provinceCode,
			},
			relations,
		});

		if (!province) {
			throw new NotFoundException('Not found province');
		}

		return province;
	}
}
