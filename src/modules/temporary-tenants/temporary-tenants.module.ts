import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemporaryTenant } from './entities/temporary-tenants.entity';
import { TemporaryTenantController } from './temporary-tenants.controller';
import { TemporaryTenantService } from './temporary-tenants.service';

@Module({
	imports: [TypeOrmModule.forFeature([TemporaryTenant])],
	controllers: [TemporaryTenantController],
	providers: [TemporaryTenantService],
	exports: [TemporaryTenantService],
})
export class TemporaryTenantsModule {}
