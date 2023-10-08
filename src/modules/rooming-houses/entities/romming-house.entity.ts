import { Category } from 'src/modules/categories/entities/category.entity';
import { Notification } from 'src/modules/notifications/entities/notification.entity';
import { Room } from 'src/modules/rooms/entities/room.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class RoomingHouse extends BaseObject {
	@Column()
	name: string;

	@Column({ nullable: true })
	categoryID: number;

	@Column()
	address: string;

	@Column({ nullable: true })
	description: string;

	@Column()
	tenantID: number;

	@Column()
	communeID: number;

	@Column()
	availableRoomNumber: number;

	@Column()
	totalRoomNumber: number;

	@Column()
	paymentExpiresDate: Date;

	// @ManyToOne(() => Tenant)
	// tenant: Tenant;

	// @ManyToOne(() => Commune)
	// commune: Commune;

	@ManyToOne(() => Category)
	category: Category;

	@OneToMany(() => Notification, (assign: Notification) => assign.roomingHouse)
	notifications: Notification[];

	@OneToMany(() => Room, (assign: Room) => assign.roomingHouse)
	rooms: Room[];

	// @OneToMany(() => Photo, (assign: Photo) => assign.roomingHouse)
	// photos: Photo[];
}
