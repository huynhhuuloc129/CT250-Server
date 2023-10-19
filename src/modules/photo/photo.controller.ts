import {
	Body,
	Controller,
	FileTypeValidator,
	Get,
	Header,
	MaxFileSizeValidator,
	ParseFilePipe,
	Post,
	StreamableFile,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadPhotoDto } from './dto/upload-photo.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/utils';
import { storage } from './config/storage.config';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('photo')
@ApiTags('photo')
export class PhotoController {
	constructor(private readonly photoService: PhotoService) {}

	@Post('upload')
	@Public()
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('file', { storage }))
	uploadFile(
		@Body() dto: UploadPhotoDto,
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
					new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
				],
			}),
		)
		file: Express.Multer.File,
	) {
		//  |   dto: { name: 'name' },
		//  |   data: {
		//  |     fieldname: 'data',
		//  |     originalname: 'pexels-ryan-horn-2318005.jpg',
		//  |     encoding: '7bit',
		//  |     mimetype: 'image/jpeg',
		//  |     buffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 01 00 48 00 48 00 00 ff e2 0c 58 49 43 43 5f 50 52 4f 46 49 4c 45 00 01 01 00 00 0c 48 4c 69 6e 6f 02 10 00 00 ...
		//  3047002 more bytes>,
		//  |     size: 3047052
		//  |   }
		//  | }
		console.log({ dto, file });
		return 'success';
	}

	@Get()
	@Public()
	@Header('Content-Disposition', 'attachment; filename="package.json"')
	getFile() {
		const file = createReadStream(
			join(process.cwd(), './uploads/1697685477353..jpg'),
		);
		return new StreamableFile(file);
	}
}
