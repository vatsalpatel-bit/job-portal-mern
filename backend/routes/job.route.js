import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJob,
  getJobById,
  postJob,
  getJobFilters
} from "../controller/job.controller.js";

const router = express.Router();

router.get("/filters", getJobFilters);
router.post("/post", isAuthenticated, postJob);
router.get("/",getAllJob);
router.get("/getadminjob", isAuthenticated, getAdminJobs);
router.get("/get/:id", getJobById);


export default router;
