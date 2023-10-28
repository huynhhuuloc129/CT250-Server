import { AdministrativeUnit } from 'src/modules/administrative-unit/entities/administrative-unit.entity';
import { Province } from 'src/modules/province/entities/province.entity';
import { Ward } from 'src/modules/ward/entities/ward.entity';
import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
	OneToMany,
} from 'typeorm';

@Entity({ name: 'districts' })
export class District {
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

	@ManyToOne(() => Province, (province: Province) => province.districts)
	@JoinColumn({ name: 'province_code' })
	provinceCode: Province;

	@ManyToOne(() => AdministrativeUnit)
	@JoinColumn({ name: 'administrative_unit_id' })
	administrativeUnitID: AdministrativeUnit;

	@OneToMany(() => Ward, (ward: Ward) => ward.districtCode)
	wards: Ward[];
}
