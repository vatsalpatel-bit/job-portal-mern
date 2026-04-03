import { Job } from "../utils/job.model.js";

// for recruiter
export const postJob = async (req, res) => {
  try {
    const userId = req.user?.id || req.id;
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
    } = req.body;

    if (
      !title ||
      !description ||
      !jobType ||
      !location ||
      !experience ||
      !companyId ||
      position == null ||
      salary == null ||
      !Array.isArray(requirements) ||
      requirements.length === 0
    ) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: Array.isArray(requirements)
        ? requirements
        : requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });
    return res.status(201).json({
      message: "New job create successfully",
      job,
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

// for student
export const getAllJob = async (req, res) => {
  try {
    const { keyword = "", location, industry, salary } = req.query;

    const andConditions = [];
    // 🔍 Keyword Search
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

    // 📍 Location Filter
    if (location) {
      andConditions.push({
        location: {
          $in: location
            .split(",")
            .map((loc) => new RegExp(`^${loc.trim()}$`, "i")),
        },
      });
    }

    // 🏢 Industry Filter
    if (industry) {
      andConditions.push({
        jobType: { $in: industry.split(",") },
      });
    }

    // 💰 Salary Filter
    if (salary) {
      const ranges = salary.split(",");
      const salaryConditions = [];

      ranges.forEach((range) => {
        if (range === "0–30k") {
          salaryConditions.push({ salary: { $gte: 0, $lte: 30000 } });
        }
        if (range === "30k–60k") {
          salaryConditions.push({ salary: { $gte: 30000, $lte: 60000 } });
        }
        if (range === "60k–1L") {
          salaryConditions.push({ salary: { $gte: 60000, $lte: 100000 } });
        }
        if (range === "1L–2L") {
          salaryConditions.push({ salary: { $gte: 100000, $lte: 200000 } });
        }
        if (range === "2L+") {
          salaryConditions.push({ salary: { $gte: 200000 } });
        }
      });

      if (salaryConditions.length > 0) {
        andConditions.push({ $or: salaryConditions });
      }
    }
    // ✅ Final Query
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

// for student
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

// for recruiter
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
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
    const industries = await Job.distinct("jobType"); // ✅ changed here

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
