import { RoomingHouse } from 'src/modules/rooming-houses/entities/romming-house.entity';
import { Room } from 'src/modules/rooms/entities/room.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Tenant extends BaseObject {
	@OneToOne(() => User, (user: User) => user.tentant)
	@JoinColumn()
	user: User;

	@OneToMany(
		() => RoomingHouse,
		(roomingHouse: RoomingHouse) => roomingHouse.tenant,
	)
	roomingHouses: RoomingHouse[];

	@OneToMany(() => Room, (room: Room) => room.tenant)
	rooms: Room[];
}
