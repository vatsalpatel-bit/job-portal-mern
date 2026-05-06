import cloudinary from "./cloudinary.js";
import streamifier from "streamifier";

export const uploadFromBuffer = (
  fileBuffer,
  folder = "companies",
  resourceType = "auto"
) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};