import { Lessor } from 'src/modules/lessor/entities/lessor.entity';
import { Photo } from 'src/modules/photo/entities/photo.entity';
import { Tenant } from 'src/modules/tenant/entities/tenant.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Entity, Column, OneToOne, AfterLoad, JoinColumn } from 'typeorm';

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

	@Column({ nullable: true })
	refreshToken: string;

	@Column({ nullable: true })
	fullName: string;

	@Column({ nullable: true })
	firstName: string;

	@Column({ nullable: true })
	lastName: string;

	@Column({ nullable: true })
	citizenID: string;

	@Column({ nullable: true })
	dob: Date;

	@Column({
		type: 'enum',
		enum: USER_GENDER,
	})
	gender: USER_GENDER;

	@Column({ nullable: true })
	address: string;

	@Column({ nullable: true })
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

	@OneToOne(() => Photo, (photo: Photo) => photo.user)
	@JoinColumn()
	photo: Photo;

	@AfterLoad()
	updateFullName() {
		this.fullName = `${this.lastName} ${this.firstName}`;
	}
}
