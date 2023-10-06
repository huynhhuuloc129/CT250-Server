import { Room } from 'src/modules/rooms/entities/room.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Entity, Column, ManyToMany } from 'typeorm';

@Entity()
export class Utility extends BaseObject {
	@Column()
	name: string;

	@Column({ nullable: true })
	description?: string;

	@ManyToMany(() => Room, (room: Room) => room.Utilities)
	rooms: Room[];
}
