const multer = require("multer");
const streamifier = require("streamifier");
const { v2: cloudinary } = require("cloudinary");

const upload = multer({
  storage: multer.memoryStorage(),
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (buffer, folder = "ecommerce") => {
  return new Promise((resolve, reject) => {
    const options = {
      folder,
      resource_type: "image",
      transformation: [
        { width: "800", crop: "scale" },
        { quality: "auto" },
        { fetch_format: "auto" },
        { dpr: "auto" },
      ],
      use_filename: true,
      unique_filename: true,
    };

    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports = { upload, uploadToCloudinary, cloudinary };
