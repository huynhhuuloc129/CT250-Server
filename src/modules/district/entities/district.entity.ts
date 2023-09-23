import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class District extends BaseObject {
	@Column()
	name: string;

	// provinceID: string;
}
