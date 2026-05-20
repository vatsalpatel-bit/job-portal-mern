import { COMPANY_API_END_PORT, JOB_API_END_PORT } from "@/utils/constant";
import axios from "axios";

export const createCompanyApi = async (companyName) => {
  const res = await axios.post(
    `${COMPANY_API_END_PORT}/register`,
    {
      companyName,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    },
  );
  return res.data;
};

export const editCompanyApi = async (companyId, formData) => {
  const res = await axios.put(
    `${COMPANY_API_END_PORT}/update/${companyId}`,
    formData,
  );
  return res.data;
};

export const getAllCompanyApi = async (page) => {
  const res = await axios.get(`${COMPANY_API_END_PORT}/get?page=${page}&limit=6`, {
    withCredentials: true,
  });
  return res.data;
};

export const getCompanyById = async (companyId) => {
  const res = await axios.get(`${COMPANY_API_END_PORT}/get/${companyId}`);
  return res.data;
};

export const getAdminJobsApi = async () => {
  const res = await axios.get(`${JOB_API_END_PORT}/get`, {
    withCredentials: true,
  });
  return res.data;
};

export const postJobApi = async (jobData) => {
  const res = await axios.post(
    `${JOB_API_END_PORT}/post`,
    { jobData },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    },
  );
  return res.data;
};

export const getJobByIdApi = async (jobId) => {
  const res = await axios.get(`${JOB_API_END_PORT}/get/${jobId}`);
  return res.data;
};

export const updateJobApi = async (jobId, jobData) => {

  const res = await axios.put(`${JOB_API_END_PORT}/update/${jobId}`, {
    jobData,
  });
  return res.data;
};

export const getCompanyStatus = async (companyId) => {
  const res = await axios.get(
    `${COMPANY_API_END_PORT}/get/${companyId}/status`,
  );
  return res.data;
};

export const deleteCompanyApi = async (companyId) => {
  const res = await axios.delete(
    `${COMPANY_API_END_PORT}/delete/${companyId}/company`,
    { withCredentials: true },
  );
  return res.data;
};

export const searchCompanyApi = async (
  debounceSearch,
  page
) => {

  const res = await axios.get(
    `${COMPANY_API_END_PORT}/search/company`,
    {
      params: {
        keyword: debounceSearch,
        page,
        limit: 6,
      },
      withCredentials: true,
    }
  );

  return res.data;
};


export const getAllCompaniesForJob = async () => {
  const res = await axios.post(`${COMPANY_API_END_PORT}/get/allCompanies`, {
    withCredentials: true,
  });
  return res.data;
};