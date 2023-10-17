import { Review } from 'src/modules/review/entities/review.entity';
import { RoomingSubscriptionRequest } from 'src/modules/rooming-subscription-requests/entities/rooming-subscription-request.entity';
import { RoomingSubscription } from 'src/modules/rooming-subscriptions/entities/rooming-subscription.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import {
	Entity,
	Column,
	OneToOne,
	JoinColumn,
	OneToMany,
	BeforeInsert,
} from 'typeorm';

@Entity()
export class Lessor extends BaseObject {
	@OneToOne(() => User, (user: User) => user.lessor, { onDelete: 'CASCADE' })
	@JoinColumn()
	user: User;

	@Column()
	isRegistered: boolean;

	@OneToMany(() => Review, (review: Review) => review.lessor, {
		nullable: true,
	})
	reviews: Review[];

	@OneToMany(
		() => RoomingSubscription,
		(roomingSubscription: RoomingSubscription) => roomingSubscription.lessor,
	)
	roomingSubscriptions: RoomingSubscription[];

	@OneToMany(
		() => RoomingSubscriptionRequest,
		(roomingSubscriptionRequest: RoomingSubscriptionRequest) =>
			roomingSubscriptionRequest.lessor,
	)
	roomingSubscriptionRequests: RoomingSubscriptionRequest[];

	@BeforeInsert()
	updateStatus() {
		if (!this.isRegistered) {
			this.isRegistered = false;
		}
	}
}
