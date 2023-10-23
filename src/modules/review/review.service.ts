import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { User } from '../users/entities/user.entity';
import { RoomsService } from '../rooms/rooms.service';

@Injectable()
export class ReviewService {
	constructor(
		@InjectRepository(Review) private reviewsRepository: Repository<Review>,
		private roomsService: RoomsService,
	) {}
	async currentUserCreateOne(
		user: User,
		createDto: CreateReviewDto,
		roomId: number,
	): Promise<Review> {
		console.log(createDto);

		const room = await this.roomsService.findOne({ id: roomId });

		if (!room) {
			throw new NotFoundException('Not found room');
		}

		const newReview = this.reviewsRepository.create(createDto);

		newReview.room = roomId;
		newReview.tenant = user.tenant.id;

		return await this.reviewsRepository.save(newReview);
	}

	async findOneById(id: number): Promise<Review> {
		return await this.reviewsRepository.findOne({
			where: { id },
			relations: {
				room: true,
				tenant: {
					user: true,
				},
			},
		});
	}

	async findOneByCondititon(filter: object | object[]): Promise<Review> {
		return await this.reviewsRepository.findOne({
			where: filter,
			relations: {
				room: true,
				tenant: {
					user: true,
				},
			},
		});
	}

	async findMany(filter: object | object[] = {}): Promise<Review[]> {
		return this.reviewsRepository.find({
			where: filter,
			relations: {
				room: true,
				tenant: {
					user: true,
				},
			},
		});
	}

	async currentUserUpdateOneByCondititon(
		userId: number,
		filter: object | object[],
		updateDto: UpdateReviewDto,
	): Promise<Review> {
		const entity: any = await this.reviewsRepository.findOne({
			where: filter,
			relations: {
				room: true,
				tenant: {
					user: true,
				},
			},
		});

		if (!entity) {
			throw new NotFoundException(`Not found review`);
		}

		if (entity.tenant.user.id != userId) {
			throw new ForbiddenException();
		}

		return await this.reviewsRepository.save({
			...entity,
			...updateDto,
		});
	}

	async currentUserdeleteOneById(userId: number, id: number): Promise<object> {
		const review: any = await this.reviewsRepository.findOne({
			where: { id },
			relations: {
				room: true,
				tenant: {
					user: true,
				},
			},
		});

		if (!review) {
			throw new NotFoundException(`Not found review`);
		}

		if (review.tenant.user.id != userId) {
			throw new ForbiddenException();
		}

		return await this.reviewsRepository.delete(id);
	}

	async deleteOneById(id: number): Promise<object> {
		return await this.reviewsRepository.delete(id);
	}

	async deleteManyByIds(ids: number[]) {
		const result = await this.reviewsRepository.delete({ id: In(ids) });
		return result;
	}
}
