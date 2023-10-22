import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/utils';
import { RoomingSubscriptionService } from './rooming-subscriptions.service';
import { CreateRoomingSubscriptionDto } from './dto/create-rooming-subscription.dto';
import { UpdateRoomingSubscriptionDto } from './dto/update-rooming-subscription.dto';
import { GetRoomingSubscriptionDto } from './dto/get-rooming-subscription.dto';
import { CreatePaymentRecordDto } from '../payment-records/dto/create-payment-record.dto';
import { PaymentRecordsService } from '../payment-records/payment-records.service';
import { GetPaymentRecordDto } from '../payment-records/dto/get-payment-record.dto';
import { TemporaryTenantService } from '../temporary-tenants/temporary-tenants.service';
import { CreateTemporaryTenantDto } from '../temporary-tenants/dto/create-temporary-tenants.dto';
import { GetTemporaryTenantDto } from '../temporary-tenants/dto/get-temporary-tenants.dto';

@Controller('rooming-subscriptions')
@ApiTags('rooming-subscriptions')
export class RoomingSubscriptionController {
	constructor(
		private readonly roomingSubscriptionService: RoomingSubscriptionService,
		private temporaryTenantService: TemporaryTenantService,
		private paymentRecordService: PaymentRecordsService,
	) {}

	@Public()
	@Post()
	@ApiBody({ type: CreateRoomingSubscriptionDto })
	async create(@Body() input: CreateRoomingSubscriptionDto) {
		return await this.roomingSubscriptionService.createOne(input);
	}

	@Public()
	@Get()
	async findAll(@Query() filter: GetRoomingSubscriptionDto) {
		return await this.roomingSubscriptionService.findAll(filter);
	}

	@Public()
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return await this.roomingSubscriptionService.findOneWithRelation({
			where: { id },
			relations: { room: true, tenant: true },
		});
	}

	@Public()
	@Patch(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdateRoomingSubscriptionDto,
	) {
		return await this.roomingSubscriptionService.updateOne({ id }, input);
	}

	@Public()
	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number) {
		return await this.roomingSubscriptionService.deleteOne({ id });
	}

	// NOTE: Temporary Lessor
	@Public()
	@Post(':id/temporary-lessors')
	async createTemporaryLessor(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: CreateTemporaryTenantDto,
	) {
		input.roomingSubscriptionId = id;
		return await this.temporaryTenantService.createOne(input);
	}

	@Public()
	@Get(':id/temporary-lessors')
	async findManyTemporaryLessor(
		@Param('id', ParseIntPipe) id: number,
		@Query() filter: GetTemporaryTenantDto,
	) {
		filter.roomingSubscriptionId = id;
		return await this.temporaryTenantService.findAll(filter);
	}

	//NOTE: Payment Record
	@Public()
	@Post(':id/payment-records')
	@ApiBody({ type: CreatePaymentRecordDto })
	async createPaymentRecord(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: CreatePaymentRecordDto,
	) {
		input.roomingSubscriptionId = id;
		return await this.paymentRecordService.createOne(input);
	}

	@Public()
	@Get(':id/payment-records')
	async findManyPaymentRecord(
		@Param('id', ParseIntPipe) id: number,
		@Query() filter: GetPaymentRecordDto,
	) {
		filter.roomingSubscriptionId = id;
		return await this.paymentRecordService.findAll(filter);
	}
}
