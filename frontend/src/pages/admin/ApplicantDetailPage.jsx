import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getApplicantApi } from "@/services/authApi";
import { useDispatch, useSelector } from "react-redux";
import { changeApplicantStatus, setApplicant } from "@/redux/slices/authslice";
import ResumeViewer from "@/components/resume/ResumeViewer";
import { updateApplicantStatus, updateApplicantStatusByIds } from "@/services/applicationApi";

const ApplicantDetailPage = () => {
  const navigate = useNavigate();
  const { applicantId, jobId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const application = useSelector((state) => state.auth.applicant)
  const resumeUrl = application?.applicant?.profile?.resume;
  console.log(application)


  useEffect(() => {
    const fetchApplicantApi = async () => {
      try {
        setLoading(true);
        const data = await getApplicantApi(applicantId, jobId);
        // console.log(data.response);
        dispatch(setApplicant(data.response))
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

    }
    fetchApplicantApi();
  }, [applicantId, jobId, dispatch]);

  const handleStatus = async (newStatus) => {
    try {
      await updateApplicantStatusByIds(applicantId, jobId, newStatus);
      dispatch(changeApplicantStatus({ status: newStatus }));
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">

        <div className="flex flex-col items-center gap-4">

          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />

          <p className="text-sm text-gray-500">
            Loading ...
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-6 mt-16">
      <div className="max-w-6xl mx-auto space-y-6">

        <div className="flex items-center justify-between mb-6">

          {/* LEFT → Back + Title */}
          <div className="flex items-start gap-6">

            {/* Back */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-gray-600 hover:text-black mt-4"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            {/* Title */}
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Applicant Details
              </h1>
              <p className="text-sm text-gray-500">
                Review candidate profile and take action
              </p>
            </div>

          </div>

          {/* RIGHT → Actions */}
          <div className="flex gap-3">
            {application?.status === "pending" ? (<>
              <button
                onClick={() => handleStatus("accepted")}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Accept
              </button>
              <button
                onClick={() => handleStatus("rejected")}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                Reject
              </button></>) : (
              <button
                onClick={() => handleStatus("pending")}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                Undo
              </button>)}
          </div>

        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 flex items-center justify-between">

          <div className="flex items-center gap-5">

            <img
              src={
                application?.applicant?.profile?.profilePhoto?.startsWith("http")
                  ? application.applicant.profile.profilePhoto
                  : "/default-avatar.png"
              }
              alt="logo"
              className="w-16 h-16 rounded-full object-cover"
            />

            {/* Info */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {application?.applicant?.fullname}
              </h2>
              <p className="text-gray-500 text-sm">
                Applied for this job
              </p>

              <div className="flex gap-6 mt-2 text-sm text-gray-600 flex-wrap">
                <span>📧 {application?.applicant?.email}</span>
                <span>📞 +91 {application?.applicant?.phoneNumber}</span>
              </div>
            </div>
          </div>

          {application?.status === "pending" ? (
            <span className="px-4 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
              Pending
            </span>) : application?.status === "rejected" ? (
              <span className="px-4 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                Rejected
              </span>) : (<span className="px-4 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                Accepted
              </span>)
          }
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* About */}
          <div className="bg-white rounded-2xl shadow-sm border p-5 md:col-span-2">
            <h3 className="font-semibold text-gray-800 mb-2">
              About Candidate
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {application?.applicant?.profile?.bio}
            </p>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-2xl shadow-sm border p-5">
            <h3 className="font-semibold text-gray-800 mb-3">Skills</h3>

            <div className="flex flex-wrap gap-2">
              {application?.applicant?.profile?.skills?.length > 0 ? (
                application.applicant.profile.skills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100 rounded-full hover:bg-blue-100 transition"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-400">No skills added</p>
              )}
            </div>
          </div>

        </div>
        {/* Resume Section */}
        <div className="bg-white rounded-2xl shadow-sm border p-5">

          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-semibold text-gray-800">Resume</h3>
              <p className="text-xs text-gray-500">
                Preview or download applicant resume
              </p>
            </div>

            <div className="flex gap-2">
              {resumeUrl && (
                <>
                  {/* View Full */}
                  <a
                    href={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(resumeUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 text-sm border rounded-md hover:bg-gray-100"
                  >
                    View Full
                  </a>

                  {/* Download */}
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                  >
                    Download
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Resume Preview */}
          <div className="border rounded-xl overflow-hidden bg-gray-100">

            {resumeUrl ? (
              <iframe
                src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(resumeUrl)}`}
                title="Resume Preview"
                className="w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                No Resume Uploaded
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default ApplicantDetailPage;