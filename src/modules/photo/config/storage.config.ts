import { diskStorage } from 'multer';

export const storage = diskStorage({
	destination: './src/modules/photo/storage',
	filename: (req, file, callback) => {
		callback(null, generateFilename(file));
	},
});

function generateFilename(file) {
	return `${file.originalname}`;
}
