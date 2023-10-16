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
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/utils';
import { TemporaryLessorService } from './temporary-lessors.service';
import { GetTemporaryLessorDto } from './dto/get-temporary-lessors.dto';
import { UpdateTemporaryLessorDto } from './dto/update-temporary-lessors.dto';

@Controller('temporary-lessors')
@ApiTags('temporary-lessors')
export class TemporaryLessorController {
	constructor(
		private readonly temporaryLessorService: TemporaryLessorService,
	) {}

	@Public()
	@Get()
	async findAll(@Query() filter: GetTemporaryLessorDto) {
		return await this.temporaryLessorService.findAll(filter);
	}

	@Public()
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return await this.temporaryLessorService.findOne({ id });
	}

	@Public()
	@Patch(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdateTemporaryLessorDto,
	) {
		return await this.temporaryLessorService.updateOne({ id }, input);
	}

	@Public()
	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number) {
		return await this.temporaryLessorService.deleteOne({ id });
	}
}
