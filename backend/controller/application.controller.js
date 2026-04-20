import { Application } from "../utils/application.model.js";
import { Job } from "../utils/job.model.js";
import "../utils/user.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.userId; // this comes from auth middleware
    const jobId = req.params.id; // that come from url

    if (!userId) {
      return res.status(400).json({
        message: "User not authenticated",
      });
    }

    // check duplicate
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You already applied",
      });
    }

    // create application
    const application = await Application.create({
      job: jobId,
      applicant: userId,
    });

    // push into job
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    
    job.application.push(application._id);
    await job.save();

    res.status(201).json({
      message: "Application submitted",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.userId;

    const applications = await Application.find({
      applicant: userId,
    }).populate({
      path: "job",
      populate: {
        path: "company",
      },
    });

    return res.status(200).json({
      success: true,
      applications,
    });
    
  } catch (error) {
    console.error("Get Applied Jobs Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// admin get job aplication
export const jobApplicant = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "application",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(400).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Server error",
      success: false,
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(404).json({
        message: "status is required",
        success: false,
      });
    }
    const application = await Application.findOne({
      _id: applicationId,
    });
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }
    // update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status update successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const userId = req.id;

    const jobs = await Job.find().populate("company");

    const applications = await Application.find({
      applicant: userId,
    });

    const appliedJobIds = applications.map((app) => app.job.toString());

    const jobsWithStatus = jobs.map((job) => ({
      ...job.toObject(),
      hasApplied: appliedJobIds.includes(job._id.toString()),
    }));

    return res.status(200).json({
      success: true,
      jobs: jobsWithStatus,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
