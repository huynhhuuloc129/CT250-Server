import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { USER_ROLE } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateLessorDto } from './dto/create-lessor.dto';
import { Lessor } from './entities/lessor.entity';

@Injectable()
export class LessorService {
	constructor(
		@InjectRepository(Lessor) private lessorsRepository: Repository<Lessor>,
		private usersService: UsersService,
	) {}
	async createOne(createDto: CreateLessorDto): Promise<Lessor> {
		const user = await this.usersService.createOne({
			...createDto,
			role: USER_ROLE.lessor,
		});

		const newEntity = new Lessor();

		newEntity.user = user;

		return await this.lessorsRepository.save(newEntity);
	}

	async findOneById(id: number): Promise<Lessor> {
		return await this.lessorsRepository.findOne({
			where: { id },
			relations: {
				user: {
					photo: true,
				},
			},
		});
	}

	async findOneByCondititon(filter: object | object[]): Promise<Lessor> {
		return await this.lessorsRepository.findOne({
			where: filter,
			relations: {
				user: {
					photo: true,
				},
			},
		});
	}

	async findMany(filter: object | object[] = {}): Promise<Lessor[]> {
		return this.lessorsRepository.find({
			where: filter,
			relations: {
				user: {
					photo: true,
				},
			},
		});
	}

	async deleteOneById(id: number): Promise<object> {
		const lessor = await this.findOneById(id);

		return await this.usersService.deleteOneById(lessor.user.id);
	}
}
