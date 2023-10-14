import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/utils';
import { UpdatePaymentRecordDto } from './dto/update-payment-record.dto';
import { GetPaymentRecordDto } from './dto/get-payment-record.dto';
import { PaymentRecordsService } from './payment-records.service';

@Controller('payment-records')
@ApiTags('payment-records')
export class PaymentRecordsController {
	constructor(private readonly paymentRecordsService: PaymentRecordsService) {}

	@Public()
	@Get()
	async findAll(@Query() filter: GetPaymentRecordDto) {
		return await this.paymentRecordsService.findAll(filter);
	}

	@Public()
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return await this.paymentRecordsService.findOne({ id });
	}

	@Public()
	@Patch(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdatePaymentRecordDto,
	) {
		return await this.paymentRecordsService.updateOne({ id }, input);
	}

	@Public()
	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number) {
		return await this.paymentRecordsService.deleteOne({ id });
	}
}
