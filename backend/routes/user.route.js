import express from "express";
import {
  Register,
  login,
  logout,
  updateProfile,
  getProfile,
  uploadProfilePhoto,
} from "../controller/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { uploadResume } from "../middleware/multer.js";
import { uploadUserResume } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.js";


const router = express.Router();

// ----------------------------------
// AUTH
// ----------------------------------

// Register (with optional profile file)
router.post("/register", upload.single("file"), Register);

// Login
router.post("/login", login);

// Logout
router.post("/logout", logout);

// ----------------------------------
// PROFILE
// ----------------------------------

// Get logged-in user profile
router.get("/profile", isAuthenticated, getProfile);

// Update profile (JSON)
router.put("/profile", isAuthenticated, updateProfile);

// resume 
router.put(
  "/profile/resume",
  isAuthenticated,
  uploadResume.single("resume"),
  uploadUserResume
);

// profile photo
router.put(
  "/profile/photo",
  isAuthenticated,
  upload.single("photo"),
  uploadProfilePhoto
);




export default router;
