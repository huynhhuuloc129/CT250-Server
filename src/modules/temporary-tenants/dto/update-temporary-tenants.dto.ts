import { PartialType } from '@nestjs/swagger';
import { CreateTemporaryTenantDto } from './create-temporary-tenants.dto';

export class UpdateTemporaryTenantDto extends PartialType(
	CreateTemporaryTenantDto,
) {}
