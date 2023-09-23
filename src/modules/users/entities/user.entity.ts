import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Entity, Column } from 'typeorm';

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

	// @Column()
	// username: string;

	@Column()
	password: string;

	@Column()
	refreshToken: string;

	@Column()
	fullName: string;

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
}
