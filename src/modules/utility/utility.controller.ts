import { Controller, Delete, Get, Patch } from '@nestjs/common';
import { UtilityService } from './utility.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('utility')
@ApiTags('utility')
@ApiBearerAuth()
export class UtilityController {
	constructor(private readonly utilityService: UtilityService) {}
	@Get()
	findAll() {}
	@Get(':utilityId')
	findOne() {}
	@Patch(':utilityId')
	updateOne() {}
	@Delete(':utilityId')
	deleteOne() {}
}
