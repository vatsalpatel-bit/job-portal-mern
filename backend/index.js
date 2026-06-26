process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception", err.message)
  process.exit(-1);   //if err restart server
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandle Rejection", err.message)
  process.exit(-1);
});

import dotenv from "dotenv";
dotenv.config({});

import express, { Router } from "express";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";

import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

const app = express();
app.set("trust proxy", 1);

// helmet
app.use(helmet());

//compression
app.use(compression());

// cors
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOptions));


// midlleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// port 
const PORT = process.env.PORT || 8000;

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at port ${PORT}`);
});
