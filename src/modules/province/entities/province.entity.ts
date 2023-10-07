import { AdministrativeRegion } from 'src/modules/administrative-region/entities/administrative-region.entity';
import { AdministrativeUnit } from 'src/modules/administrative-unit/entities/administrative-unit.entity';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';

@Entity({ name: 'provinces' })
export class Province {
	@PrimaryGeneratedColumn()
	code: number;

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

	@Column({ name: 'full_name' })
	fullName: string;

	@Column({ name: 'full_name_en' })
	fullNameEn: string;

	@Column({ name: 'code_name' })
	codeName: string;

	@ManyToOne(() => AdministrativeUnit)
	@JoinColumn({ name: 'administrative_unit_id' })
	administrativeUnitID: string;

	@ManyToOne(() => AdministrativeRegion)
	@JoinColumn({ name: 'administrative_region_id' })
	administrativeRegionID: string;
}
