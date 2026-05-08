import axios from "axios";
import { JOB_API_END_PORT } from "@/utils/constant";

export const getFilteredJobsApi = async (filters = {}) => {
  const params = {};

  if (filters.location?.length) params.location = filters.location.join(",");
  if (filters.industry?.length) params.industry = filters.industry.join(",");
  if (filters.salary?.length) params.salary = filters.salary.join(",");
  if (filters.keyword) params.keyword = filters.keyword;
  const res = await axios.get(`${JOB_API_END_PORT}/`, {
    params,
    withCredentials: true,
  });

  return res.data;
};

export const getJobById = async (id) => {
  return axios.get(`${JOB_API_END_PORT}/get/${id}`, {
    withCredentials: true,
  });
};

export const getJobFiltersApi = async () => {
  return axios.get(`${JOB_API_END_PORT}/filters`, {
    withCredentials: true,
  });
};

export const deleteJobApi = async (jobId) => {
  const res = await axios.delete(`${JOB_API_END_PORT}/job/${jobId}/delete`, {
    withCredentials: true,
  });
  return res.data;
};

export const searchJobApi = async (
  debounceSearch,
  page
) => {

  const res = await axios.get(
    `${JOB_API_END_PORT}/search/jobs`,
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

