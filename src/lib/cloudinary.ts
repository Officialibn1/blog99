import { v2 as cloudinary } from 'cloudinary';

import {
	CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_API_KEY,
	CLOUDINARY_SECRET_KEY
} from '$env/static/private';

cloudinary.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_SECRET_KEY
});

export const uploadThumnailToCloudinary = async (
	file: File,
	folder: string = 'blog9ja-thumnails'
) => {
	const bytes = await file.arrayBuffer();

	const buffer = Buffer.from(bytes);

	return new Promise<{
		public_id: string;
		secure_url: string;
	}>((resolve, reject) => {
		cloudinary.uploader
			.upload_stream(
				{
					folder,
					resource_type: 'image',
					transformation: [
						{
							width: 700,
							height: 700,
							crop: 'limit'
						},
						{ quality: 'auto' }
					]
				},
				(error, result) => {
					if (error) {
						reject(error);

						console.error(JSON.stringify(error));
					} else if (result) {
						resolve({
							public_id: result.public_id,
							secure_url: result.secure_url
						});
					} else {
						reject(new Error('Upload Failed'));
					}
				}
			)
			.end(buffer);
	});
};

export const deleteThumbnailFromCloudinary = async (public_id: string) => {
	return new Promise<void>((resolve, reject) => {
		cloudinary.uploader.destroy(public_id, (error, result) => {
			if (error) reject(error);
			else resolve(result);
		});
	});
};
