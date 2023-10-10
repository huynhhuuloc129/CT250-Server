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
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/utils';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
	constructor(private readonly categoryService: CategoriesService) {}

	@Public()
	@Get()
	async findAllData() {
		return await this.categoryService.findAllData({});
	}

	@Public()
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return await this.categoryService.findOne({ id });
	}

	@Public()
	@Post()
	@ApiBody({ type: CreateCategoryDto })
	async create(@Body() input: CreateCategoryDto) {
		return await this.categoryService.createOne(input);
	}

	@Public()
	@Patch(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdateCategoryDto,
	) {
		return await this.categoryService.updateOne({ id }, input);
	}

	@Public()
	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number) {
		return await this.categoryService.deleteOne({ id });
	}
}
