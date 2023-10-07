import { Lessor } from 'src/modules/lessor/entities/lessor.entity';
import { Room } from 'src/modules/rooms/entities/room.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class Review extends BaseObject {
	@Column()
	rating: number;

	@Column()
	comment: string;

	@ManyToOne(() => Room, (room: Room) => room.reviews)
	room: Room;

	@ManyToOne(() => Lessor, (lessor: Lessor) => lessor.reviews)
	lessor: Lessor;
}
