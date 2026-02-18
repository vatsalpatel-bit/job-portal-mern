import express from "express";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controller/company.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/register", isAuthenticated, registerCompany);
router.get("/get", isAuthenticated, getCompany);
router.get("/get/:id", isAuthenticated, getCompanyById);
router.put("/update/:id", isAuthenticated, updateCompany);

export default router;
