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
import { GetNotificationDto } from './dto/get-notification.dto';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationsService } from './notification.service';

@Controller('notifications')
@ApiTags('notifications')
export class NotificationsController {
	constructor(private readonly notificationService: NotificationsService) {}

	@Public()
	@Get()
	async findAll(@Query() filter: GetNotificationDto) {
		return await this.notificationService.findAll(filter);
	}

	@Public()
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return await this.notificationService.findOne({ id });
	}

	@Public()
	@Post()
	@ApiBody({ type: CreateNotificationDto })
	async create(@Body() input: CreateNotificationDto) {
		return await this.notificationService.createOne(input);
	}

	@Public()
	@Patch(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdateNotificationDto,
	) {
		return await this.notificationService.updateOne({ id }, input);
	}

	@Public()
	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number) {
		return await this.notificationService.deleteOne({ id });
	}
}
