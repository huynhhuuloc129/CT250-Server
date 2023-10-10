import { Lessor } from 'src/modules/lessor/entities/lessor.entity';
import { Tenant } from 'src/modules/tenant/entities/tenant.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Entity, Column, OneToOne } from 'typeorm';

export enum USER_ROLE {
	USER = 'user',
	ADMIN = 'admin',
	tenant = 'tenant',
	lessor = 'lessor',
}

export enum USER_GENDER {
	F = 'female',
	M = 'male',
	O = 'other',
}

@Entity()
export class User extends BaseObject {
	@Column({ unique: true })
	email: string;

	@Column({ unique: true })
	username: string;

	@Column()
	password: string;

	@Column()
	refreshToken: string;

	@Column()
	fullName: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	citizenID: string;

	@Column()
	dob: Date;

	@Column({
		type: 'enum',
		enum: USER_GENDER,
	})
	gender: USER_GENDER;

	@Column()
	address: string;

	@Column()
	tel: string;

	@Column({
		type: 'enum',
		enum: USER_ROLE,
	})
	role: USER_ROLE;

	@OneToOne(() => Tenant, (tenant: Tenant) => tenant.user)
	tentant: Tenant;

	@OneToOne(() => Lessor, (lessor: Lessor) => lessor.user)
	lessor: Lessor;
}
