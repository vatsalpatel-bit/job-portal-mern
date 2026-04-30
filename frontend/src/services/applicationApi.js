import { APPLICATION_API_END_PORT } from "@/utils/constant";
import axios from "axios";

export const applyJobApi = async (jobId) => {
  const res = await axios.post(
    `${APPLICATION_API_END_PORT}/apply/${jobId}`,
    {},
    { withCredentials: true },
  );

  return res.data;
};

export const getAppliedJobsApi = async () => {
  const res = await axios.get(`${APPLICATION_API_END_PORT}/applied-jobs`, {
    withCredentials: true,
  });
  return res.data;
};

export const getApplicantsApi = async (jobId) => {
  const res = await axios.get(`${APPLICATION_API_END_PORT}/${jobId}/applicant`);
  return res.data;
};

export const getAdminJobStatus = async () => {
  const res = await axios.get(`${APPLICATION_API_END_PORT}/status/get`, {
    withCredentials: true,
  });
  return res.data;
};
