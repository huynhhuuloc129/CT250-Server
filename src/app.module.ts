import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfig } from './app.config';
import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { RoomingHousesModule } from './modules/rooming-houses/rooming-houses.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { RoomingSubscriptionsModule } from './modules/rooming-subscriptions/rooming-subscriptions.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { PaymentRecordsModule } from './modules/payment-records/payment-records.module';
import { RoomingSubscriptionRequestsModule } from './modules/rooming-subscription-requests/rooming-subscription-requests.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { RoomDescriptionsModule } from './modules/room-descriptions/room-descriptions.module';
import { TemporaryLessorsModule } from './modules/temporary-lessors/temporary-lessors.module';
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
		RoomingHousesModule,
		RoomsModule,
		RoomingSubscriptionsModule,
		NotificationsModule,
		PaymentRecordsModule,
		RoomingSubscriptionRequestsModule,
		CategoriesModule,
		RoomDescriptionsModule,
		TemporaryLessorsModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
