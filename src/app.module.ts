import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfig } from './app.config';
import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { AdminModule } from './modules/admin/admin.module';
import { LessorModule } from './modules/lessor/lessor.module';
import { ReviewModule } from './modules/review/review.module';
import { UtilityModule } from './modules/utility/utility.module';
import { PhotoModule } from './modules/photo/photo.module';
import { CommnueModule } from './modules/commnue/commnue.module';
import { DistrictModule } from './modules/district/district.module';
import { ProvinceModule } from './modules/province/province.module';
import { TenantModule } from './modules/tenant/tenant.module';
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: (configService: ConfigService) => {
				return {
					host: configService.get('POSTGRES_HOST'),
					port: configService.get('POSTGRES_PORT') as unknown as number,
					username: configService.get('POSTGRES_USER'),
					password: configService.get('POSTGRES_PASSWORD'),
					database: process.env.POSTGRES_DB,
					synchronize: true,
					type: 'postgres',
					autoLoadEntities: true,
				};
			},
			inject: [ConfigService],
		}),
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		BullModule.forRoot({
			redis: {
				host: appConfig.redis.host,
				port: appConfig.redis.port,
			},
		}),
		CacheModule.registerAsync<any>({
			isGlobal: true,
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => {
				const store = await redisStore({
					url: `redis://${configService.get('REDIS_HOST')}:${configService.get(
						'REDIS_PORT',
					)}`,
				});
				return {
					store: () => store,
				};
			},
			inject: [ConfigService],
		}),
		AuthModule,
		UsersModule,
		AdminModule,
		LessorModule,
		TenantModule,
		ProvinceModule,
		DistrictModule,
		CommnueModule,
		PhotoModule,
		UtilityModule,
		ReviewModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
