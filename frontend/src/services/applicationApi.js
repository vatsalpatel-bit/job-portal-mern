import API from "./api";

export const applyJobApi = async (jobId) => {
  const res = await API.post(
    `/api/v1/application/apply/${jobId}`
  );

  return res.data;
};

export const getAppliedJobsApi = async () => {
  const res = await API.get(`/api/v1/application/applied-jobs`);
  return res.data;
};

export const getApplicantsApi = async (jobId, page) => {
  const res = await API.get(
    `/api/v1/application/${jobId}/applicant?page=${page}&limit=4`,
  );
  return res.data;
};

export const getAdminJobStatus = async (page) => {
  const res = await API.get(
    `/api/v1/application/status/get?page=${page}&limit=5`
  );
  return res.data;
};

export const updateApplicantStatus = async (id, newStatus) => {
  const res = await API.post(
    `/api/v1/application/status/${id}/update`,
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
  const res = await API.post(
    `/api/v1/application/status/${applicantId}/${jobId}/update`,
    {
      status: newStatus,
    },
  );
  return res.data;
};

export const undoApplicationApi = async (id) => {
  const res = await API.delete(`/api/v1/application/application/${id}/delete`);
  return res.status
}
