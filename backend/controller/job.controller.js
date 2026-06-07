import mongoose, { Types } from "mongoose";
import { Job } from "../utils/job.model.js";
import { Application } from "../utils/application.model.js";
import Company from "../utils/company.model.js";

export const postJob = async (req, res) => {
  try {
    const userId = req?.userId;

    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req?.body?.jobData;

    if (
      !title ||
      !description ||
      !jobType ||
      !location ||
      experience === undefined ||
      !companyId ||
      position === undefined ||
      salary === undefined ||
      !Array.isArray(requirements) ||
      requirements.length === 0
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements,
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(200).json({
      message: "New job created successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const updateJob = async (req, res) => {
  try {

    const jobId = req.params.id;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        message: "Invalid Job Id",
        success: false,
      });
    }
    const allowedFields = [
      "title",
      "description",
      "requirements",
      "salary",
      "location",
      "jobType",
      "experienceLevel",
      "position",
    ];

    const updateData = {};

    Object.keys(req.body.jobData).forEach((key) => {
      if (allowedFields.includes(key) && req.body.jobData[key] !== undefined) {
        updateData[key] = req.body.jobData[key];
      }
    });

    if (Object.keys(req.body.jobData).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided for update",
        success: false
      })
    }

    const existingJob = await Job.findById(jobId);

    if (!existingJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (existingJob.created_by.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    ).populate("company");

    return res.status(200).json({
      message: "Job update successfully",
      job: updateJob,
      success: true,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getAllJob = async (req, res) => {
  try {
    const { keyword = "", location, industry, salary } = req.query;

    const andConditions = [];

    // Keyword Search
    if (keyword) {
      andConditions.push({
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { location: { $regex: keyword, $options: "i" } },
          { jobType: { $regex: keyword, $options: "i" } },
        ],
      });
    }

    // Location Filter
    if (location) {
      andConditions.push({
        location: {
          $in: location
            .split(",")
            .map((loc) => new RegExp(`^${loc.trim()}$`, "i")),
        },
      });
    }

    //  Industry Filter
    if (industry) {
      andConditions.push({
        jobType: { $in: industry.split(",") },
      });
    }

    // Salary Filter
    if (salary) {
      const ranges = salary.split(",");
      const salaryConditions = [];

      ranges.forEach((range) => {
        if (range === "0–1L") {
          salaryConditions.push({ salary: { $gte: 0, $lte: 100000 } });
        }
        if (range === "1L–2L") {
          salaryConditions.push({ salary: { $gte: 100000, $lte: 200000 } });
        }
        if (range === "2L–3L") {
          salaryConditions.push({ salary: { $gte: 200000, $lte: 300000 } });
        }
        if (range === "3L–5L") {
          salaryConditions.push({ salary: { $gte: 300000, $lte: 500000 } });
        }
        if (range === "5L–10L") {
          salaryConditions.push({ salary: { $gte: 500000, $lte: 1000000 } });
        }
        if (range === "10L–20L") {
          salaryConditions.push({ salary: { $gte: 1000000, $lte: 2000000 } });
        }
        if (range === "20L–30L") {
          salaryConditions.push({ salary: { $gte: 2000000, $lte: 3000000 } });
        }
        if (range === "30L+") {
          salaryConditions.push({ salary: { $gte: 3000000 } });
        }
      });

      if (salaryConditions.length > 0) {
        andConditions.push({ $or: salaryConditions });
      }
    }
    
    // Final Query
    const finalQuery = andConditions.length > 0 ? { $and: andConditions } : {};
    const jobs = await Job.find(finalQuery)
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId)
      .populate("company")
      .populate({
        path: "application",
        populate: {
          path: "applicant",
          select: "_id",
        },
      });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log("ERRROR IN getJobById:", error);
    return res.status(500).json({
      message: "server error",
      success: false,
    });
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.userId;
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getJobFilters = async (req, res) => {
  try {
    const locations = await Job.distinct("location");
    const industries = await Job.distinct("jobType");

    res.status(200).json({
      locations,
      industries,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to fetch filters",
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const jobId = new mongoose.Types.ObjectId(req.params.id);
    const userId = new mongoose.Types.ObjectId(req.userId);

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    const company = await Company.findById(job.company);
    if (company.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Not authorized",
        success: false,
      });
    }
    await Application.deleteMany({
      job: jobId,
    });

    await Job.findByIdAndDelete(jobId);
    return res.status(200).json({
      message: "Job deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const searchJob = async (req, res) => {
  try {

    const keyword = req.query.keyword || "";

    const jobs = await Job.find({
      $or: [
        {
          title: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          location: {
            $regex: keyword,
            $options: "i",
          },
        },
      ],
    });

    return res.status(200).json({
      success: true,
      jobs,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};