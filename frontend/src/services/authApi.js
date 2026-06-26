import API from "./api";

// Signup
export const signupUser = (formData) => {
  return API.post("/api/v1/user/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Login
export const loginUser = (data) => {
  return API.post("/api/v1/user/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Logout
export const logoutUser = () => {
  return API.post("/api/v1/user/logout");
};


// Get logged-in user profile
export const getProfileApi = () => {
  return API.get("/api/v1/user/profile");
};

// Update profile (JSON only)
export const saveProfile = (data) => {
  return API.put("/api/v1/user/profile", data);
};

// Upload resume (file)
export const uploadResumeApi = (file) => {
  const formData = new FormData();
  formData.append("/api/v1/user/resume", file);

  return API.put("/api/v1/user/profile/resume", formData);
};

// upload profile pic
export const uploadProfilePhotoApi = (file) => {
  const formData = new FormData();
  formData.append("/api/v1/userphoto", file);

  return API.put("/api/v1/user/profile/photo", formData);
};

export const getApplicantApi = async (applicantId, jobId) => {
  const res = await API.get(`/api/v1/user/get/${applicantId}/${jobId}/applicant`,
  );
  return res.data;
};

export const getAdminProfileApi = async () => {
  const res = await API.get(`/api/v1/user/admin/profile`);
  return res.data;
};

export const editAdminProfileApi = async (formData) => {
  const res = await API.put(`/api/v1/user/admin/profile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const googleAuthenticationApi = async (user) => {
  const res = await API.post(`/api/v1/user/google-login`, {
    fullname: user.displayName,
    email: user.email, profilePhoto: user.photoURL
  })
  return res.data;
}

export const forgotPasswordApi = async (email) => {
  const res = await API.post(`/api/v1/user/forgot-password`, {
    email
  });
  return res.data;
}

export const resetPasswordApi = async (token, password) => {
  const res = await API.post(`/api/v1/user/reset-password/${token}`, {
    password
  })
  return res.data;
}
