// controller/company.controller.js
import Company from "../utils/company.model.js";
import { uploadFromBuffer } from "../utils/cloudinaryUpload.js";
import cloudinary from "../utils/cloudinary.js";
import mongoose from "mongoose";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    // check existing
    let existing = await Company.findOne({ name: companyName });
    if (existing) {
      return res.status(400).json({
        message: "A company with this name already exists",
        success: false,
      });
    }

    try {
      const userId = req.userId || req.id;
      const company = await Company.create({
        name: companyName,
        userId,
      });

      return res.status(201).json({
        message: "Company registered successfully",
        company,
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(404).json({
        message: "UserId not found",
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);

    const companies = await Company.aggregate([
      {
        $match: {
          userId: userId,
        },
      },

      // 🔹 get jobs
      {
        $lookup: {
          from: "jobs",
          localField: "_id",
          foreignField: "company",
          as: "jobs",
        },
      },

      // 🔹 get applications
      {
        $lookup: {
          from: "applications",
          localField: "jobs._id", 
          foreignField: "job",
          as: "applications",
        },
      },

      // 🔹 counts
      {
        $addFields: {
          totalJobs: { $size: "$jobs" },
          totalApplicants: { $size: "$applications" },

          accepted: {
            $size: {
              $filter: {
                input: "$applications",
                as: "app",
                cond: { $eq: ["$$app.status", "accepted"] },
              },
            },
          },

          pending: {
            $size: {
              $filter: {
                input: "$applications",
                as: "app",
                cond: { $eq: ["$$app.status", "pending"] },
              },
            },
          },

          rejected: {
            $size: {
              $filter: {
                input: "$applications",
                as: "app",
                cond: { $eq: ["$$app.status", "rejected"] },
              },
            },
          },
        },
      },

      // 🔹 clean
      {
        $project: {
          jobs: 0,
          applications: 0,
          __v: 0,
        },
      },

      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    //  Get existing company first
    const existingCompany = await Company.findById(req.params.id);

    if (!existingCompany) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    const updateData = { name, description, website, location };

    // If new file uploaded
    if (file) {
      //  1. Delete old image
      if (existingCompany.logoPublicId) {
        await cloudinary.uploader.destroy(existingCompany.logoPublicId);
      }

      //  2. Upload new image
      const result = await uploadFromBuffer(file.buffer);

      //  3. Save new data
      updateData.logo = result.secure_url;
      updateData.logoPublicId = result.public_id;
    }

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    return res.status(200).json({
      message: "Company updated successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
