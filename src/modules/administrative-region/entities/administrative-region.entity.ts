import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'administrative_regions' })
export class AdministrativeRegion extends BaseObject {
	@Column()
	name: string;

	@Column({ name: 'name_en' })
	nameEn: string;

	@Column({ name: 'code_name' })
	codeName: string;

	@Column({ name: 'code_name_en' })
	codeNameEn: string;
}
