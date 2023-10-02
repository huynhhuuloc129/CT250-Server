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
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/utils';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DefaultListDto } from 'src/shared/dtos/default-list.dto';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
	@Public()
	@Get()
	findAll(@Query() filter: DefaultListDto) {
		return filter;
	}

	@Public()
	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return id;
	}

	@Public()
	@Post()
	@ApiBody({ type: CreateCategoryDto })
	create(@Body() input: CreateCategoryDto) {
		return input;
	}

	@Public()
	@Patch(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateCategoryDto: UpdateCategoryDto,
	) {
		return updateCategoryDto;
	}

	@Public()
	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return id;
	}
}
