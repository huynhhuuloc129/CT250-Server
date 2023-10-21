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
import { CreateTemporaryLessorDto } from '../temporary-tenants/dto/create-temporary-tenants.dto';
import { GetTemporaryLessorDto } from '../temporary-tenants/dto/get-temporary-tenants.dto';
import { TemporaryLessorService } from '../temporary-tenants/temporary-tenants.service';
import { CreatePaymentRecordDto } from '../payment-records/dto/create-payment-record.dto';
import { PaymentRecordsService } from '../payment-records/payment-records.service';
import { GetPaymentRecordDto } from '../payment-records/dto/get-payment-record.dto';

@Controller('rooming-subscriptions')
@ApiTags('rooming-subscriptions')
export class RoomingSubscriptionController {
	constructor(
		private readonly roomingSubscriptionService: RoomingSubscriptionService,
		private temporaryLessorService: TemporaryLessorService,
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
			relations: { room: true, lessor: true },
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
	@ApiBody({ type: CreateTemporaryLessorDto })
	async createTemporaryLessor(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: CreateTemporaryLessorDto,
	) {
		input.roomingSubscriptionId = id;
		return await this.temporaryLessorService.createOne(input);
	}

	@Public()
	@Get(':id/temporary-lessors')
	async findManyTemporaryLessor(
		@Param('id', ParseIntPipe) id: number,
		@Query() filter: GetTemporaryLessorDto,
	) {
		filter.roomingSubscriptionId = id;
		return await this.temporaryLessorService.findAll(filter);
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
