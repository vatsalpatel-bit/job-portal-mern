import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getApplicantsApi, updateApplicantStatus } from '@/services/applicationApi';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicant, updateApplicationStatus } from '@/redux/slices/applicationSlice';

const JobApplicantPage = () => {
  const navigate = useNavigate();
  const { id: jobId } = useParams();
  const dispatch = useDispatch();
  const applicant = useSelector((state) => state.application.allApplicant);
  console.log(applicant);
  useEffect(() => {
    const fetchApplicantApi = async () => {
      const data = await getApplicantsApi(jobId);
      dispatch(setAllApplicant(data.job.application));
    };
    fetchApplicantApi();
  }, [jobId, dispatch]);

  const handleStatus = async (id, newStatus) => {
    try {
      await updateApplicantStatus(id, newStatus);
      dispatch(updateApplicationStatus({ id, status: newStatus }))
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-16">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-black"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <h1 className="text-xl font-semibold text-gray-800">
              Applicants
            </h1>
          </div>

          <span className="text-xs bg-white border px-3 py-1 rounded-full text-gray-600">
            {applicant?.length || 0} Applicants
          </span>
        </div>

        {/* Applicant List */}
        <div className="space-y-4">
          {applicant?.map((a) => (
            <div
              key={a?.applicant?._id}
              className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">

                {/* LEFT */}
                <div className="flex items-center gap-4">

                  {/* Avatar */}
                  {a.applicant?.profile?.profilePhoto ? (
                    <img
                      src={a.applicant.profile.profilePhoto}
                      alt="profile"
                      className="w-12 h-12 rounded-full object-cover border"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                      {a.applicant?.fullname?.[0]}
                    </div>
                  )}

                  {/* Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800">
                      {a.applicant.fullname}
                    </h3>

                    {/* FIXED */}
                    <p className="text-xs text-gray-400">
                      Applied for this job
                    </p>

                    <div className="flex gap-4 mt-2 text-xs text-gray-500">
                      <span>📧 {a.applicant.email}</span>
                      <span>📞 +91 {a.applicant.phoneNumber}</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">

                  {/* STATUS */}
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${a?.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : a?.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {a?.status === "accepted" ? "Accepted" :
                      a?.status === "rejected" ? "Rejected" :
                        "Pending"}
                  </span>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-2">

                    <button className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
                      View
                    </button>

                    {/* Pending → show both */}
                    {a?.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleStatus(a._id, "accepted")}
                          className="px-3 py-1 text-xs bg-green-50 text-green-600 rounded-md hover:bg-green-100">
                          Accept
                        </button>

                        <button
                          onClick={() => handleStatus(a._id, "rejected")}
                          className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded-md hover:bg-red-100">
                          Reject
                        </button>
                      </>
                    )}

                    {/* Accepted OR Rejected → only Undo */}
                    {(a?.status === "accepted" || a?.status === "rejected") && (
                      <button
                        onClick={() => handleStatus(a._id, "pending")}
                        className="px-3 py-1 text-xs bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100">
                        Undo
                      </button>
                    )}

                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default JobApplicantPage;