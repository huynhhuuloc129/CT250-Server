import {
	BadRequestException,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Res,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
	ApiBearerAuth,
	ApiBody,
	ApiConsumes,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';
import { RequiredRoles } from '../auth/decorators/required-roles.decorator';
import { Public } from '../auth/utils';
import { USER_ROLE, User } from '../users/entities/user.entity';
import { UploadPhotoDto } from './dto/upload-photo.dto';
import { Photo } from './entities/photo.entity';
import { PhotoService } from './photo.service';

@Controller('photos')
@ApiTags('photos')
export class PhotoController {
	constructor(private readonly photoService: PhotoService) {}

	@Post('users')
	@ApiBearerAuth('bearer')
	@ApiOperation({ summary: 'User upload their photo' })
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: './src/modules/photo/storage',
				filename: (req, file, cb) => {
					const name = file.originalname.split('.')[0];
					const fileExtension = file.originalname.split('.')[1];
					const newFileName =
						name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension;

					cb(null, newFileName);
				},
			}),
			fileFilter(req, file, cb) {
				if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
					return cb(null, false);
				}
				cb(null, true);
			},
		}),
	)
	@ApiBody({ type: UploadPhotoDto })
	async currentUserUploadPhoto(
		@GetCurrentUser() user: User,
		@UploadedFile() file: Express.Multer.File,
	): Promise<Photo> {
		if (!file) {
			throw new BadRequestException('File is not an image');
		}

		return await this.photoService.currentUserUploadPhoto(user, file);
	}

	@Post('room/:roomId')
	@ApiOperation({ summary: 'Lessor upload owned room photo' })
	@RequiredRoles(USER_ROLE.lessor)
	@ApiBearerAuth('bearer')
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: './src/modules/photo/storage',
				filename: (req, file, cb) => {
					const name = file.originalname.split('.')[0];
					const fileExtension = file.originalname.split('.')[1];
					const newFileName =
						name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension;

					cb(null, newFileName);
				},
			}),
			fileFilter(req, file, cb) {
				if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
					return cb(null, false);
				}
				cb(null, true);
			},
		}),
	)
	@ApiBody({ type: UploadPhotoDto })
	async currentUserUploadRoomPhoto(
		@GetCurrentUser('id') userId: number,
		@Param('roomId', ParseIntPipe) roomId: number,
		@UploadedFile() file: Express.Multer.File,
	) {
		if (!file) {
			throw new BadRequestException('File is not an image');
		}

		return await this.photoService.ownerUploadRoomPhoto(userId, roomId, file);
	}

	@Post('rooming-houses/:roomingHouseId')
	@ApiOperation({ summary: 'Lessor upload owned rooming house photo' })
	@RequiredRoles(USER_ROLE.lessor)
	@ApiBearerAuth('bearer')
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: './src/modules/photo/storage',
				filename: (req, file, cb) => {
					const name = file.originalname.split('.')[0];
					const fileExtension = file.originalname.split('.')[1];
					const newFileName =
						name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension;

					cb(null, newFileName);
				},
			}),
			fileFilter(req, file, cb) {
				if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
					return cb(null, false);
				}
				cb(null, true);
			},
		}),
	)
	@ApiBody({ type: UploadPhotoDto })
	async currentUserUploadRoomingHousePhoto(
		@GetCurrentUser('id') userId: number,
		@UploadedFile() file: Express.Multer.File,
		@Param('roomingHouseId', ParseIntPipe) roomingHouseId: number,
	) {
		if (!file) {
			throw new BadRequestException('File is not an image');
		}

		return await this.photoService.ownerUploadRoomingHousePhoto(
			userId,
			roomingHouseId,
			file,
		);
	}

	@Post('utilities/:utilityId')
	@ApiOperation({ summary: 'Admin upload utility photo' })
	@RequiredRoles(USER_ROLE.ADMIN)
	@ApiBearerAuth('bearer')
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: './src/modules/photo/storage',
				filename: (req, file, cb) => {
					const name = file.originalname.split('.')[0];
					const fileExtension = file.originalname.split('.')[1];
					const newFileName =
						name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension;

					cb(null, newFileName);
				},
			}),
			fileFilter(req, file, cb) {
				if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
					return cb(null, false);
				}
				cb(null, true);
			},
		}),
	)
	@ApiBody({ type: UploadPhotoDto })
	async uploadUtilityPhoto(
		@UploadedFile() file: Express.Multer.File,
		@Param('utilityId', ParseIntPipe) utilityId: number,
	) {
		return await this.photoService.uploadUtilityPhoto(utilityId, file);
	}

	@Get(':filename')
	@ApiOperation({ summary: 'Get photo by name' })
	@Public()
	getPhoto(@Param('filename') filename: string, @Res() res: Response) {
		res.sendFile(filename, { root: './src/modules/photo/storage' });
	}

	@Delete('users')
	@ApiOperation({ summary: 'User remove profile photo' })
	@ApiBearerAuth('bearer')
	async removePhoto(@GetCurrentUser() user: User) {
		return await this.photoService.currentUserRemovePhoto(user);
	}

	@Delete('utilities/:utilityId')
	@ApiOperation({ summary: 'Admin remove utility photo' })
	@RequiredRoles(USER_ROLE.ADMIN)
	@ApiBearerAuth('bearer')
	async removeUtilityPhoto(@Param('utilityId') utilityId: number) {
		return await this.photoService.removeUtilityPhoto(utilityId);
	}

	@Delete(':photoId/rooming-houses')
	@ApiOperation({
		summary: 'Lessor remove owned rooming house photo by photoId',
	})
	@RequiredRoles(USER_ROLE.lessor)
	@ApiBearerAuth('bearer')
	async removeRoomingHousePhoto(
		@GetCurrentUser() user: User,
		@Param('photoId') photoId: number,
	) {
		return await this.photoService.ownerRemoveRoomingHousePhotoByPhotoId(
			photoId,
			user,
		);
	}

	@Delete(':photoId/room')
	@ApiOperation({
		summary: 'Lessor remove owned room photo by photoId',
	})
	@RequiredRoles(USER_ROLE.lessor)
	@ApiBearerAuth('bearer')
	async currentUserremoveRoomPhoto(
		@GetCurrentUser() user: User,
		@Param('photoId') photoId: number,
	) {
		return await this.photoService.ownerRemoveRoomPhotoByPhotoId(photoId, user);
	}
}
