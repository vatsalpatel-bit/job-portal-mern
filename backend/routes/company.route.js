import express from "express";
import {
  getCompany,
  getCompanyById,
  getCompanyStatus,
  registerCompany,
  updateCompany,
} from "../controller/company.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { uploadImage } from "../middleware/multer.js";

const router = express.Router();

router.post("/register", isAuthenticated, registerCompany);
router.get("/get", isAuthenticated, getCompany);
router.get("/get/:id", isAuthenticated, getCompanyById);
router.get("/get/:id/status", isAuthenticated, getCompanyStatus);
router.put(
  "/update/:id",
  uploadImage.single("logo"),
  isAuthenticated,
  updateCompany,
);

export default router;
