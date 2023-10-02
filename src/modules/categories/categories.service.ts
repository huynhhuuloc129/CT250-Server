import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/bases/service.base';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService extends BaseService<Category> {
	constructor(
		@InjectRepository(Category)
		private categoryRepository: Repository<Category>,
	) {
		super(categoryRepository);
	}
}
