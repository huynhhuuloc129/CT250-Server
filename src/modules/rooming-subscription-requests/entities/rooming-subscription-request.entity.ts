import { Room } from 'src/modules/rooms/entities/room.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import { ROOMING_SUBSCRIPTION_REQUEST_STATE } from 'src/shared/enums/common.enum';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class RoomingSubscriptionRequest extends BaseObject {
	@Column()
	lessorID: number;

	@Column()
	roomID: number;

	@Column({
		type: 'enum',
		enum: ROOMING_SUBSCRIPTION_REQUEST_STATE,
	})
	state: ROOMING_SUBSCRIPTION_REQUEST_STATE;

	// @ManyToOne(() => Lessor)
	// lessor: Lessor;

	@ManyToOne(() => Room)
	room: Room;
}
