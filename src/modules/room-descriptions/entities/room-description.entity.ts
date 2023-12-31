import { Room } from 'src/modules/rooms/entities/room.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class RoomDescription extends BaseObject {
	@Column()
	roomId: number;

	@Column()
	title: string;

	@Column({ nullable: true })
	content: string;

	@ManyToOne(() => Room, (assign: Room) => assign.descriptions, {
		onDelete: 'CASCADE',
	})
	room: Room;
}
