import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Utility extends BaseObject {
	@Column()
	name: string;

	@Column({ nullable: true })
	description?: string;
}
