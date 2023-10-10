import { RoomingSubscription } from 'src/modules/rooming-subscriptions/entities/rooming-subscription.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import { PAYMENT_STATE } from 'src/shared/enums/common.enum';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class PaymentRecord extends BaseObject {
	@Column()
	month: number;

	@Column()
	year: number;

	@Column()
	waterAmount: number;

	@Column()
	electricityAmount: number;

	@Column()
	monthWaterPrice: number;

	@Column()
	monthElectricityPrice: number;

	@Column()
	monthRoomPrice: number;

	@Column()
	surcharge: number;

	@Column()
	monthTotalPrice: number;

	@Column()
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
