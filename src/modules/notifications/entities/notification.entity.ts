import { RoomingHouse } from 'src/modules/rooming-houses/entities/romming-house.entity';
import { Room } from 'src/modules/rooms/entities/room.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import { NOTIFICATION_TYPE } from 'src/shared/enums/common.enum';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Notification extends BaseObject {
	@Column()
	title: string;

	@Column()
	content: string;

	@Column()
	roomingHouseID: number;

	@Column({ nullable: true })
	roomID: number;

	@Column({
		type: 'enum',
		enum: NOTIFICATION_TYPE,
	})
	type: NOTIFICATION_TYPE;

	@ManyToOne(() => RoomingHouse)
	roomingHouse: RoomingHouse;

	@ManyToOne(() => Room)
	room: Room;
}
