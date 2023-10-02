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
import { CreatePaymentRecordDto } from './dto/create-payment-record.dto';
import { UpdatePaymentRecordDto } from './dto/update-payment-record.dto';
import { GetPaymentRecordDto } from './dto/get-payment-record.dto';

@Controller('payment-records')
@ApiTags('payment-records')
export class PaymentRecordsController {
	@Public()
	@Get()
	findAll(@Query() filter: GetPaymentRecordDto) {
		return filter;
	}

	@Public()
	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return id;
	}

	@Public()
	@Post()
	@ApiBody({ type: CreatePaymentRecordDto })
	create(@Body() input: CreatePaymentRecordDto) {
		return input;
	}

	@Public()
	@Patch(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateCategoryDto: UpdatePaymentRecordDto,
	) {
		return updateCategoryDto;
	}

	@Public()
	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return id;
	}
}
