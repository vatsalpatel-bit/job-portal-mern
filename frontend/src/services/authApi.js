import axios from "axios";
import { USER_API_END_PORT } from "@/utils/constant";

// --------------------------------------------------
// AXIOS INSTANCE
// --------------------------------------------------
const API = axios.create({
  baseURL: USER_API_END_PORT,
  withCredentials: true,
});

// --------------------------------------------------
// AUTH
// --------------------------------------------------

// Signup
export const signupUser = (formData) => {
  return API.post("/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Login
export const loginUser = (data) => {
  return API.post("/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Logout
export const logoutUser = () => {
  return API.post("/logout");
};

// --------------------------------------------------
// PROFILE
// --------------------------------------------------

// Get logged-in user profile
export const getProfileApi = () => {
  return API.get("/profile");
};

// Update profile (JSON only)
export const saveProfile = (data) => {
  return API.put("/profile", data);
};

// Upload resume (file)
export const uploadResumeApi = (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  return API.put("/profile/resume", formData);
};

// upload profile pic
export const uploadProfilePhotoApi = (file) => {
  const formData = new FormData();
  formData.append("photo", file);

  return API.put("/profile/photo", formData);
};

export const getApplicantApi = async (applicantId, jobId) => {
  const res = await axios.get(
    `${USER_API_END_PORT}/get/${applicantId}/${jobId}/applicant`,
  );
  return res.data;
};

export const getAdminProfileApi = async () => {
  const res = await axios.get(`${USER_API_END_PORT}/admin/profile`, {
    withCredentials: true,
  });
  return res.data;
};

export const editAdminProfileApi = async (formData) => {
  const res = await axios.put(`${USER_API_END_PORT}/admin/profile`, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const googleAuthenticationApi = async (user) => {
  const res = await axios.post(`${USER_API_END_PORT}/google-login`, {
    fullname: user.displayName,
    email: user.email, profilePhoto: user.phtoURL
  })
  return res.data;
}

export const forgotPasswordApi = async (email) => {
  const res = await axios.post(`${USER_API_END_PORT}/forgot-password`, {
    email
  });
  return res.data;
}

export const resetPasswordApi = async (token, password) => {
  const res = await axios.post(`${USER_API_END_PORT}/reset-password/${token}`, {
    password
  })
  return res.data;
}
