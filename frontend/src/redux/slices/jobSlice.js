import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singleJob: null,
    searchedJobs: [],
    savedJobs: [],
    appliedJobs: [],
    loading: false,
    error: null,
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },

    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },

    setSearchedJobs: (state, action) => {
      state.searchedJobs = action.payload;
    },

    setAppliedJobs: (state, action) => {
     state.appliedJobs = action.payload;
    },

    setJobLoading: (state, action) => {
      state.loading = action.payload;
    },

    setJobError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setSearchedJobs,
  setAppliedJobs,
  setJobLoading,
  setJobError,
} = jobSlice.actions;

export default jobSlice.reducer;
