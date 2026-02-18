import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authslice";
import jobReducer from "@/redux/slices/jobSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
  },
  devTools: true,
});

export default store;
