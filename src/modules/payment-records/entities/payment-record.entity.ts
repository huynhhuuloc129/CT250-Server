import { RoomingSubscription } from 'src/modules/rooming-subscriptions/entities/rooming-subscription.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import { PAYMENT_STATE } from 'src/shared/enums/common.enum';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class PaymentRecord extends BaseObject {
	@Column()
	roomingSubscriptionId: number;

	@Column({ nullable: true })
	month: number;

	@Column({ nullable: true })
	year: number;

	@Column()
	waterPrice: number;

	@Column()
	waterAmount: number;

	@Column()
	monthWaterPrice: number;

	@Column()
	electricityPrice: number;

	@Column()
	electricityAmount: number;

	@Column()
	monthElectricityPrice: number;

	@Column()
	monthRoomPrice: number;

	@Column({ nullable: true })
	surcharge: number;

	@Column()
	monthTotalPrice: number;

	@Column({ nullable: true })
	paidDate: Date;

	@Column({
		type: 'enum',
		enum: PAYMENT_STATE,
	})
	state: PAYMENT_STATE;

	@ManyToOne(
		() => RoomingSubscription,
		(assign: RoomingSubscription) => assign.paymentRecords,
	)
	roomingSubscription: RoomingSubscription;
}
