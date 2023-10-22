import { Review } from 'src/modules/review/entities/review.entity';
import { RoomingSubscriptionRequest } from 'src/modules/rooming-subscription-requests/entities/rooming-subscription-request.entity';
import { RoomingSubscription } from 'src/modules/rooming-subscriptions/entities/rooming-subscription.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import {
	BeforeInsert,
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
} from 'typeorm';

@Entity()
export class Tenant extends BaseObject {
	@OneToOne(() => User, (user: User) => user.tenant, { onDelete: 'CASCADE' })
	@JoinColumn()
	user: User;

	@Column()
	isRegistered: boolean;

	@OneToMany(() => Review, (review: Review) => review.tenant, {
		nullable: true,
	})
	reviews: Review[];

	@OneToMany(
		() => RoomingSubscription,
		(roomingSubscription: RoomingSubscription) => roomingSubscription.tenant,
	)
	roomingSubscriptions: RoomingSubscription[];

	@OneToMany(
		() => RoomingSubscriptionRequest,
		(roomingSubscriptionRequest: RoomingSubscriptionRequest) =>
			roomingSubscriptionRequest.tenant,
	)
	roomingSubscriptionRequests: RoomingSubscriptionRequest[];

	@BeforeInsert()
	updateStatus() {
		if (!this.isRegistered) {
			this.isRegistered = false;
		}
	}
}
