import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    allApplicant: [],
  },
  reducers: {
    setAllApplicant: (state, action) => {
      state.allApplicant = action.payload;
    },

    updateApplicationStatus: (state, action) => {
      const { id, status } = action.payload;

      state.allApplicant = state.allApplicant.map((app) =>
        app._id === id ? { ...app, status } : app,
      );
    },
  },
});

export const { setAllApplicant, updateApplicationStatus } =
  applicationSlice.actions;
export default applicationSlice.reducer;
