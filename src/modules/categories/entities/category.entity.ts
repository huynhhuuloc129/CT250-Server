import { RoomingHouse } from 'src/modules/rooming-houses/entities/romming-house.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Category extends BaseObject {
	@Column()
	name: string;

	@OneToMany(() => RoomingHouse, (assign: RoomingHouse) => assign.category)
	roomingHouses: RoomingHouse[];
}
