import express from "express";
import {
  Register,
  login,
  logout,
  updateProfile,
  getProfile,
  uploadProfilePhoto,
  getApplicant,
  getAdminProfile,
  editAdminProfile,
  googleAuthentication,
  forgotPassword,
  resetPassword,
} from "../controller/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { uploadResume } from "../middleware/multer.js";
import { uploadUserResume } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.js";
import rateLimiter from "../middleware/rateLimit.js"

const router = express.Router();

router.post("/register", upload.single("file"), rateLimiter, Register);
router.post("/login", rateLimiter, login);
router.post("/logout", logout);
router.get("/profile", isAuthenticated, getProfile);
router.put("/profile", isAuthenticated, updateProfile);
router.get("/get/:applicantId/:jobId/applicant", isAuthenticated, getApplicant);
router.get("/admin/profile", isAuthenticated, getAdminProfile);
router.post("/google-login", rateLimiter, googleAuthentication);

router.post(
  "/forgot-password", rateLimiter,
  forgotPassword
);

router.post(
  "/reset-password/:token", rateLimiter,
  resetPassword
);

// resume
router.put(
  "/profile/resume",
  isAuthenticated,
  uploadResume.single("resume"),
  rateLimiter,
  uploadUserResume,
);

// profile photo
router.put(
  "/profile/photo",
  isAuthenticated,
  upload.single("photo"),
  rateLimiter,
  uploadProfilePhoto,
);

//update admin profile
router.put(
  "/admin/profile",
  upload.single("logo"),
  rateLimiter,
  isAuthenticated,
  editAdminProfile,
);

export default router;
