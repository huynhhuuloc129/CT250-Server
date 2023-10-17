import { Photo } from 'src/modules/photo/entities/photo.entity';
import { Room } from 'src/modules/rooms/entities/room.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Entity, Column, ManyToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Utility extends BaseObject {
	@Column({ unique: true })
	name: string;

	@Column({ nullable: true })
	description?: string;

	@ManyToMany(() => Room, (room: Room) => room.Utilities)
	rooms: Room[];

	@OneToOne(() => Photo, (assign: Photo) => assign.utility)
	@JoinColumn()
	photo: Photo;
}
