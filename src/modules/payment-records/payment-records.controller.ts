import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdatePaymentRecordDto } from './dto/update-payment-record.dto';
import { GetPaymentRecordDto } from './dto/get-payment-record.dto';
import { PaymentRecordsService } from './payment-records.service';
import { RequiredRoles } from '../auth/decorators/required-roles.decorator';
import { USER_ROLE, User } from '../users/entities/user.entity';
import { Public } from '../auth/utils';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';

@Controller('payment-records')
@ApiTags('payment-records')
export class PaymentRecordsController {
	constructor(private readonly paymentRecordsService: PaymentRecordsService) {}

	@Get()
	@Public()
	async findAll(@Query() filter: GetPaymentRecordDto) {
		return await this.paymentRecordsService.findAll(filter);
	}

	@Get(':id')
	@Public()
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return await this.paymentRecordsService.findOne({ id });
	}

	@Patch(':id')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdatePaymentRecordDto,
		@GetCurrentUser() user: User,
	) {
		//TODO: update state
		console.log(user);
		return await this.paymentRecordsService.updateOne({ id }, input);
	}

	//NOTE: This API is currently not in use
	// @Delete(':id')
	// @ApiBearerAuth('bearer')
	// @RequiredRoles(USER_ROLE.lessor)
	// async remove(@Param('id', ParseIntPipe) id: number) {
	// 	return await this.paymentRecordsService.deleteOne({ id });
	// }
}
