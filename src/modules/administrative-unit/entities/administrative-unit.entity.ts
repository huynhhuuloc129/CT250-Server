import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'administrative_units' })
export class AdministrativeUnit extends BaseObject {
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
