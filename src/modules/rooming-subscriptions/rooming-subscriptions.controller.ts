import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/utils';
import { RoomingSubscriptionService } from './rooming-subscriptions.service';
import { UpdateRoomingSubscriptionDto } from './dto/update-rooming-subscription.dto';
import { GetRoomingSubscriptionDto } from './dto/get-rooming-subscription.dto';
import { CreateTemporaryLessorDto } from '../temporary-lessors/dto/create-temporary-lessors.dto';
import { GetTemporaryLessorDto } from '../temporary-lessors/dto/get-temporary-lessors.dto';
import { TemporaryLessorService } from '../temporary-lessors/temporary-lessors.service';
import { CreatePaymentRecordDto } from '../payment-records/dto/create-payment-record.dto';
import { PaymentRecordsService } from '../payment-records/payment-records.service';
import { GetPaymentRecordDto } from '../payment-records/dto/get-payment-record.dto';
import { RequiredRoles } from '../auth/decorators/required-roles.decorator';
import { USER_ROLE, User } from '../users/entities/user.entity';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';

@Controller('rooming-subscriptions')
@ApiTags('rooming-subscriptions')
export class RoomingSubscriptionController {
	constructor(
		private readonly roomingSubscriptionService: RoomingSubscriptionService,
		private temporaryLessorService: TemporaryLessorService,
		private paymentRecordService: PaymentRecordsService,
	) {}

	//NOTE: This will only be auto-created after sub_req is created
	// @Post()
	// @ApiBearerAuth('bearer')
	// @ApiBody({ type: CreateRoomingSubscriptionDto })
	// async create(@Body() input: CreateRoomingSubscriptionDto) {
	// 	return await this.roomingSubscriptionService.createOne(input);
	// }

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

	@Patch(':id')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdateRoomingSubscriptionDto,
		@GetCurrentUser() user: User,
	) {
		console.log(user);
		return await this.roomingSubscriptionService.updateOne({ id }, input);
	}

	//NOTE: API is currently not in use
	// @Public()
	// @Delete(':id')
	// @ApiBearerAuth('bearer')
	// @RequiredRoles(USER_ROLE.ADMIN)
	// async remove(@Param('id', ParseIntPipe) id: number) {
	// 	return await this.roomingSubscriptionService.deleteOne({ id });
	// }

	// NOTE: Temporary Lessor
	@Post(':id/temporary-lessors')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	@ApiBody({ type: CreateTemporaryLessorDto })
	async createTemporaryLessor(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: CreateTemporaryLessorDto,
		@GetCurrentUser() user: User,
	) {
		console.log(user);
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
