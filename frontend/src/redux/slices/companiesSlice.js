import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    allCompanies: [],
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.allCompanies = action.payload;
    },
  },
});

export const { setSingleCompany, setCompanies } = companySlice.actions;
export default companySlice.reducer;
