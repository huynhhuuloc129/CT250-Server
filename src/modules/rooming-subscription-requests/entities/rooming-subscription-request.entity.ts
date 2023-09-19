import { Room } from 'src/modules/rooms/entities/room.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class RoomingSubscriptionRequest extends BaseObject {
	@Column()
	lessorID: number;

	@Column()
	roomID: number;

	// @ManyToOne(() => Lessor)
	// lessor: Lessor;

	@ManyToOne(() => Room)
	room: Room;
}
