import "dotenv/config"; // 🔥 auto-load env FIRST
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("✅ Cloudinary READY");

export default cloudinary;


export const getPublicIdFromUrl = (url) => {
  if (!url) return null;

  const parts = url.split("/");
  const fileName = parts[parts.length - 1];
  const folderPath = parts
    .slice(parts.indexOf("upload") + 1, parts.length - 1)
    .join("/");

  const publicId = `${folderPath}/${fileName.split(".")[0]}`;
  return publicId;
};
