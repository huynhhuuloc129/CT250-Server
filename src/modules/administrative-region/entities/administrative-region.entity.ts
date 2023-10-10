import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'administrative_regions' })
export class AdministrativeRegion {
	@PrimaryColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;

	@Column()
	name: string;

	@Column({ name: 'name_en' })
	nameEn: string;

	@Column({ name: 'code_name' })
	codeName: string;

	@Column({ name: 'code_name_en' })
	codeNameEn: string;
}
