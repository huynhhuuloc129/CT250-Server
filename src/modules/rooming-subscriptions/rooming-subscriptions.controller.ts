import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/utils';
import { RoomingSubscriptionService } from './rooming-subscriptions.service';
import { GetRoomingSubscriptionDto } from './dto/get-rooming-subscription.dto';
import { CreatePaymentRecordDto } from '../payment-records/dto/create-payment-record.dto';
import { PaymentRecordsService } from '../payment-records/payment-records.service';
import { GetPaymentRecordDto } from '../payment-records/dto/get-payment-record.dto';
import { RequiredRoles } from '../auth/decorators/required-roles.decorator';
import { USER_ROLE, User } from '../users/entities/user.entity';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';
import { TemporaryTenantService } from '../temporary-tenants/temporary-tenants.service';
import { GetTemporaryTenantDto } from '../temporary-tenants/dto/get-temporary-tenants.dto';
import { CreateTemporaryTenantDto } from '../temporary-tenants/dto/create-temporary-tenants.dto';

@Controller('rooming-subscriptions')
@ApiTags('rooming-subscriptions')
export class RoomingSubscriptionController {
	constructor(
		private readonly roomingSubscriptionService: RoomingSubscriptionService,
		private temporaryTenantService: TemporaryTenantService,
		private paymentRecordService: PaymentRecordsService,
	) {}

	@Public()
	@Get()
	async findMany(@Query() filter: GetRoomingSubscriptionDto) {
		return await this.roomingSubscriptionService.findManyRoomingSubscription(
			filter,
		);
	}

	@Public()
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return await this.roomingSubscriptionService.findOneWithRelation({
			where: { id },
			relations: { room: true, tenant: { user: true } },
		});
	}

	// @Patch(':id')
	// @ApiBearerAuth('bearer')
	// @RequiredRoles(USER_ROLE.lessor)
	// async update(
	// 	@Param('id', ParseIntPipe) id: number,
	// 	@Body() input: UpdateRoomingSubscriptionDto,
	// 	@GetCurrentUser() user: User,
	// ) {
	// 	console.log(user);
	// 	return await this.roomingSubscriptionService.updateOne({ id }, input);
	// }

	//NOTE: API is currently not in use
	// @Public()
	// @Delete(':id')
	// @ApiBearerAuth('bearer')
	// @RequiredRoles(USER_ROLE.ADMIN)
	// async remove(@Param('id', ParseIntPipe) id: number) {
	// 	return await this.roomingSubscriptionService.deleteOne({ id });
	// }

	// NOTE: Temporary Lessor
	@Post(':id/temporary-tenant')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	async createTemporaryLessor(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: CreateTemporaryTenantDto,
		@GetCurrentUser() user: User,
	) {
		console.log(user);
		input.roomingSubscriptionId = id;
		return await this.temporaryTenantService.createOne(input);
	}

	@Public()
	@Get(':id/temporary-tenant')
	async findManyTemporaryLessor(
		@Param('id', ParseIntPipe) id: number,
		@Query() filter: GetTemporaryTenantDto,
	) {
		filter.roomingSubscriptionId = id;
		return await this.temporaryTenantService.getManyTemporaryTenant(filter);
	}

	//NOTE: Payment Record
	@Post(':id/payment-records')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	async createPaymentRecord(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: CreatePaymentRecordDto,
		@GetCurrentUser() user: User,
	) {
		console.log(user);
		input.roomingSubscriptionId = id;
		return await this.roomingSubscriptionService.createPaymentRecord(input);
	}

	@Public()
	@Get(':id/payment-records')
	async findManyPaymentRecord(
		@Param('id', ParseIntPipe) id: number,
		@Query() filter: GetPaymentRecordDto,
	) {
		filter.roomingSubscriptionId = id;
		return await this.paymentRecordService.getManyPaymentRecord(filter);
	}
}
