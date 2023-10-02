import { RoomingSubscription } from 'src/modules/rooming-subscriptions/entities/rooming-subscription.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class TemporaryLessor extends BaseObject {
	@Column()
	roomingSubscriptionID: number;

	@Column()
	fullName: string;

	@Column()
	citizenID: string;

	@Column()
	startDate: Date;

	@Column()
	endDate: Date;

	@ManyToOne(() => RoomingSubscription)
	roomingSubscription: RoomingSubscription;
}