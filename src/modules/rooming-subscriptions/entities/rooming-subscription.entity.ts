import { PaymentRecord } from 'src/modules/payment-records/entities/payment-record.entity';
import { Room } from 'src/modules/rooms/entities/room.entity';
import { TemporaryLessor } from 'src/modules/temporary-lessors/entities/temporary-lessor.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import { ROOMING_SUBSCRIPTION_STATE } from 'src/shared/enums/common.enum';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class RoomingSubscription extends BaseObject {
	@Column()
	lessorID: number;

	@Column()
	month: number;

	@Column()
	year: number;

	@Column()
	roomID: number;

	@Column()
	startDate: Date;

	@Column()
	endDate: Date;

	@Column({
		type: 'enum',
		enum: ROOMING_SUBSCRIPTION_STATE,
	})
	state: ROOMING_SUBSCRIPTION_STATE;

	// @ManyToOne(() => Tenant)
	// tenant: Tenant;

	@ManyToOne(() => Room)
	room: Room;

	@OneToMany(
		() => PaymentRecord,
		(assign: PaymentRecord) => assign.roomingSubscription,
	)
	paymentRecords: PaymentRecord[];

	@OneToMany(
		() => TemporaryLessor,
		(assign: TemporaryLessor) => assign.roomingSubscription,
	)
	temporaryLessors: TemporaryLessor[];
}
