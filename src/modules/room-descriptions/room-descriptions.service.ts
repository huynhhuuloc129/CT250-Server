import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/bases/service.base';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { RoomDescription } from './entities/room-description.entity';
import { GetRoomDescriptionDto } from './dto/get-room-description.dto';

@Injectable()
export class RoomDescriptionService extends BaseService<RoomDescription> {
	constructor(
		@InjectRepository(RoomDescription)
		private roomDescriptionRepository: Repository<RoomDescription>,
	) {
		super(roomDescriptionRepository);
	}

	async findManyRoomDescription(filter: GetRoomDescriptionDto) {
		try {
			const { limit, offset, sortField, sortOrder, ...condition } = filter;

			const where = {};
			if (condition?.searchField && condition?.searchValue) {
				where[condition.searchField] = ILike(`%${condition.searchValue}%`);
			}

			const order = {};
			if (sortField && sortOrder) {
				order[sortField] = sortOrder;
			}
			if (filter.roomId) {
				where['roomId'] = filter.roomId;
			}

			const [count, data] = await Promise.all([
				this.roomDescriptionRepository.count({
					where,
				}),
				this.roomDescriptionRepository.find({
					where,
					order,
					take: limit ? (limit <= 100 ? limit : 100) : 10,
					skip: offset ? offset : 0,
				}),
			]);

			return {
				filter: filter,
				total: count,
				data,
			};
		} catch (err) {
			throw new BadRequestException(err);
		}
	}
}
