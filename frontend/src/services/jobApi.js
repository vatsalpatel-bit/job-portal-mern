import API from "./api";

export const getFilteredJobsApi = async (filters = {}) => {
  const params = {};

  if (filters.location?.length) params.location = filters.location.join(",");
  if (filters.industry?.length) params.industry = filters.industry.join(",");
  if (filters.salary?.length) params.salary = filters.salary.join(",");
  if (filters.keyword) params.keyword = filters.keyword;
  const res = await API.get(`/api/v1/job/`, {
    params,
  });

  return res.data;
};

export const getJobById = async (id) => {
  return API.get(`/api/v1/job/get/${id}`);
};

export const getJobFiltersApi = async () => {
  return API.get(`/api/v1/job/filters`);
};

export const deleteJobApi = async (jobId) => {
  const res = await API.delete(`/api/v1/job/job/${jobId}/delete`);
  return res.data;
};

export const searchJobApi = async (
  debounceSearch,
  page
) => {

  const res = await API.get(
    `/api/v1/job/search/jobs`,
    {
      params: {
        keyword: debounceSearch,
        page,
        limit: 6,
      },
      
    }
  );

  return res.data;
};

