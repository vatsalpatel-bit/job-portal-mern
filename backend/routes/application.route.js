import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { applyJob, getAppliedJobs, jobApplicant, updateStatus } from "../controller/application.controller.js";
import { getAllJob } from "../controller/job.controller.js";

const router=express.Router();

router.post("/apply/:id", isAuthenticated, applyJob);
router.get("/applied-jobs", isAuthenticated, getAppliedJobs);
router.get("/:id/applicant",isAuthenticated,jobApplicant);
router.post("/status/:id/update",isAuthenticated,updateStatus);
router.get("/get",isAuthenticated,getAllJob);

export default router;