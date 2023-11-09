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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/utils';
import { TemporaryTenantService } from './temporary-tenants.service';
import { GetTemporaryTenantDto } from './dto/get-temporary-tenants.dto';
import { UpdateTemporaryTenantDto } from './dto/update-temporary-tenants.dto';
import { RequiredRoles } from '../auth/decorators/required-roles.decorator';
import { USER_ROLE } from '../users/entities/user.entity';

@Controller('temporary-tenants')
@ApiTags('temporary-tenants')
export class TemporaryTenantController {
	constructor(
		private readonly temporaryTenantService: TemporaryTenantService,
	) {}

	@Public()
	@Get()
	async findAll(@Query() filter: GetTemporaryTenantDto) {
		return await this.temporaryTenantService.getManyTemporaryTenant(filter);
	}

	@Public()
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return await this.temporaryTenantService.findOne({ id });
	}

	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	@Patch(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdateTemporaryTenantDto,
	) {
		return await this.temporaryTenantService.updateOne({ id }, input);
	}

	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number) {
		return await this.temporaryTenantService.deleteOne({ id });
	}
}
