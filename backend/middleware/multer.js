import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF resumes allowed"), false);
  }
};
export const upload = multer({ storage });
export const uploadResume = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const uploadImage = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    if (!allowedTypes.includes(file.mimetype)) {
      cb(
        new Error("Only JPG, PNG, WEBP images are allowed"),
        false
      );
    }
    cb(null, true);
  },
});
