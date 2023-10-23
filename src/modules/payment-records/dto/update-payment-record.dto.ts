import { PartialType } from '@nestjs/swagger';
import { CreatePaymentRecordDto } from './create-payment-record.dto';

export class UpdatePaymentRecordDto extends PartialType(
	CreatePaymentRecordDto,
) {}
