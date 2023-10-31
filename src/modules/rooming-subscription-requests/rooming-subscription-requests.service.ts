import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/bases/service.base';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { RoomingSubscriptionRequest } from './entities/rooming-subscription-request.entity';
import { GetRoomingSubscriptionRequestDto } from './dto/get-rooming-subscription-request.dto';
import { UpdateRoomingSubscriptionRequestDto } from './dto/update-rooming-subscription-request.dto';
import { ROOMING_SUBSCRIPTION_REQUEST_STATE } from 'src/shared/enums/common.enum';
import { CreateRoomingSubscriptionRequestDto } from './dto/create-rooming-subscription-request.dto';

@Injectable()
export class RoomingSubscriptionRequestService extends BaseService<RoomingSubscriptionRequest> {
	constructor(
		@InjectRepository(RoomingSubscriptionRequest)
		private roomingSubscriptionRequestRepository: Repository<RoomingSubscriptionRequest>,
	) {
		super(roomingSubscriptionRequestRepository);
	}

	async findManyRSRequest(filter: GetRoomingSubscriptionRequestDto) {
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
			if (filter.state) {
				where['state'] = filter.state;
			}

			const [count, data] = await Promise.all([
				this.roomingSubscriptionRequestRepository.count({
					where,
				}),
				this.roomingSubscriptionRequestRepository.find({
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

	async createRSRequest(input: CreateRoomingSubscriptionRequestDto) {
		try {
			//NOTE: someone is already staying
			const rSR = await this.findOneWithoutThrowError({
				roomId: input.roomId,
				state: ROOMING_SUBSCRIPTION_REQUEST_STATE.SUCCESS,
			});
			if (rSR) {
				throw new BadRequestException('The room is currently occupied');
			}

			//NOTE: check if there is a previous request
			const newrSR = await this.roomingSubscriptionRequestRepository.findOne({
				where: {
					tenantId: input.tenantId,
					roomId: input.roomId,
					state: In([
						ROOMING_SUBSCRIPTION_REQUEST_STATE.WAITING_TENANT_CALL,
						ROOMING_SUBSCRIPTION_REQUEST_STATE.WAITING_TENANT_ACCEPT,
					]),
				},
			});
			if (newrSR) {
				throw new BadRequestException('Cannot request at this time');
			}

			return await this.createOne(input);
		} catch (err) {
			throw new BadRequestException(err);
		}
	}

	async updateRSRequest(
		id: number,
		input: UpdateRoomingSubscriptionRequestDto,
	) {
		try {
			const rSRequest = await this.roomingSubscriptionRequestRepository.findOne(
				{ where: { id } },
			);
			if (!rSRequest) {
				throw new BadRequestException('rooming request not found');
			}
			if (
				rSRequest.state == ROOMING_SUBSCRIPTION_REQUEST_STATE.SUCCESS ||
				rSRequest.state == ROOMING_SUBSCRIPTION_REQUEST_STATE.REJECT
			) {
				throw new BadRequestException('rooming request has been confirmed');
			}

			rSRequest.state = input.state;
			await this.roomingSubscriptionRequestRepository.save(rSRequest);
			return rSRequest;
		} catch (err) {
			throw new BadRequestException(err);
		}
	}

	async rejectRSRequestAfterSuccess(id: number) {
		try {
			return await this.roomingSubscriptionRequestRepository.update(
				{ id },
				{ state: ROOMING_SUBSCRIPTION_REQUEST_STATE.REJECT },
			);
		} catch (err) {
			throw new BadRequestException(err);
		}
	}
}
