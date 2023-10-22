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
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/utils';
import { RoomingSubscriptionRequestService } from './rooming-subscription-requests.service';
import { CreateRoomingSubscriptionRequestDto } from './dto/create-rooming-subscription-request.dto';
import { GetRoomingSubscriptionRequestDto } from './dto/get-rooming-subscription-request.dto';
import { UpdateRoomingSubscriptionRequestDto } from './dto/update-rooming-subscription-request.dto';
import { USER_ROLE, User } from '../users/entities/user.entity';
import { RequiredRoles } from '../auth/decorators/required-roles.decorator';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';

@Controller('rooming-subcription-requests')
@ApiTags('rooming-subcription-requests')
export class RoomingSubscriptionRequestController {
	constructor(
		private readonly roomingSubscriptionRequestService: RoomingSubscriptionRequestService,
	) {}

	@Post()
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.tenant)
	@ApiBody({ type: CreateRoomingSubscriptionRequestDto })
	async create(
		@Body() input: CreateRoomingSubscriptionRequestDto,
		@GetCurrentUser() user: User,
	) {
		input.tenantId = user.id;
		return await this.roomingSubscriptionRequestService.createOne(input);
	}

	@Public()
	@Get()
	async findAll(@Query() filter: GetRoomingSubscriptionRequestDto) {
		return await this.roomingSubscriptionRequestService.findAll(filter);
	}

	@Public()
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return await this.roomingSubscriptionRequestService.findOneWithRelation({
			where: { id },
			relations: { room: true, tenant: true },
		});
	}

	@Patch(':id')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor, USER_ROLE.tenant)
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdateRoomingSubscriptionRequestDto,
		@GetCurrentUser() user: User,
	) {
		console.log(user);
		return await this.roomingSubscriptionRequestService.updateOne(
			{ id },
			input,
		);
	}

	@Delete(':id')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor, USER_ROLE.tenant)
	async remove(
		@Param('id', ParseIntPipe) id: number,
		@GetCurrentUser() user: User,
	) {
		console.log(user);
		return await this.roomingSubscriptionRequestService.deleteOne({ id });
	}
}
