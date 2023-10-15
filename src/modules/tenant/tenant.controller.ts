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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { RequiredRoles } from '../auth/decorators/required-roles.decorator';
import { USER_ROLE } from '../users/entities/user.entity';

@Controller('tenants')
@ApiTags('tenants')
@ApiBearerAuth('bearer')
export class TenantController {
	constructor(private readonly tenantService: TenantService) {}

	@Get()
	@RequiredRoles(USER_ROLE.ADMIN)
	@ApiOperation({ summary: 'Find many tenant' })
	async findMany(): Promise<Tenant[]> {
		return await this.tenantService.findMany();
	}

	@Get(':tenantId')
	@RequiredRoles(USER_ROLE.ADMIN)
	@ApiOperation({ summary: 'Find one tenant' })
	async findOneById(
		@Param('tenantId', ParseIntPipe) tenantId: number,
	): Promise<Tenant> {
		return await this.tenantService.findOneById(tenantId);
	}

	@Post()
	@RequiredRoles(USER_ROLE.ADMIN)
	@ApiOperation({ summary: 'Create one tenant' })
	async createOne(@Body() createDto: CreateTenantDto): Promise<Tenant> {
		return await this.tenantService.createOne(createDto);
	}

	@Delete(':tenantId')
	@RequiredRoles(USER_ROLE.ADMIN)
	@ApiOperation({ summary: 'Delete one tenant' })
	deleteOneByID(
		@Param('tenantId', ParseIntPipe) tenantId: number,
	): Promise<object> {
		return this.tenantService.deleteOneById(tenantId);
	}
}
