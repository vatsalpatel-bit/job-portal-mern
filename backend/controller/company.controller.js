// controller/company.controller.js
import Company from "../utils/company.model.js";
import cloudinary from "../utils/cloudinary.js";

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
    const userId = req.user.id;
    const companies = await Company.find({ userId });

    if (companies.length === 0) {
      return res.status(404).json({
        message: "No companies found",
        success: false,
      });
    }

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
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
    const { name, description, website, location } = req?.body;
    const file = req.file;

    const updateData = { name, description, website, location };

    if (file) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "company_logos",
      });
      updateData.logo = result.secure_url;
    }
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated",
      company,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
