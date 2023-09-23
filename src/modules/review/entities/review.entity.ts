import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Review extends BaseObject {
	@Column()
	rating: number;

	@Column()
	comment: string;

	// roomingHouseID: string;

	// lessorID: string
}
