import {
	ForbiddenException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { PHOTO_TYPE, Photo } from './entities/photo.entity';
import { UtilityService } from '../utility/utility.service';
import { promisify } from 'util';
import { unlink } from 'fs';
import { stat } from 'fs/promises';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhotoService {
	constructor(
		@InjectRepository(Photo) private photosRepository: Repository<Photo>,
		private usersService: UsersService,
		private utilitiesService: UtilityService,
	) {}

	async currentUserRemovePhoto(user: User | any) {
		await this.removePhoto(user.photo.id);
		return 'success';
	}

	async removeUtilityPhoto(utilityId: number) {
		const utility: any = await this.utilitiesService.findOneByCondititon({
			id: utilityId,
		});

		if (!utility) {
			throw new NotFoundException('Not found utility');
		}

		await this.removePhoto(utility.photo.id);

		return 'success';
	}

	async ownerRemoveRoomPhotoByPhotoId(photoId: number, user: User) {
		const photo: any = await this.photosRepository.findOne({
			where: { id: photoId },
			relations: {
				room: {
					lessor: true,
				},
			},
		});

		if (!photo || !photo.room || photo.room.lessor.id) {
			throw new NotFoundException('Not found room photo');
		}

		if (photo.room.lessor.id !== user.lessor.id) {
			throw new ForbiddenException('Photo not belong owned room');
		}

		await this.removePhoto(photo.id);

		return 'success';
	}

	async ownerRemoveRoomingHousePhotoByPhotoId(photoId: number, user: User) {
		const photo: any = await this.photosRepository.findOne({
			where: { id: photoId },
			relations: {
				roomingHouse: {
					lessor: true,
				},
			},
		});

		if (!photo || !photo.roomingHouse) {
			throw new NotFoundException('Not found rooming house photo');
		}

		if (photo.roomingHouse.lessor.id !== user.lessor.id) {
			throw new ForbiddenException('Photo not belong owned rooming house');
		}

		await this.removePhoto(photo.id);

		return 'success';
	}

	async currentUserUploadPhoto(
		user: User | any,
		file: Express.Multer.File,
	): Promise<Photo> {
		const photo = new Photo();

		photo.fileName = file.filename;
		photo.path = file.path;
		photo.url = `http://localhost:3000/api/photos/${file.filename}`;
		photo.type = PHOTO_TYPE.USER;
		photo.user = user.id;

		await this.photosRepository.save(photo);

		if (user.photo) {
			await this.removePhoto(user.photo.id);
		}

		await this.usersService.updateOneByCondititon(
			{ id: user.id },
			{ photo: photo.id },
		);

		return photo;
	}

	async ownerUploadRoomPhoto(
		userId: number,
		roomId: number,
		file: Express.Multer.File,
	): Promise<Photo> {
		const user = await this.usersService.findOneByCondititonWithRelation(
			{ id: userId },
			{ lessor: { rooms: true } },
		);

		const isOwner = user.lessor?.rooms.some((room) => room.id === roomId);

		if (!isOwner) {
			throw new ForbiddenException(
				'User not own that room or not found room with that roomId',
			);
		}

		const photo = new Photo();
		photo.fileName = file.filename;
		photo.path = file.path;
		photo.url = `http://localhost:3000/api/photos/${file.filename}`;
		photo.type = PHOTO_TYPE.ROOM;
		photo.room = roomId;

		await this.photosRepository.save(photo);

		return photo;
	}

	async ownerUploadRoomingHousePhoto(
		userId: number,
		roomingHouseId: number,
		file: Express.Multer.File,
	): Promise<Photo> {
		const user = await this.usersService.findOneByCondititonWithRelation(
			{ id: userId },
			{ lessor: { roomingHouses: true } },
		);

		const isOwner = user.lessor?.roomingHouses.some(
			(roomingHouse) => roomingHouse.id === roomingHouseId,
		);

		if (!isOwner) {
			throw new ForbiddenException(
				'User not own that rooming house or not found rooming house with that roomingHouseId',
			);
		}

		const photo = new Photo();
		photo.fileName = file.filename;
		photo.path = file.path;
		photo.url = `http://localhost:3000/api/photos/${file.filename}`;
		photo.type = PHOTO_TYPE.ROOMING_HOUSE;
		photo.roomingHouse = roomingHouseId;

		await this.photosRepository.save(photo);

		return photo;
	}

	async uploadUtilityPhoto(
		utilityId: number,
		file: Express.Multer.File,
	): Promise<Photo> {
		const utility: any = await this.utilitiesService.findOneByCondititon({
			id: utilityId,
		});

		if (!utility) {
			throw new NotFoundException('Not found utility');
		}

		const photo = new Photo();

		photo.fileName = file.filename;
		photo.path = file.path;
		photo.url = `http://localhost:3000/api/photos/${file.filename}`;
		photo.type = PHOTO_TYPE.UTILITY;
		photo.utility = utilityId;

		await this.photosRepository.save(photo);

		if (utility.photo) {
			await this.removePhoto(utility.photo.id);
		}

		await this.utilitiesService.updateOneByCondititon(
			{ id: utilityId },
			{ photo: photo.id },
		);

		return photo;
	}

	async removePhoto(id: number) {
		try {
			const photo = await this.photosRepository
				.createQueryBuilder('photo')
				.where('photo.id = :id', { id })
				.addSelect('photo.path')
				.getOne();
			const path = photo.path;

			if (!photo) {
				throw new NotFoundException('Photo not found');
			}

			await this.photosRepository.delete({ id: photo.id });

			const exists = await stat(path)
				.then(() => true)
				.catch(() => false);

			if (exists) {
				const unlinkAsync = promisify(unlink);
				await unlinkAsync(path);
			}

			return 'success';
		} catch (error) {
			throw new InternalServerErrorException();
		}
	}
}
