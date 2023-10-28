import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ward } from './entities/ward.entity';
import { ILike, Repository } from 'typeorm';
import { WardQueryDto } from './dto/ward-query.dto';

@Injectable()
export class WardService {
	constructor(@InjectRepository(Ward) private wardService: Repository<Ward>) {}

	async findMany(query: WardQueryDto, relations: object = {}): Promise<Ward[]> {
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

		return await this.wardService.find({
			where,
			relations,
			skip: offset,
			take: limit,
		});
	}

	async findOneByCode(
		provinceCode: string,
		relations: object = {},
	): Promise<Ward> {
		const ward = await this.wardService.findOne({
			where: {
				code: provinceCode,
			},
			relations,
		});

		if (!ward) {
			throw new NotFoundException('Not found ward');
		}

		return ward;
	}
}
