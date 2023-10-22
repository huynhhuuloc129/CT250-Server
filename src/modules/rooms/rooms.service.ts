import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/bases/service.base';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { GetRoomDto } from './dto/get-room.dto';

@Injectable()
export class RoomsService extends BaseService<Room> {
	constructor(
		@InjectRepository(Room)
		private roomRepository: Repository<Room>,
	) {
		super(roomRepository);
	}

	async findManyRoomWithRommingHouse(
		roomingHouseId: number,
		filter: GetRoomDto,
	) {
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

			if (filter.state) {
				where['state'] = filter.state;
			}
			if (filter.lessorId) {
				where['tenantId'] = filter.lessorId;
			}

			where['roomingHouseId'] = roomingHouseId;

			const [count, data] = await Promise.all([
				this.roomRepository.count({
					where,
				}),
				this.roomRepository.find({
					where,
					order,
					take: limit ? (limit <= 100 ? limit : 100) : 10,
					skip: offset ? offset : 0,
					//TODO: delete later
					relations: { lessor: { user: true } },
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
