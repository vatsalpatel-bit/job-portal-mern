import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authslice";
import jobReducer from "@/redux/slices/jobSlice";
import companyReducer from "@/redux/slices/companiesSlice";
import applicationReducer from "@/redux/slices/applicationSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
    company: companyReducer,
    application: applicationReducer,
  },
  devTools: true,
});

export default store;
