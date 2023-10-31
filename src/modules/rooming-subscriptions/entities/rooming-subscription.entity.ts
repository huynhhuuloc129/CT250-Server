import { PaymentRecord } from 'src/modules/payment-records/entities/payment-record.entity';
import { Room } from 'src/modules/rooms/entities/room.entity';
import { TemporaryTenant } from 'src/modules/temporary-tenants/entities/temporary-tenants.entity';
import { Tenant } from 'src/modules/tenant/entities/tenant.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import { ROOMING_SUBSCRIPTION_STATE } from 'src/shared/enums/common.enum';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class RoomingSubscription extends BaseObject {
	@Column()
	roomId: number;

	@Column()
	tenantId: number;

	@Column({ nullable: true })
	startDate: Date;

	@Column({ nullable: true })
	endDate: Date;

	@Column({
		type: 'enum',
		enum: ROOMING_SUBSCRIPTION_STATE,
	})
	state: ROOMING_SUBSCRIPTION_STATE;

	@ManyToOne(() => Tenant, (assign: Tenant) => assign.roomingSubscriptions)
	tenant: Tenant;

	@ManyToOne(() => Room)
	room: Room;

	@OneToMany(
		() => PaymentRecord,
		(assign: PaymentRecord) => assign.roomingSubscription,
	)
	paymentRecords: PaymentRecord[];

	@OneToMany(
		() => TemporaryTenant,
		(assign: TemporaryTenant) => assign.roomingSubscription,
	)
	temporaryTenants: TemporaryTenant[];
}
