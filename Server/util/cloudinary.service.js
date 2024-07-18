const cloudinary = require('cloudinary').v2;
const cloudinaryConfig = require('../config/cloudinary.config');

cloudinary.config(cloudinaryConfig.cloudinary);

const uploadProductImageToCloudinary = async (imagePath, folder) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: folder,
      });

      resolve(result.secure_url);
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      reject(error);
    }
  });
};

module.exports = {
    uploadProductImageToCloudinary
}