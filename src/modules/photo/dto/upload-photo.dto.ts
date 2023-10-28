import { ApiProperty } from '@nestjs/swagger';

export class UploadPhotoDto {
	@ApiProperty({ type: 'string', format: 'binary', required: true })
	file: Express.Multer.File;
}
