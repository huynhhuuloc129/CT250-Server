import { PickType } from '@nestjs/swagger';
import { CreateNotificationDto } from './create-notification.dto';

export class UpdateNotificationDto extends PickType(CreateNotificationDto, [
	'title',
	'content',
]) {}
