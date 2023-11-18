import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	ParseIntPipe,
	Patch,
	Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/utils';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsService } from './rooms.service';
import { GetRoomDto } from './dto/get-room.dto';
import { RequiredRoles } from '../auth/decorators/required-roles.decorator';
import { USER_ROLE, User } from '../users/entities/user.entity';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';

@Controller('rooms')
@ApiTags('rooms')
export class RoomsController {
	constructor(private readonly roomService: RoomsService) {}

	@Public()
	@Get()
	async findAll(@Query() filter: GetRoomDto) {
		return await this.roomService.findManyRoom(filter);
	}

	@Public()
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		const data = await this.roomService.findOneWithRelation({
			where: { id },
			relations: {
				roomingHouse: true,
				lessor: { user: true },
				descriptions: true,
				reviews: true,
				utilities: { photo: true },
			},
		});
		if (!data) {
			throw new NotFoundException('room not found');
		}
		return data;
	}

	@Patch(':id')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	async updateRoom(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdateRoomDto,
		@GetCurrentUser() user: User,
	) {
		console.log(user);
		return await this.roomService.updateRoom({ id }, input);
	}
}
