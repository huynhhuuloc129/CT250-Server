import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Commune extends BaseObject {
	@Column()
	name: string;

	// districtID: string;
}
