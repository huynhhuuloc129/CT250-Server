import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/utils';
import { CreateRoomingHouseDto } from './dto/create-rooming-house.dto';
import { UpdateRoomingHouseDto } from './dto/update-rooming-house.dto';
import { GetRoomingHouseDto } from './dto/get-rooming-house.dto';
import { CreateRoomDto } from '../rooms/dto/create-room.dto';
import { RoomingHousesService } from './rooming-houses.service';
import { GetRoomDto } from '../rooms/dto/get-room.dto';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';
import { USER_ROLE, User } from '../users/entities/user.entity';
import { RequiredRoles } from '../auth/decorators/required-roles.decorator';
import { CreateRoomingSubscriptionRequestDto } from '../rooming-subscription-requests/dto/create-rooming-subscription-request.dto';
import { UpdateRoomingSubscriptionRequestDto } from '../rooming-subscription-requests/dto/update-rooming-subscription-request.dto';
import { UpdateRoomingSubscriptionDto } from '../rooming-subscriptions/dto/update-rooming-subscription.dto';
import { ROOMING_SUBSCRIPTION_REQUEST_STATE } from 'src/shared/enums/common.enum';

@Controller('rooming-houses')
@ApiTags('rooming-houses')
export class RoomingHousesController {
	constructor(private readonly roomingHousesService: RoomingHousesService) {}

	@Public()
	@Get()
	async findMany(@Query() filter: GetRoomingHouseDto) {
		return await this.roomingHousesService.findManyRoomingHouse(filter);
	}

	@Public()
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		const data = await this.roomingHousesService.findOneWithRelation({
			where: { id },
			relations: {
				category: true,
				lessor: { user: true },
				photos: true,
				rooms: true,
				ward: { districtCode: { provinceCode: true } },
			},
		});
		if (!data) {
			throw new NotFoundException('roomingHouse not found');
		}
		return data;
	}

	@Post()
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	async create(
		@Body() input: CreateRoomingHouseDto,
		@GetCurrentUser() user: User,
	) {
		input.lessorId = user.id;
		return await this.roomingHousesService.createRoomingHouse(input);
	}

	@Patch(':id')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdateRoomingHouseDto,
		@GetCurrentUser() user: User,
	) {
		console.log(user);
		return await this.roomingHousesService.updateOne({ id }, input);
	}

	@Delete(':id')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	async remove(
		@Param('id', ParseIntPipe) id: number,
		@GetCurrentUser() user: User,
	) {
		console.log(user);
		return await this.roomingHousesService.deleteRoomingHouse(id);
	}

	//NOTE: ROOM
	@Post(':roomingHouseId/rooms')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	async createRoom(
		@Param('roomingHouseId', ParseIntPipe) roomingHouseId: number,
		@Body() input: CreateRoomDto,
		@GetCurrentUser() user: User,
	) {
		input.lessorId = user.id;
		return await this.roomingHousesService.createRoom(roomingHouseId, input);
	}

	@Public()
	@Get(':roomingHouseId/rooms')
	async findManyRoom(
		@Param('roomingHouseId', ParseIntPipe) roomingHouseId: number,
		@Query() filter: GetRoomDto,
	) {
		return await this.roomingHousesService.findManyRoom(roomingHouseId, filter);
	}

	@Delete(':roomingHouseId/rooms/:roomId')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	async removeRoom(
		@Param('roomingHouseId', ParseIntPipe) roomingHouseId: number,
		@Param('roomId', ParseIntPipe) roomId: number,
		@GetCurrentUser() user: User,
	) {
		console.log(user);
		return await this.roomingHousesService.deleteRoom(roomingHouseId, roomId);
	}

	//Request
	@Post(':roomingHouseId/rooms/:roomId/rooming-subscription-request')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.tenant)
	async createRoomingSubscriptionRequest(
		@Param('roomingHouseId', ParseIntPipe) roomingHouseId: number,
		@Param('roomId', ParseIntPipe) roomId: number,
		@GetCurrentUser() user: User,
	) {
		const input: CreateRoomingSubscriptionRequestDto = {
			state: ROOMING_SUBSCRIPTION_REQUEST_STATE.WAITING_TENANT_CALL,
		};
		input.tenantId = user.tenant.id;
		input.roomId = roomId;
		return await this.roomingHousesService.createRoomingSubscriptionRequest(
			roomingHouseId,
			roomId,
			input,
		);
	}

	@Patch(':roomingHouseId/rooms/:roomId/rooming-subscription-request/:rsrId')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	async updateRoomingSubscriptionRequest(
		@Param('roomingHouseId', ParseIntPipe) roomingHouseId: number,
		@Param('roomId', ParseIntPipe) roomId: number,
		@Param('rsrId', ParseIntPipe) rsrId: number,
		@Body() input: UpdateRoomingSubscriptionRequestDto,
		@GetCurrentUser() user: User,
	) {
		console.log(user);
		return await this.roomingHousesService.updateRoomingSubscriptionRequest(
			roomingHouseId,
			roomId,
			rsrId,
			input,
		);
	}

	//Subscription
	@Patch(':roomingHouseId/rooms/:roomId/rooming-subscription/:rsId')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	async updateRoomingSubscription(
		@Param('roomingHouseId', ParseIntPipe) roomingHouseId: number,
		@Param('roomId', ParseIntPipe) roomId: number,
		@Param('rsId', ParseIntPipe) rsId: number,
		@Body() input: UpdateRoomingSubscriptionDto,
		@GetCurrentUser() user: User,
	) {
		console.log(user);
		return await this.roomingHousesService.updateRoomingSubscription(
			roomingHouseId,
			roomId,
			rsId,
			input,
		);
	}
}
