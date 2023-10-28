import { Room } from 'src/modules/rooms/entities/room.entity';
import { Tenant } from 'src/modules/tenant/entities/tenant.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Review extends BaseObject {
	@Column({ type: 'float' })
	rating: number;

	@Column()
	comment: string;

	@ManyToOne(() => Room, (room: Room) => room.reviews)
	room: Room | number;

	@ManyToOne(() => Tenant, (lessor: Tenant) => lessor.reviews)
	tenant: Tenant | number;
}
