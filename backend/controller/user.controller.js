import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../utils/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import streamifier from "streamifier";
import { getPublicIdFromUrl } from "../utils/cloudinary.js";
import mongoose from "mongoose";
import { Application } from "../utils/application.model.js";
import { uploadFromBuffer } from "../utils/cloudinaryUpload.js";
import { transporter } from "../utils/transporter.js";

const buildSafeUser = (user) => ({
  _id: user._id,
  fullname: user.fullname,
  email: user.email,
  phoneNumber: user.phoneNumber,
  role: user.role,
  profile: user.profile || null,
});

export const Register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(400).json({
        message: "User already exists. Try another email.",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUND),
    );

    //  NEW: handle profile photo
    let profilePhoto = "";

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "job-portal/profile-photos",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            resolve(result);
          },
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

      profilePhoto = uploadResult.secure_url;
    }

    const newUser = await User.create({
      fullname: fullname.trim(),
      email: normalizedEmail,
      phoneNumber: Number(phoneNumber),
      password: hashPassword,
      role,
      profile: {
        profilePhoto, // SAVED HERE
      },
    });

    return res.status(201).json({
      message: "Account created",
      success: true,
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    let user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with the provided role.",
        success: false,
      });
    }

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const safeUser = buildSafeUser(user);

    res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .json({
        message: `Welcome back ${safeUser.fullname}`,
        user: safeUser,
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

export const logout = async (req, res) => {
  try {
    const isProd = process.env.NODE_ENV === "production";

    res.clearCookie("token", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "strict" : "lax",
      path: "/",
    });

    return res.status(200).json({
      message: "Logout successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.profile) user.profile = {};

    if (fullname) user.fullname = fullname.trim();

    if (email) {
      const normalizedEmail = String(email).trim().toLowerCase();

      const existingUser = await User.findOne({
        email: normalizedEmail,
        _id: { $ne: userId },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email is already in use",
        });
      }

      user.email = normalizedEmail;
    }

    if (phoneNumber) user.phoneNumber = Number(phoneNumber);
    if (bio !== undefined) user.profile.bio = bio;

    if (skills !== undefined) {
      user.profile.skills = Array.isArray(skills)
        ? skills
        : String(skills)
          .split(",")
          .map((s) => s.trim());
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: buildSafeUser(user),
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const uploadUserResume = async (req, res) => {
  try {
    const userId = req.userId;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.profile) user.profile = {};

    // Upload to Cloudinary
    const uploadResult = await new Promise(
      (resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "job-portal/resumes",
            resource_type: "raw",
          },

          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier
          .createReadStream(req.file.buffer)
          .pipe(stream);
      }
    );
    // SAVE INTO MONGODB (THIS WAS MISSING)
    user.profile.resume = uploadResult.secure_url;
    user.profile.resumeOringinalName = req.file.originalname;

    await user.save(); //

    console.log("Resume saved:", user.profile.resume);

    return res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      user: buildSafeUser(user),
    });
  } catch (error) {
    console.error("Resume upload error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const uploadProfilePhoto = async (req, res) => {
  try {
    const userId = req.userId;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // DELETE OLD IMAGE (if exists)
    if (user.profile.profilePhoto) {
      const publicId = getPublicIdFromUrl(user.profile.profilePhoto);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    // UPLOAD NEW IMAGE
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "job-portal/profile-photos",
          resource_type: "image",
          transformation: [
            { width: 300, height: 300, crop: "fill" },
            { quality: "auto" },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    // SAVE NEW IMAGE
    user.profile.profilePhoto = uploadResult.secure_url;
    await user.save();

    res.status(200).json({
      success: true,
      user: buildSafeUser(user),
    });
  } catch (error) {
    console.error("Profile photo upload error:", error);
    res.status(500).json({ message: "Upload failed" });
  }
};

// get applicant profile
export const getApplicant = async (req, res) => {
  try {
    const applicantId = new mongoose.Types.ObjectId(req.params.applicantId);
    const jobId = new mongoose.Types.ObjectId(req.params.jobId);

    const application = await Application.findOne({
      applicant: applicantId,
      job: jobId,
    })
      .populate({
        path: "applicant",
        select: "fullname email phoneNumber profile",
      })
      .lean();

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }
    const response = {
      status: application.status,
      applicant: application.applicant,
    };
    return res.status(200).json({
      success: true,
      response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      messgae: "server error",
      success: false,
    });
  }
};

export const getAdminProfile = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const [profile] = await User.aggregate([
      {
        $match: {
          _id: userId,
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "_id",
          foreignField: "userId",
          as: "companies",
        },
      },
      {
        $lookup: {
          from: "jobs",
          localField: "companies._id",
          foreignField: "company",
          as: "jobs",
        },
      },
      {
        $lookup: {
          from: "applications",
          localField: "jobs._id",
          foreignField: "job",
          as: "applications",
        },
      },
      {
        $addFields: {
          totalCompanies: {
            $size: "$companies",
          },
          totalJobs: {
            $size: "$jobs",
          },
          accepted: {
            $size: {
              $filter: {
                input: "$applications",
                as: "app",
                cond: { $eq: ["$$app.status", "accepted"] },
              },
            },
          },
        },
      },
      {
        $project: {
          jobs: 0,
          applications: 0,
          companies: 0,
          password: 0,
          __v: 0,
        },
      },
    ]);
    return res.status(200).json({
      profile,
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

export const editAdminProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber } = req.body;
    console.log(fullname, email, phoneNumber);
    const userId = new mongoose.Types.ObjectId(req.userId);
    const file = req.file;

    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const updateData = {
      fullname,
      email,
      phoneNumber,
    };

    // Upload new profile image
    if (file) {
      // Delete old image
      if (existingUser.profile?.profilePhotoPublicId) {
        await cloudinary.uploader.destroy(
          existingUser.profile.profilePhotoPublicId,
        );
      }

      // Upload new image
      const result = await uploadFromBuffer(file.buffer);

      updateData.profile = {
        ...existingUser.profile,
        profilePhoto: result.secure_url,
        profilePhotoPublicId: result.public_id,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const googleAuthentication = async (
  req,
  res
) => {

  try {

    console.log(req.body);

    const {
      fullname,
      email,
      profilePhoto,
    } = req.body;

    let user = await User.findOne({
      email,
    });

    if (!user) {

      user = await User.create({

        fullname,

        email,

        role: "student",

        profile: {
          profilePhoto,
        },
      });
    }

    const token = jwt.sign(

      { userId: user._id },

      process.env.SECRET_KEY,

      { expiresIn: "1d" }
    );

    return res
      .cookie("token", token, {
        httpOnly: true,
      })

      .status(200)

      .json({
        success: true,
        user,
      });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      })
    }
    if (!user.password) {

      return res.status(400).json({
        success: false,
        message:
          "Please login with Google",
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "15min" }
    )

    const resetLink =
      `http://localhost:5173/reset-password/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset password",

        html: ` <div style=" background:#f6f9ff; padding:40px 20px; font-family:Arial,sans-serif; " > <div style=" max-width:600px; margin:auto; background:#ffffff; border-radius:24px; overflow:hidden; box-shadow:0 10px 40px rgba(0,0,0,0.06); " > <div style=" background:linear-gradient(135deg,#2563eb,#7c3aed); padding:50px 40px; text-align:center; " > <h1 style=" color:white; margin:0; font-size:34px; font-weight:800; " > NextWork </h1> <p style=" color:rgba(255,255,255,0.85); margin-top:14px; font-size:16px; " > Secure Password Reset </p> </div> <div style="padding:45px 40px;"> <div style=" display:inline-block; background:#eef4ff; color:#2563eb; padding:10px 18px; border-radius:999px; font-size:13px; font-weight:600; margin-bottom:24px; " > 🔐 Password Recovery </div> <h2 style=" margin:0; color:#111827; font-size:32px; font-weight:800; line-height:1.2; " > Reset Your Password </h2> <p style=" margin-top:22px; color:#4b5563; font-size:16px; line-height:1.8; " > We received a request to reset your password for your NextWork account. </p> <p style=" margin-top:16px; color:#4b5563; font-size:16px; line-height:1.8; " > Click the button below to create a new password. </p> <div style="margin-top:38px;"> <a href="${resetLink}" style=" display:inline-block; background:linear-gradient(135deg,#2563eb,#7c3aed); color:white; text-decoration:none; padding:16px 32px; border-radius:18px; font-size:16px; font-weight:700; " > Reset Password </a> </div> <div style=" margin-top:40px; padding:20px; background:#f8fbff; border-radius:18px; " > <p style=" margin:0 0 10px 0; color:#111827; font-size:14px; font-weight:600; " > Button not working? </p> <p style=" margin:0; color:#6b7280; font-size:13px; line-height:1.7; word-break:break-all; " > ${resetLink} </p> </div> <div style=" margin-top:28px; padding:18px; background:#fff7ed; border-radius:18px; " > <p style=" margin:0; color:#c2410c; font-size:14px; line-height:1.7; " > ⚠️ If you did not request a password reset, you can safely ignore this email. </p> </div> </div> <div style=" border-top:1px solid #eef2ff; padding:28px 40px; text-align:center; background:#fcfdff; " > <p style=" margin:0; color:#9ca3af; font-size:13px; " > © ${new Date().getFullYear()} NextWork. All rights reserved. </p> </div> </div> </div> `

    })
    return res.status(200).json({
      success: true,
      message: "Reset link sent",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}


export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params
    const { password } = req.body;
    // console.log(token, password)
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUND));

    await User.findByIdAndUpdate(decoded.userId, {
      password: hashedPassword
    })

    return res.status(200).json({
      message: "Password reset successful",
      success: true
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false
    })
  }
}