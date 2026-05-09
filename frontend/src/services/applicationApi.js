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

export const getApplicantsApi = async (jobId, page) => {
  const res = await axios.get(
    `${APPLICATION_API_END_PORT}/${jobId}/applicant?page=${page}&limit=4`,
  );
  return res.data;
};

export const getAdminJobStatus = async (page) => {
  const res = await axios.get(
    `${APPLICATION_API_END_PORT}/status/get?page=${page}&limit=5`,
    {
      withCredentials: true,
    },
  );
  return res.data;
};

export const updateApplicantStatus = async (id, newStatus) => {
  const res = await axios.post(
    `${APPLICATION_API_END_PORT}/status/${id}/update`,
    {
      status: newStatus,
    },
  );
  return res.data;
};

export const updateApplicantStatusByIds = async (
  applicantId,
  jobId,
  newStatus,
) => {
  const res = await axios.post(
    `${APPLICATION_API_END_PORT}/status/${applicantId}/${jobId}/update`,
    {
      status: newStatus,
    },
  );
  return res.data;
};

export const undoApplicationApi = async (id) => {
  const res = await axios.delete(`${APPLICATION_API_END_PORT}/application/${id}/delete`, {
    withCredentials: true,
  });
  return res.status
}
