import { Controller, Get, Param, Query } from '@nestjs/common';
import { WardService } from './ward.service';
import { WardQueryDto } from './dto/ward-query.dto';
import { Public } from '../auth/utils';
import { Ward } from './entities/ward.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('wards')
@ApiTags('address/wards')
export class WardController {
	constructor(private readonly wardService: WardService) {}

	@Get()
	@Public()
	@ApiOperation({ summary: 'Find many wards' })
	async findMany(@Query() query: WardQueryDto): Promise<Ward[]> {
		return await this.wardService.findMany(query);
	}

	@Get(':wardCode')
	@Public()
	@ApiOperation({ summary: 'Find One ward' })
	async findOne(@Param('wardCode') wardCode: string): Promise<Ward> {
		return await this.wardService.findOneByCode(wardCode);
	}
}
