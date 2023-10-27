import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'administrative_units' })
export class AdministrativeUnit {
	@PrimaryColumn()
	id: number;

	@CreateDateColumn({ select: false })
	createdAt: Date;

	@UpdateDateColumn({ select: false })
	updatedAt: Date;

	@DeleteDateColumn({ select: false })
	deletedAt: Date;

	@Column({ name: 'full_name' })
	fullName: string;

	@Column({ name: 'full_name_en' })
	fullNameEn: string;

	@Column({ name: 'short_name' })
	shortName: string;

	@Column({ name: 'short_name_en' })
	shortNameEn: string;

	@Column({ name: 'code_name' })
	codeName: string;

	@Column({ name: 'code_name_en' })
	codeNameEn: string;
}
