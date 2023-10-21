import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Param,
	Post,
	Res,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadPhotoDto } from './dto/upload-photo.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/utils';
import { diskStorage } from 'multer';
import { Response } from 'express';

@Controller('photos')
@ApiTags('photos')
export class PhotoController {
	constructor(private readonly photoService: PhotoService) {}

	@Post('upload-photo')
	@Public()
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
	uploadPhoto(
		@Body() dto: UploadPhotoDto,
		@UploadedFile()
		file: Express.Multer.File,
	) {
		if (!file) {
			throw new BadRequestException('File is not an image');
		} else {
			const response = {
				filePath: `http://localhost:3000/api/photos/${file.filename}`,
			};
			return response;
		}
	}

	@Get(':filename')
	@Public()
	getPicture(@Param('filename') filename: string, @Res() res: Response) {
		res.sendFile(filename, { root: './src/modules/photo/storage' });
	}
}
