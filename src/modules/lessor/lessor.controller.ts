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

@Controller('lessors')
@ApiTags('lessors')
@ApiBearerAuth('bearer')
export class LessorController {
	constructor(private readonly lessorService: LessorService) {}
	@Get()
	@ApiOperation({ summary: 'Find many lessor' })
	async findMany(): Promise<Lessor[]> {
		return await this.lessorService.findMany();
	}

	@Get(':lessorId')
	@ApiOperation({ summary: 'Find one lessor' })
	async findOneById(
		@Param('lessorId', ParseIntPipe) lessorId: number,
	): Promise<Lessor> {
		return await this.lessorService.findOneById(lessorId);
	}

	@Post()
	@ApiOperation({ summary: 'Create one lessor' })
	async createOne(@Body() createDto: CreateLessorDto): Promise<Lessor> {
		return await this.lessorService.createOne(createDto);
	}

	@Delete(':lessorId')
	@ApiOperation({ summary: 'Delete one lessor' })
	deleteOneByID(
		@Param('lessorId', ParseIntPipe) lessorId: number,
	): Promise<object> {
		return this.lessorService.deleteOneById(lessorId);
	}
}
