import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { DistrictQueryDto } from './dto/district-query.dto';
import { ILike, Repository } from 'typeorm';
import { District } from './entities/district.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DistrictService {
	constructor(
		@InjectRepository(District) private districtService: Repository<District>,
	) {}
	async findMany(
		query: DistrictQueryDto,
		relations: object = {},
	): Promise<District[]> {
		const { searchField, searchValue, limit, offset } = query;
		const where = {};

		const allowedSearchFields = [
			'code',
			'name',
			'nameEn',
			'fullName',
			'fullNameEn',
			'codeName',
			'provinceCode',
		];

		if (searchField && !allowedSearchFields.includes(searchField)) {
			throw new BadRequestException('Invalid search field');
		}

		if (searchField && searchValue) {
			where[searchField] = ILike(`%${searchValue}%`);
		}

		return await this.districtService.find({
			where,
			relations,
			skip: offset,
			take: limit,
		});
	}

	async findOneByCode(
		provinceCode: string,
		relations: object = {},
	): Promise<District> {
		const district = await this.districtService.findOne({
			where: {
				code: provinceCode,
			},
			relations,
		});

		if (!district) {
			throw new NotFoundException('Not found district');
		}

		return district;
	}
}
