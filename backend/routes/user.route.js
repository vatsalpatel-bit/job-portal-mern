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

const router = express.Router();

router.post("/register", upload.single("file"), Register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", isAuthenticated, getProfile);
router.put("/profile", isAuthenticated, updateProfile);
router.get("/get/:applicantId/:jobId/applicant", isAuthenticated, getApplicant);
router.get("/admin/profile", isAuthenticated, getAdminProfile);
router.post("/google-login", googleAuthentication);

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/reset-password/:token",
  resetPassword
);

// resume
router.put(
  "/profile/resume",
  isAuthenticated,
  uploadResume.single("resume"),
  uploadUserResume,
);

// profile photo
router.put(
  "/profile/photo",
  isAuthenticated,
  upload.single("photo"),
  uploadProfilePhoto,
);

//update admin profile
router.put(
  "/admin/profile",
  upload.single("logo"),
  isAuthenticated,
  editAdminProfile,
);

export default router;
