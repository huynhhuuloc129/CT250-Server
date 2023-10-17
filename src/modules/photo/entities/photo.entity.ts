import { RoomingHouse } from 'src/modules/rooming-houses/entities/romming-house.entity';
import { Room } from 'src/modules/rooms/entities/room.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Utility } from 'src/modules/utility/entities/utility.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Entity, Column, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Photo extends BaseObject {
	@Column({ nullable: true })
	name?: string;

	@Column({ nullable: true })
	url?: string;

	@Column()
	type: string;

	@Column('bytea')
	data: Buffer;

	@OneToOne(() => Utility, (utility: Utility) => utility.photo)
	utility: Utility;

	@OneToOne(() => User, (user: User) => user.photo)
	user: User;

	@ManyToOne(() => Room, (room: Room) => room.photos, { onDelete: 'CASCADE' })
	room: Room;

	@ManyToOne(
		() => RoomingHouse,
		(roomingHouse: RoomingHouse) => roomingHouse.photos,
		{ onDelete: 'CASCADE' },
	)
	roomingHouse: RoomingHouse;
}
