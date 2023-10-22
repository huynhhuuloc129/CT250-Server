import {
	Body,
	Controller,
	Delete,
	Get,
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
		return await this.roomService.findAll(filter);
	}

	@Public()
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return await this.roomService.findOneWithRelation({
			where: { id },
			relations: { roomingHouse: true, lessor: true },
		});
	}

	@Patch(':id')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdateRoomDto,
		@GetCurrentUser() user: User,
	) {
		console.log(user);
		return await this.roomService.updateOne({ id }, input);
	}

	@Delete(':id')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.lessor)
	async remove(
		@Param('id', ParseIntPipe) id: number,
		@GetCurrentUser() user: User,
	) {
		console.log(user);
		return await this.roomService.deleteOne({ id });
	}
}
