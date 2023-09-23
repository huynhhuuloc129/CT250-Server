import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Photo extends BaseObject {
	@Column({ nullable: true })
	name?: string;

	@Column()
	url: string;

	// ownerID: string;
}
