import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { BaseService } from 'src/shared/bases/service.base';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { RoomingHouse } from './entities/romming-house.entity';
import { CreateRoomDto } from '../rooms/dto/create-room.dto';
import { RoomsService } from '../rooms/rooms.service';
import { ROOM_STATE } from 'src/shared/enums/common.enum';
import { GetRoomDto } from '../rooms/dto/get-room.dto';
import { CreateRoomingHouseDto } from './dto/create-rooming-house.dto';
import { GetRoomingHouseDto } from './dto/get-rooming-house.dto';

@Injectable()
export class RoomingHousesService extends BaseService<RoomingHouse> {
	constructor(
		@InjectRepository(RoomingHouse)
		private roomingHouseRepository: Repository<RoomingHouse>,
		private roomService: RoomsService,
	) {
		super(roomingHouseRepository);
	}

	async findManyRoomingHouse(filter: GetRoomingHouseDto) {
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

			if (filter.categoryId) {
				where['categoryId'] = filter.categoryId;
			}
			if (filter.lessorId) {
				where['lessorId'] = filter.lessorId;
			}

			const [count, data] = await Promise.all([
				this.roomingHouseRepository.count({
					where,
				}),
				this.roomingHouseRepository.find({
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

	async createRoomingHouse(input: CreateRoomingHouseDto) {
		try {
			const roomingHouse = this.roomingHouseRepository.create(input);
			roomingHouse.availableRoomNumber = 0;
			roomingHouse.totalRoomNumber = 0;
			return await this.roomingHouseRepository.save(roomingHouse);
		} catch (err) {
			throw new BadRequestException(err);
		}
	}

	async deleteRoomingHouse(id: number) {
		try {
			const roomingHouse = await this.findOneWithRelation({
				where: { id },
				relations: { rooms: true },
			});

			const data = await this.roomingHouseRepository.softDelete({ id });
			if (data.affected === 1) {
				if (roomingHouse?.rooms.length) {
					await this.roomService.deleteMany({ roomingHouseId: id });
				}
				return { success: true };
			}
			throw new BadRequestException('Delete failed!');
		} catch (err) {
			throw new BadRequestException(err);
		}
	}

	//ROOM
	async createRoom(roomingHouseId: number, input: CreateRoomDto) {
		try {
			const roomingHouse = await this.roomingHouseRepository.findOne({
				where: { id: roomingHouseId },
			});
			if (!roomingHouse) {
				throw new NotFoundException('Rooming House not found!');
			}
			input.roomingHouseId = roomingHouseId;
			input.state = ROOM_STATE.AVAILABLE;

			const room = await this.roomService.createOneRoom(input);
			roomingHouse.totalRoomNumber += 1;
			roomingHouse.availableRoomNumber += 1;

			await this.roomingHouseRepository.save(roomingHouse);
			return room;
		} catch (err) {
			throw new BadRequestException(err);
		}
	}

	async findManyRoom(roomingHouseId: number, filter: GetRoomDto) {
		try {
			const roomingHouse = await this.roomingHouseRepository.findOne({
				where: { id: roomingHouseId },
			});
			if (!roomingHouse) {
				throw new NotFoundException('Rooming House not found!');
			}

			filter.roomingHouseId = roomingHouseId;
			return await this.roomService.findManyRoom(filter);
		} catch (err) {
			throw new BadRequestException(err);
		}
	}

	async deleteRoom(roomingHouseId: number, roomId: number) {
		try {
			const room = await this.roomService.findOneWithRelation({
				where: { id: roomId },
				relations: { roomingHouse: true },
			});
			if (room.roomingHouseId !== roomingHouseId) {
				throw new BadRequestException('roomingHouse and room not match');
			}
			await this.roomService.deleteRoom(roomId);
			const roomingHouse = room.roomingHouse;
			roomingHouse.totalRoomNumber -= 1;
			if (room.state === ROOM_STATE.AVAILABLE) {
				roomingHouse.availableRoomNumber -= 1;
			}
			await this.roomingHouseRepository.save(roomingHouse);
			return { success: true };
		} catch (err) {
			throw new BadRequestException(err);
		}
	}
}
