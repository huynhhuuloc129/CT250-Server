import { AdministrativeUnit } from 'src/modules/administrative-unit/entities/administrative-unit.entity';
import { District } from 'src/modules/district/entities/district.entity';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	JoinColumn,
	ManyToOne,
} from 'typeorm';

@Entity({ name: 'wards' })
export class Ward {
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

	@ManyToOne(() => District)
	@JoinColumn({ name: 'district_code' })
	districtCode: string;

	@ManyToOne(() => AdministrativeUnit)
	@JoinColumn({ name: 'administrative_unit_id' })
	administrativeUnitID: string;
}
