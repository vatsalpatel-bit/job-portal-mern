import multer from "multer";

// 🔹 memory storage (for Cloudinary buffer)
const storage = multer.memoryStorage();

// 🔹 common limits
const limits = {
  fileSize: 2 * 1024 * 1024, // 2MB
};

// 🔹 PDF filter
const pdfFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    return cb(null, true);
  }
  return cb(new Error("Only PDF resumes allowed"), false);
};

// 🔹 Image filter
const imageTypes = ["image/jpeg", "image/png", "image/webp"];

const imageFilter = (req, file, cb) => {
  if (imageTypes.includes(file.mimetype)) {
    return cb(null, true);
  }
  return cb(
    new Error("Only JPG, PNG, WEBP images are allowed"),
    false
  );
};

// 🔹 Exports
export const uploadResume = multer({
  storage,
  limits,
  fileFilter: pdfFilter,
});

export const uploadImage = multer({
  storage,
  limits,
  fileFilter: imageFilter,
});