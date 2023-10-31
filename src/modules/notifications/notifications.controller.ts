import { Public } from './../auth/utils';
import {
	BadRequestException,
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
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { GetNotificationDto } from './dto/get-notification.dto';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationsService } from './notifications.service';
import { RequiredRoles } from '../auth/decorators/required-roles.decorator';
import { USER_ROLE, User } from '../users/entities/user.entity';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';
import { NOTIFICATION_TYPE } from 'src/shared/enums/common.enum';

@Controller('notifications')
@ApiTags('notifications')
export class NotificationsController {
	constructor(private readonly notificationService: NotificationsService) {}

	@Get()
	@Public()
	async findAll(@Query() filter: GetNotificationDto) {
		return await this.notificationService.findManyNotification(filter);
	}

	@Get(':id')
	@Public()
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return await this.notificationService.findOneWithRelation({
			where: { id },
			relations: { roomingHouse: true, room: true },
		});
	}

	@Post()
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	@ApiBody({ type: CreateNotificationDto })
	async create(
		@Body() input: CreateNotificationDto,
		@GetCurrentUser() user: User,
	) {
		console.log(user);
		if (input.type == NOTIFICATION_TYPE.ROOMING_HOUSE) {
			if (input.roomId) {
				throw new BadRequestException('input invalid!');
			}
			return await this.notificationService.createManyNotification(input);
		} else {
			return await this.notificationService.createNotification(input);
		}
	}

	@Patch(':id')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdateNotificationDto,
		@GetCurrentUser() user: User,
	) {
		console.log(user);
		return await this.notificationService.updateOne({ id }, input);
	}

	@Public()
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	@Delete(':id')
	async remove(
		@Param('id', ParseIntPipe) id: number,
		@GetCurrentUser() user: User,
	) {
		console.log(user);
		return await this.notificationService.deleteOne({ id });
	}
}
