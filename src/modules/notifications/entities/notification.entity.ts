import { RoomingHouse } from 'src/modules/rooming-houses/entities/romming-house.entity';
import { Room } from 'src/modules/rooms/entities/room.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import { NOTIFICATION_TYPE } from 'src/shared/enums/common.enum';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Notification extends BaseObject {
	@Column()
	roomingHouseId: number;

	@Column({ nullable: true })
	roomId: number;

	@Column()
	title: string;

	@Column()
	content: string;

	@Column({
		type: 'enum',
		enum: NOTIFICATION_TYPE,
	})
	type: NOTIFICATION_TYPE;

	@ManyToOne(() => RoomingHouse, (assign: RoomingHouse) => assign.notifications)
	roomingHouse: RoomingHouse;

	@ManyToOne(() => Room, (assign: Room) => assign.notifications)
	room: Room;
}
