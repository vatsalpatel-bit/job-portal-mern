import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authslice";
import jobReducer from "@/redux/slices/jobSlice";
import companyReducer from "@/redux/slices/companiesSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
    company:companyReducer,
  },
  devTools: true,
});

export default store;
