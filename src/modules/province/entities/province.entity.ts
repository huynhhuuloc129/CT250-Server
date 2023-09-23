import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Province extends BaseObject {
	@Column()
	name: string;
}
