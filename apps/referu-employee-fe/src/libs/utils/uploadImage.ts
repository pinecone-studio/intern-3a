import cloudinary from '../cloudinary';

export const uploadImageToCloudinary = async (image: File): Promise<string> => {
  try {
    // Convert File to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${image.type};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: 'referu-images',
    });

    return result.secure_url;
  } catch (error) {
    throw new Error('Failed to upload image to Cloudinary');
  }
};
