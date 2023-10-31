import { MiddlewareConsumer, Module } from '@nestjs/common';
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
import { WardModule } from './modules/ward/ward.module';
import { DistrictModule } from './modules/district/district.module';
import { ProvinceModule } from './modules/province/province.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { RoomingHousesModule } from './modules/rooming-houses/rooming-houses.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { RoomingSubscriptionsModule } from './modules/rooming-subscriptions/rooming-subscriptions.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { PaymentRecordsModule } from './modules/payment-records/payment-records.module';
import { RoomingSubscriptionRequestsModule } from './modules/rooming-subscription-requests/rooming-subscription-requests.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { RoomDescriptionsModule } from './modules/room-descriptions/room-descriptions.module';
import { AdministrativeUnitModule } from './modules/administrative-unit/administrative-unit.module';
import { AdministrativeRegionModule } from './modules/administrative-region/administrative-region.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './modules/auth/guards/access-token.guard';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { AppLoggerMiddleware } from './middlewares/logging.middleware';
import { TemporaryTenantsModule } from './modules/temporary-tenants/temporary-tenants.module';
import { GlobalExceptionFilter } from './exception-filters/global-exception.filter';
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
		WardModule,
		PhotoModule,
		UtilityModule,
		ReviewModule,
		RoomingHousesModule,
		RoomsModule,
		RoomingSubscriptionsModule,
		NotificationsModule,
		PaymentRecordsModule,
		RoomingSubscriptionRequestsModule,
		CategoriesModule,
		RoomDescriptionsModule,
		AdministrativeUnitModule,
		AdministrativeRegionModule,
		TemporaryTenantsModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AccessTokenGuard,
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
		{
			provide: APP_FILTER,
			useClass: GlobalExceptionFilter,
		},
	],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(AppLoggerMiddleware).forRoutes('*');
	}

	constructor() {
		console.log({ appConfig });
	}
}
