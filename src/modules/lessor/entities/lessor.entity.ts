import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Lessor extends BaseObject {
	@Column()
	isRegistered: boolean;
}
