import { Category } from 'src/modules/categories/entities/category.entity';
import { Notification } from 'src/modules/notifications/entities/notification.entity';
import { Photo } from 'src/modules/photo/entities/photo.entity';
import { Room } from 'src/modules/rooms/entities/room.entity';
import { Tenant } from 'src/modules/tenant/entities/tenant.entity';
import { Ward } from 'src/modules/ward/entities/ward.entity';
import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class RoomingHouse extends BaseObject {
	@Column()
	name: string;

	@Column()
	address: string;

	@Column()
	description: string;

	@Column()
	availableRoomNumber: number;

	@Column()
	totalRoomNumber: number;

	@Column()
	paymentExpiresDate: Date;

	@ManyToOne(() => Tenant, (assign: Tenant) => assign.roomingHouses)
	tenant: Tenant;

	@ManyToOne(() => Ward)
	ward: Ward;

	@ManyToOne(() => Category, (assign: Category) => assign.roomingHouses)
	category: Category;

	@OneToMany(() => Notification, (assign: Notification) => assign.roomingHouse)
	notifications: Notification[];

	@OneToMany(() => Room, (assign: Room) => assign.roomingHouse)
	rooms: Room[];

	@OneToMany(() => Photo, (assign: Photo) => assign.roomingHouse, {})
	photos: Photo[];
}
