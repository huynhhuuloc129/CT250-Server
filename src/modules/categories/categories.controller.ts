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
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesService } from './categories.service';
import { RequiredRoles } from '../auth/decorators/required-roles.decorator';
import { USER_ROLE } from '../users/entities/user.entity';
import { Public } from '../auth/utils';

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

	@Post()
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.ADMIN)
	@ApiBody({ type: CreateCategoryDto })
	async create(@Body() input: CreateCategoryDto) {
		return await this.categoryService.createOne(input);
	}

	@Patch(':id')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.ADMIN)
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdateCategoryDto,
	) {
		return await this.categoryService.updateOne({ id }, input);
	}

	@Delete(':id')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.ADMIN)
	async remove(@Param('id', ParseIntPipe) id: number) {
		return await this.categoryService.deleteOne({ id });
	}
}
