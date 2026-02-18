import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJob,
  getJobById,
  postJob,
} from "../controller/job.controller.js";

const router = express.Router();

router.post("/post", isAuthenticated, postJob);
router.get("/get", isAuthenticated, getAllJob);
router.get("/getadminjob", isAuthenticated, getAdminJobs);
router.get("/get/:id", isAuthenticated, getJobById);

export default router;
