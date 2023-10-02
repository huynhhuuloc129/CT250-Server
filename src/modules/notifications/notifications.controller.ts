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

@Controller('notifications')
@ApiTags('notifications')
export class NotificationsController {
	@Public()
	@Get()
	findAll(@Query() filter: GetNotificationDto) {
		return filter;
	}

	@Public()
	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return id;
	}

	@Public()
	@Post()
	@ApiBody({ type: CreateNotificationDto })
	create(@Body() input: CreateNotificationDto) {
		return input;
	}

	@Public()
	@Patch(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateCategoryDto: UpdateNotificationDto,
	) {
		return updateCategoryDto;
	}

	@Public()
	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return id;
	}
}
