import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../utils/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import streamifier from "streamifier";
import { getPublicIdFromUrl } from "../utils/cloudinary.js";

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
      Number(process.env.SALT_ROUND)
    );

    // 🔥 NEW: handle profile photo
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
          }
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
        profilePhoto, // ✅ SAVED HERE
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
    const userId = req.userId;

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

    // 🔥 Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "job-portal/resumes",
            resource_type: "raw",
            overwrite: true,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(req.file.buffer);
    });

    // 🔥 SAVE INTO MONGODB (THIS WAS MISSING)
    user.profile.resume = uploadResult.secure_url;
    user.profile.resumeOringinalName = req.file.originalname;

    await user.save(); // 🔥 REQUIRED

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

    // 🔥 DELETE OLD IMAGE (if exists)
    if (user.profile.profilePhoto) {
      const publicId = getPublicIdFromUrl(user.profile.profilePhoto);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    // 🔥 UPLOAD NEW IMAGE
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
        }
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

