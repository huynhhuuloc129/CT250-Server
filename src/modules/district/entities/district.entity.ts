import { AdministrativeUnit } from 'src/modules/administrative-unit/entities/administrative-unit.entity';
import { Province } from 'src/modules/province/entities/province.entity';
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

@Entity({ name: 'districts' })
export class District {
	@PrimaryColumn()
	code: string;

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

	@ManyToOne(() => Province)
	@JoinColumn({ name: 'province_code' })
	provinceCode: Province;

	@ManyToOne(() => AdministrativeUnit)
	@JoinColumn({ name: 'administrative_unit_id' })
	administrativeUnitID: AdministrativeUnit;
}
