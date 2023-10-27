import { AdministrativeUnit } from 'src/modules/administrative-unit/entities/administrative-unit.entity';
import { District } from 'src/modules/district/entities/district.entity';
import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'wards' })
export class Ward {
	@PrimaryColumn()
	code: string;

	@CreateDateColumn({ select: false })
	createdAt: Date;

	@UpdateDateColumn({ select: false })
	updatedAt: Date;

	@DeleteDateColumn({ select: false })
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

	@ManyToOne(() => District, (district: District) => district.wards)
	@JoinColumn({ name: 'district_code' })
	districtCode: District;

	@ManyToOne(() => AdministrativeUnit)
	@JoinColumn({ name: 'administrative_unit_id' })
	administrativeUnitID: AdministrativeUnit;
}
