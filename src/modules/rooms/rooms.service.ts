import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/bases/service.base';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { GetRoomDto } from './dto/get-room.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomDescriptionService } from '../room-descriptions/room-descriptions.service';
import { ROOM_STATE } from 'src/shared/enums/common.enum';
import { RoomingSubscriptionRequestService } from '../rooming-subscription-requests/rooming-subscription-requests.service';

@Injectable()
export class RoomsService extends BaseService<Room> {
	constructor(
		@InjectRepository(Room)
		private roomRepository: Repository<Room>,
		private roomDescriptionService: RoomDescriptionService,
		private roomingSubscriptionRequestService: RoomingSubscriptionRequestService,
	) {
		super(roomRepository);
	}

	async findManyRoom(filter: GetRoomDto) {
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
				where['lessorId'] = filter.lessorId;
			}

			if (filter.lessorId) {
				where['roomingHouseId'] = filter.roomingHouseId;
			}

			const [count, data] = await Promise.all([
				this.roomRepository.count({
					where,
				}),
				this.roomRepository.find({
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

	async createOneRoom(input: CreateRoomDto) {
		try {
			const { descriptions, ...data } = input;
			const room = this.roomRepository.create(data);
			room.state = ROOM_STATE.AVAILABLE;
			room.dimensions = room.height * room.width;
			const res = await this.roomRepository.save(room);
			if (descriptions) {
				descriptions.forEach(async (des) => {
					const data = { ...des, roomId: res.id };
					await this.roomDescriptionService.createOne(data);
				});
			}

			return res;
		} catch (err) {
			throw new BadRequestException(err);
		}
	}

	async deleteRoom(roomId: number) {
		try {
			const data = await this.roomRepository.softDelete({ id: roomId });
			if (data.affected === 1) {
				await this.roomingSubscriptionRequestService.deleteMany({
					roomId,
				});
				return { success: true };
			}
			throw new BadRequestException('Delete failed!');
		} catch (err) {
			throw new BadRequestException(err);
		}
	}

	async deleteManyRoomWithRoomingHouse(roomingHouseId: number) {
		try {
			const rooms = await this.roomRepository.find({
				where: { roomingHouseId },
			});
			await this.deleteMany({ roomingHouseId });
			for (const room of rooms) {
				await this.roomingSubscriptionRequestService.deleteMany({
					roomId: room.id,
				});
			}
		} catch (err) {
			throw new BadRequestException(err);
		}
	}
}
