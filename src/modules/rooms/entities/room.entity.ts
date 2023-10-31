import { Lessor } from 'src/modules/lessor/entities/lessor.entity';
import { Notification } from 'src/modules/notifications/entities/notification.entity';
import { Photo } from 'src/modules/photo/entities/photo.entity';
import { Review } from 'src/modules/review/entities/review.entity';
import { RoomDescription } from 'src/modules/room-descriptions/entities/room-description.entity';
import { RoomingHouse } from 'src/modules/rooming-houses/entities/romming-house.entity';
import { RoomingSubscriptionRequest } from 'src/modules/rooming-subscription-requests/entities/rooming-subscription-request.entity';
import { RoomingSubscription } from 'src/modules/rooming-subscriptions/entities/rooming-subscription.entity';
import { Utility } from 'src/modules/utility/entities/utility.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import { ROOM_STATE } from 'src/shared/enums/common.enum';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Room extends BaseObject {
	@Column()
	roomingHouseId: number;

	@Column()
	lessorId: number;

	@Column()
	name: string;

	@Column()
	width: number;

	@Column()
	height: number;

	@Column()
	dimensions: number;

	@Column()
	roomPrice: number;

	@Column()
	waterPrice: number;

	@Column()
	electricityPrice: number;

	@Column()
	summary: string;

	@Column({
		type: 'enum',
		enum: ROOM_STATE,
	})
	state: ROOM_STATE;

	@ManyToOne(() => Lessor, { onDelete: 'CASCADE' })
	lessor: Lessor;

	@ManyToOne(() => RoomingHouse, (assign: RoomingHouse) => assign.rooms)
	roomingHouse: RoomingHouse;

	@OneToMany(() => Notification, (assign: Notification) => assign.room)
	notifications: Notification[];

	@OneToMany(() => Photo, (assign: Photo) => assign.room)
	photos: Photo[];

	@OneToMany(() => RoomDescription, (assign: RoomDescription) => assign.room)
	descriptions: RoomDescription[];

	@OneToMany(() => Review, (assign: Review) => assign.room)
	reviews: Review[];

	@OneToMany(
		() => RoomingSubscriptionRequest,
		(assign: RoomingSubscriptionRequest) => assign.room,
	)
	roomingSubscriptionRequests: RoomingSubscriptionRequest[];

	@OneToMany(
		() => RoomingSubscription,
		(assign: RoomingSubscription) => assign.room,
	)
	roomingSubscriptions: RoomingSubscription[];

	@ManyToMany(() => Utility, (assign: Utility) => assign.rooms)
	Utilities?: Utility[];
}
