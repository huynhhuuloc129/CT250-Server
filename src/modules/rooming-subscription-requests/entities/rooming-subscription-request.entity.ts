import { Room } from 'src/modules/rooms/entities/room.entity';
import { Tenant } from 'src/modules/tenant/entities/tenant.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import { ROOMING_SUBSCRIPTION_REQUEST_STATE } from 'src/shared/enums/common.enum';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class RoomingSubscriptionRequest extends BaseObject {
	@Column()
	tenantId: number;

	@Column()
	roomId: number;

	@Column({
		type: 'enum',
		enum: ROOMING_SUBSCRIPTION_REQUEST_STATE,
	})
	state: ROOMING_SUBSCRIPTION_REQUEST_STATE;

	@ManyToOne(
		() => Tenant,
		(assign: Tenant) => assign.roomingSubscriptionRequests,
	)
	tenant: Tenant;

	@ManyToOne(() => Room, (assign: Room) => assign.roomingSubscriptionRequests)
	room: Room;
}
