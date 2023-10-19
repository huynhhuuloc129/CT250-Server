import { RoomingHouse } from 'src/modules/rooming-houses/entities/romming-house.entity';
import { Room } from 'src/modules/rooms/entities/room.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Utility } from 'src/modules/utility/entities/utility.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Entity, Column, ManyToOne, OneToOne } from 'typeorm';

export enum PHOTO_TYPE {
	USER = 'user',
	ROOMING_HOUSE = 'rooming house',
	ROOM = 'room',
}

@Entity()
export class Photo extends BaseObject {
	@Column({ nullable: true })
	fileName: string;

	@Column()
	path: string;

	@Column({ type: 'enum', enum: PHOTO_TYPE })
	type: PHOTO_TYPE;

	@Column({ nullable: true })
	url?: string;

	// reference

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
