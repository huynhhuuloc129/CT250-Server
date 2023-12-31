import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	ParseIntPipe,
} from '@nestjs/common';
import { LessorService } from './lessor.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateLessorDto } from './dto/create-lessor.dto';
import { Lessor } from './entities/lessor.entity';
import { RequiredRoles } from '../auth/decorators/required-roles.decorator';
import { USER_ROLE } from '../users/entities/user.entity';
import { Public } from '../auth/utils';

@Controller('lessors')
@ApiTags('lessors')
export class LessorController {
	constructor(private readonly lessorService: LessorService) {}
	@Get()
	@Public()
	@ApiOperation({ summary: 'Find many lessor' })
	async findMany(): Promise<Lessor[]> {
		return await this.lessorService.findMany();
	}

	@Get(':lessorId')
	@Public()
	@ApiOperation({ summary: 'Find one lessor' })
	async findOneById(
		@Param('lessorId', ParseIntPipe) lessorId: number,
	): Promise<Lessor> {
		return await this.lessorService.findOneById(lessorId);
	}

	@Post()
	@RequiredRoles(USER_ROLE.ADMIN)
	@ApiBearerAuth('bearer')
	@ApiOperation({ summary: 'Create one lessor' })
	async createOne(@Body() createDto: CreateLessorDto): Promise<Lessor> {
		return await this.lessorService.createOne(createDto);
	}

	@Delete(':lessorId')
	@RequiredRoles(USER_ROLE.ADMIN)
	@ApiBearerAuth('bearer')
	@ApiOperation({ summary: 'Delete one lessor' })
	deleteOneByID(
		@Param('lessorId', ParseIntPipe) lessorId: number,
	): Promise<object> {
		return this.lessorService.deleteOneById(lessorId);
	}
}
