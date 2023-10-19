import { Injectable } from '@nestjs/common';
import { Photo } from './entities/photo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PhotoService {
	constructor(
		@InjectRepository(Photo) private photosRepository: Repository<Photo>,
	) {}
	uploadUserPhoto() {}
	uploadRoomPhoto() {}
	uploadRoomingHousePhoto() {}
	getPhoto() {}
}
