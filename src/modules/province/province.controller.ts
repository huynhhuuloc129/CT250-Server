import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/utils';
import { ProvinceQueryDto } from './dto/province-query.dto';
import { Province } from './entities/province.entity';

@Controller('provinces')
@ApiTags('address/provinces')
export class ProvinceController {
	constructor(private readonly provinceService: ProvinceService) {}
	@Get()
	@Public()
	@ApiOperation({ summary: 'Find many provinces' })
	async findMany(@Query() query: ProvinceQueryDto): Promise<Province[]> {
		return await this.provinceService.findMany(query);
	}

	@Get(':provinceCode')
	@ApiOperation({ summary: 'Find one  province' })
	@Public()
	async findOne(
		@Param('provinceCode') provinceCode: string,
	): Promise<Province> {
		return await this.provinceService.findOneByCode(provinceCode, {
			districts: true,
		});
	}
}
