import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    applicant: null,
    admin: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setApplicant: (state, action) => {
      state.applicant = action.payload;
    },
    changeApplicantStatus: (state, action) => {
      const { status } = action.payload;

      state.applicant.status = status;
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
  },
});
export const {
  setLoading,
  setUser,
  setApplicant,
  changeApplicantStatus,
  setAdmin,
} = authSlice.actions;
export default authSlice.reducer;
