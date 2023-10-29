import { PickType } from '@nestjs/swagger';
import { CreatePaymentRecordDto } from './create-payment-record.dto';

export class UpdatePaymentRecordDto extends PickType(CreatePaymentRecordDto, [
	'state',
	'paidDate',
	'surcharge',
]) {}
