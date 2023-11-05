import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/bases/service.base';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, In, Not, Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { GetRoomDto } from './dto/get-room.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomDescriptionService } from '../room-descriptions/room-descriptions.service';
import {
	ROOMING_SUBSCRIPTION_REQUEST_STATE,
	ROOMING_SUBSCRIPTION_STATE,
	ROOM_STATE,
} from 'src/shared/enums/common.enum';
import { RoomingSubscriptionRequestService } from '../rooming-subscription-requests/rooming-subscription-requests.service';
import { CreateRoomingSubscriptionRequestDto } from '../rooming-subscription-requests/dto/create-rooming-subscription-request.dto';
import { RoomingSubscriptionService } from '../rooming-subscriptions/rooming-subscriptions.service';
import { CreateRoomingSubscriptionDto } from '../rooming-subscriptions/dto/create-rooming-subscription.dto';
import { UpdateRoomingSubscriptionRequestDto } from '../rooming-subscription-requests/dto/update-rooming-subscription-request.dto';
import { UpdateRoomingSubscriptionDto } from '../rooming-subscriptions/dto/update-rooming-subscription.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { UtilityService } from '../utility/utility.service';

@Injectable()
export class RoomsService extends BaseService<Room> {
	constructor(
		@InjectRepository(Room)
		private roomRepository: Repository<Room>,
		private roomDescriptionService: RoomDescriptionService,
		private roomingSubscriptionRequestService: RoomingSubscriptionRequestService,
		private roomingSubscriptionService: RoomingSubscriptionService,
		private utilityService: UtilityService,
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

			if (filter.roomingHouseId) {
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
				//NOTE: delete Rooming Subscription Request
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

	async createRoomingSubscriptionRequest(
		roomingHouseId: number,
		roomId: number,
		input: CreateRoomingSubscriptionRequestDto,
	) {
		try {
			const room = await this.roomRepository.findOne({
				where: { id: roomId, roomingHouseId: roomingHouseId },
			});
			if (!room) {
				throw new BadRequestException('room or rooming house invalid');
			}

			return await this.roomingSubscriptionRequestService.createRSRequest(
				input,
			);
		} catch (err) {
			throw new BadRequestException(err);
		}
	}

	async updateRoomingSubscriptionRequest(
		roomingHouseId: number,
		roomId: number,
		rsrId: number,
		input: UpdateRoomingSubscriptionRequestDto,
	) {
		try {
			const rSRequest = await this.roomingSubscriptionRequestService.findOne({
				id: rsrId,
				roomId: roomId,
				room: { roomingHouseId: roomingHouseId },
			});
			if (!rSRequest) {
				throw new BadRequestException('room request invalid');
			}

			const data = await this.roomingSubscriptionRequestService.updateRSRequest(
				rsrId,
				input,
			);
			if (data.state === ROOMING_SUBSCRIPTION_REQUEST_STATE.SUCCESS) {
				//NOTE: create subscription
				const rSData: CreateRoomingSubscriptionDto = {
					roomId: data.roomId,
					state: ROOMING_SUBSCRIPTION_STATE.STAYING,
					tenantId: data.tenantId,
				};
				await this.roomingSubscriptionService.createOne(rSData);

				//NOTE: reject all other request
				const rSOtherRequestsOfRoom =
					await this.roomingSubscriptionRequestService.findAllData({
						roomId: rSRequest.roomId,
						state: In([
							ROOMING_SUBSCRIPTION_REQUEST_STATE.WAITING_TENANT_ACCEPT,
							ROOMING_SUBSCRIPTION_REQUEST_STATE.WAITING_TENANT_CALL,
						]),
					});
				const rSOtherRequestsOfUser =
					await this.roomingSubscriptionRequestService.findAllData({
						tenantId: data.tenantId,
						id: Not(data.id),
					});

				const combinedArray = rSOtherRequestsOfRoom.concat(
					rSOtherRequestsOfUser,
				);

				for (const reqItem of combinedArray) {
					reqItem.state = ROOMING_SUBSCRIPTION_REQUEST_STATE.REJECT;
					await this.roomingSubscriptionRequestService.updateOne(
						{ id: reqItem.id },
						{ state: ROOMING_SUBSCRIPTION_REQUEST_STATE.REJECT },
					);
				}

				//NOTE: update room state
				await this.updateOne({ id: roomId }, { state: ROOM_STATE.UNAVAILABLE });
			}
			return data;
		} catch (err) {
			throw new BadRequestException(err);
		}
	}

	async updateRoomingSubscription(
		roomingHouseId: number,
		roomId: number,
		rsId: number,
		input: UpdateRoomingSubscriptionDto,
	) {
		try {
			const rSubscription = await this.roomingSubscriptionService.findOne({
				id: rsId,
				roomId: roomId,
				room: { roomingHouseId: roomingHouseId },
			});
			if (!rSubscription) {
				throw new BadRequestException('room request invalid');
			}
			if (rSubscription.state === ROOMING_SUBSCRIPTION_STATE.STAYED) {
				throw new BadRequestException('Unable to update rooming subscription');
			}

			const data = await this.roomingSubscriptionService.updateOne(
				{ id: rsId },
				input,
			);

			if (data.state === ROOMING_SUBSCRIPTION_STATE.STAYED) {
				//NOTE: update room state
				await this.updateOne(
					{ id: data.roomId },
					{ state: ROOM_STATE.AVAILABLE },
				);

				//NOTE: update roomingSubscriptionRequestService state
				const rSRequest = await this.roomingSubscriptionRequestService.findOne({
					roomId,
					tenantId: data.tenantId,
					state: ROOMING_SUBSCRIPTION_REQUEST_STATE.SUCCESS,
				});
				await this.roomingSubscriptionRequestService.rejectRSRequestAfterSuccess(
					rSRequest.id,
				);
			}

			return data;
		} catch (err) {
			throw new BadRequestException(err);
		}
	}

	async updateRoom(where: FindOptionsWhere<Room>, input: UpdateRoomDto) {
		try {
			const { utilities, ...data } = input;
			const room = await this.roomRepository.findOne({ where });
			if (!room) {
				throw new BadRequestException('Room not found');
			}
			if (utilities.length) {
				const utilitiesArray = [];
				for (const id of utilities) {
					const utility = await this.utilityService.findOneByCondititon({ id });
					utilitiesArray.push(utility);
				}
				room.utilities = utilitiesArray;
				await this.roomRepository.save(room);
			}

			return await this.updateOne(where, data);
		} catch (err) {
			throw new BadRequestException(err);
		}
	}
}
