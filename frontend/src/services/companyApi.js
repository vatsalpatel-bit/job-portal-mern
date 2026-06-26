import API from "./api";

export const createCompanyApi = async (companyName) => {
  const res = await API.post(
    `/api/v1/company/register`,
    {
      companyName,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return res.data;
};

export const editCompanyApi = async (companyId, formData) => {
  const res = await API.put(
    `/api/v1/company/update/${companyId}`,
    formData,
  );
  return res.data;
};

export const getAllCompanyApi = async (page) => {
  const res = await API.get(`/api/v1/company/get?page=${page}&limit=6`);
  return res.data;
};

export const getCompanyById = async (companyId) => {
  const res = await API.get(`/api/v1/company/get/${companyId}`);
  return res.data;
};

export const getAdminJobsApi = async () => {
  const res = await API.get(`/api/v1/job/get`);
  return res.data;
};

export const postJobApi = async (jobData) => {
  const res = await API.post(
    `/api/v1/job/post`,
    { jobData },
    {
      headers: { "Content-Type": "application/json" },
    },
  );
  return res.data;
};

export const getJobByIdApi = async (jobId) => {
  const res = await API.get(`/api/v1/job/get/${jobId}`);
  return res.data;
};

export const updateJobApi = async (jobId, jobData) => {

  const res = await API.put(`/api/v1/job/update/${jobId}`, {
    jobData,
  });
  return res.data;
};

export const getCompanyStatus = async (companyId) => {
  const res = await API.get(
    `/api/v1/company/get/${companyId}/status`,
  );
  return res.data;
};

export const deleteCompanyApi = async (companyId) => {
  const res = await API.delete(
    `/api/v1/company/delete/${companyId}/company`
  );
  return res.data;
};

export const searchCompanyApi = async (
  debounceSearch,
  page
) => {

  const res = await API.get(
    `/api/v1/company/search/company`,
    {
      params: {
        keyword: debounceSearch,
        page,
        limit: 6,
      }
    }
  );

  return res.data;
};


export const getAllCompaniesForJob = async () => {
  const res = await API.post(`/api/v1/company/get/allCompanies`);
  return res.data;
};