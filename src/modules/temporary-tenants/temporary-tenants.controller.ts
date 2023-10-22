import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/utils';
import { TemporaryTenantService } from './temporary-tenants.service';
import { GetTemporaryTenantDto } from './dto/get-temporary-tenants.dto';
import { UpdateTemporaryTenantDto } from './dto/update-temporary-tenants.dto';

@Controller('temporary-tenants')
@ApiTags('temporary-tenants')
export class TemporaryTenantController {
	constructor(
		private readonly temporaryTenantService: TemporaryTenantService,
	) {}

	@Public()
	@Get()
	async findAll(@Query() filter: GetTemporaryTenantDto) {
		return await this.temporaryTenantService.findAll(filter);
	}

	@Public()
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return await this.temporaryTenantService.findOne({ id });
	}

	@Public()
	@Patch(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdateTemporaryTenantDto,
	) {
		return await this.temporaryTenantService.updateOne({ id }, input);
	}

	@Public()
	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number) {
		return await this.temporaryTenantService.deleteOne({ id });
	}
}
