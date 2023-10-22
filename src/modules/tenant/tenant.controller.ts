import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	ParseIntPipe,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { Tenant } from './entities/tenant.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateTenantDto } from './dto/create-tenant.dto';

@Controller('tenants')
@ApiTags('tenants')
export class TenantController {
	constructor(private readonly tenantService: TenantService) {}

	@Get()
	async findMany(): Promise<Tenant[]> {
		return await this.tenantService.findMany();
	}

	@Get(':tenantId')
	async findOneById(
		@Param('tenantId', ParseIntPipe) tenantId: number,
	): Promise<Tenant> {
		return await this.tenantService.findOneById(tenantId);
	}

	@Post()
	async createOne(@Body() createDto: CreateTenantDto): Promise<Tenant> {
		return await this.tenantService.createOne(createDto);
	}

	@Delete(':tenantId')
	deleteOneByID(
		@Param('tenantId', ParseIntPipe) tenantId: number,
	): Promise<object> {
		return this.tenantService.deleteOneById(tenantId);
	}
}
