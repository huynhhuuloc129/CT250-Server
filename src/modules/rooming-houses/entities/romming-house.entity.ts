import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class RoomingHouse extends BaseObject {
	@Column()
	name: string;

	@Column()
	address: string;

	@Column()
	description: string;

	@Column()
	tenantId: string;

	@Column()
	communeId: string;

	@Column()
	availableRoomNumber: number;

	@Column()
	totalRoomNumber: number;

	@Column()
	paymentExpiresDate: Date;
}
