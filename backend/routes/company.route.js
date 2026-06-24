import express from "express";
import {
  deleteCompany,
  getAllCompaniesForJob,
  getCompany,
  getCompanyById,
  getCompanyStatus,
  registerCompany,
  searchCompany,
  updateCompany,
} from "../controller/company.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { uploadImage } from "../middleware/multer.js";
import rateLimiter from "../middleware/rateLimit.js"

const router = express.Router();

router.post("/register", isAuthenticated, rateLimiter, registerCompany);
router.get("/get", isAuthenticated, getCompany);
router.get("/get/:id", isAuthenticated, getCompanyById);
router.get("/get/:id/status", isAuthenticated, getCompanyStatus);
router.delete("/delete/:id/company", isAuthenticated, deleteCompany);
router.get("/search/company", isAuthenticated, searchCompany);
router.post("/get/allCompanies", isAuthenticated, getAllCompaniesForJob);
router.put(
  "/update/:id",
  uploadImage.single("logo"),
  isAuthenticated,
  rateLimiter,
  updateCompany,
);

export default router;
