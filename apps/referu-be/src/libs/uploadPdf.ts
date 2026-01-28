import cloudinary from './cloudinary';

export const uploadResumeToCloudinary = (fileBuffer: Buffer, fileName: string) => {
  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw',
        folder: 'referrals',
        public_id: fileName.split('.').slice(0, -1).join('.'),
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      },
    );

    stream.end(fileBuffer);
  });
};
