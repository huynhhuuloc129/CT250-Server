import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
} from '@nestjs/common';
import { UtilityService } from './utility.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUtilityDto } from './dto/create-utility.dto';
import { RequiredRoles } from '../auth/decorators/required-roles.decorator';
import { Public } from '../auth/utils';
import { USER_ROLE } from '../users/entities/user.entity';
import { UpdateUtilityDto } from './dto/update-utility.dto';

@Controller('utility')
@ApiTags('utility')
@ApiBearerAuth()
export class UtilityController {
	constructor(private readonly utilityService: UtilityService) {}
	@Get()
	@Public()
	@ApiOperation({ summary: 'Find many utilities' })
	async findMany() {
		return this.utilityService.findMany();
	}

	@Get(':utilityId')
	@Public()
	@ApiOperation({ summary: 'Find one utility' })
	async findOne(@Param('utilityId') utilityId: number) {
		return await this.utilityService.findOneByCondititon({ id: utilityId });
	}

	@Post()
	@RequiredRoles(USER_ROLE.ADMIN)
	@ApiOperation({ summary: 'Create one utility' })
	async createOne(@Body() createDto: CreateUtilityDto) {
		return await this.utilityService.createOne(createDto);
	}

	@Patch(':utilityId')
	@RequiredRoles(USER_ROLE.ADMIN)
	@ApiOperation({ summary: 'Update one utility' })
	async updateOne(
		@Body() updateDto: UpdateUtilityDto,
		@Param('utilityId', ParseIntPipe) utilityId: number,
	) {
		return await this.utilityService.updateOneByCondititon(
			{ id: utilityId },
			updateDto,
		);
	}

	@Delete(':utilityId')
	@RequiredRoles(USER_ROLE.ADMIN)
	@ApiOperation({ summary: 'Delete one utility' })
	async deleteOne(@Param('utilityId', ParseIntPipe) utilityId: number) {
		return await this.utilityService.deleteOne(utilityId);
	}
}
