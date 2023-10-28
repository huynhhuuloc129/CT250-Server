import { Controller, Get, Param, Query } from '@nestjs/common';
import { DistrictService } from './district.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/utils';
import { DistrictQueryDto } from './dto/district-query.dto';
import { District } from './entities/district.entity';

@Controller('districts')
@ApiTags('address/districts')
export class DistrictController {
	constructor(private readonly districtService: DistrictService) {}

	@Get()
	@Public()
	@ApiOperation({ summary: 'Find many districts' })
	async findMany(@Query() query: DistrictQueryDto): Promise<District[]> {
		return await this.districtService.findMany(query, { provinceCode: true });
	}

	@Get(':districtCode')
	@Public()
	@ApiOperation({ summary: 'Find One district' })
	async findOne(
		@Param('districtCode') districtCode: string,
	): Promise<District> {
		return await this.districtService.findOneByCode(districtCode, {
			wards: true,
		});
	}
}
