import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJob,
  getJobById,
  postJob,
  getJobFilters,
  updateJob,
  deleteJob,
  searchJob,
} from "../controller/job.controller.js";

const router = express.Router();

router.get("/filters", getJobFilters);
router.post("/post", isAuthenticated, postJob);
router.get("/", getAllJob);
router.get("/get", isAuthenticated, getAdminJobs);
router.get("/get/:id", getJobById);
router.put("/update/:id", isAuthenticated, updateJob);
router.delete("/job/:id/delete", isAuthenticated, deleteJob)
router.get("/search/jobs", isAuthenticated, searchJob)

export default router;
