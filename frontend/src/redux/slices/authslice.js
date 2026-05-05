import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    applicant: null,
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
  },
});
export const { setLoading, setUser, setApplicant } = authSlice.actions;
export default authSlice.reducer;
