import { Notification } from 'src/modules/notifications/entities/notification.entity';
import { RoomingHouse } from 'src/modules/rooming-houses/entities/romming-house.entity';
import { RoomingSubscriptionRequest } from 'src/modules/rooming-subscription-requests/entities/rooming-subscription-request.entity';
import { RoomingSubscription } from 'src/modules/rooming-subscriptions/entities/rooming-subscription.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import { ROOM_STATE } from 'src/shared/enums/common.enum';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Room extends BaseObject {
	@Column()
	name: string;

	@Column()
	tenantID: string;

	@Column()
	roomingHouseID: string;

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

	// @ManyToOne(() => Tenant)
	// tenant: Tenant;

	@ManyToOne(() => RoomingHouse)
	roomingHouse: RoomingHouse;

	@OneToMany(() => Notification, (assign: Notification) => assign.room)
	notifications: Notification[];

	// @OneToMany(() => Photo, (assign: Photo) => assign.room)
	// photos: Photo[];

	// @OneToMany(() => Description, (assign: Description) => assign.room)
	// descriptions: Description[];

	// @OneToMany(() => Review, (assign: Review) => assign.room)
	// reviews: Review[];

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

	// @ManyToMany(() => Utility, (assign: Utility) => assign.room)
	// @JoinTable({
	// 	name: 'room_subscription_request',
	// 	joinColumn: {
	// 		name: 'roomID',
	// 		referencedColumnName: 'id',
	// 	},
	// 	inverseJoinColumn: {
	// 		name: 'utilityID',
	// 	},
	// })
	// Utilities?: Utility[];
}
