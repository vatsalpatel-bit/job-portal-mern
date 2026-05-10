import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getApplicantApi } from "@/services/authApi";
import { useDispatch, useSelector } from "react-redux";
import { changeApplicantStatus, setApplicant } from "@/redux/slices/authslice";
import ResumeViewer from "@/components/resume/ResumeViewer";
import { updateApplicantStatus, updateApplicantStatusByIds } from "@/services/applicationApi";
import Footer from "@/components/shared/Footer";

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
    <>
      <div className="min-h-screen bg-[#f8fbff] overflow-hidden relative pt-24">

        {/* Background Blur */}
        <div className="absolute top-[-120px] left-[-80px] h-[320px] w-[320px] rounded-full bg-[#eef4ff] blur-3xl opacity-70" />

        <div className="absolute right-[-120px] top-[120px] h-[280px] w-[280px] rounded-full bg-[#fff4db] blur-3xl opacity-70" />

        <div className="max-w-6xl mx-auto px-6 py-16 relative z-10 space-y-8">

          {/* HEADER */}
          <div
            className="
        flex flex-col lg:flex-row
        lg:items-start lg:justify-between
        gap-6
        "
          >

            {/* LEFT */}
            <div>

              {/* Back */}
              <button
                onClick={() => navigate(-1)}
                className="
                          inline-flex items-center gap-2
                          rounded-full
                          bg-white/80
                          backdrop-blur-md
                          border border-white/60
                          px-5 py-2
                          text-sm font-medium text-gray-700
                          shadow-sm
                          hover:bg-white
                          transition-all duration-300
                          mb-5
                          "
              >
                <ArrowLeft size={16} />
                Back
              </button>

              {/* Badge */}
              <div
                className="
            rounded-full
            bg-[#eef4ff]
            px-4 py-2
            text-sm font-medium text-blue-700
            mb-5
            "
              >
                👤 Candidate Review
              </div>

              {/* Title */}
              <h1
                className="
            text-4xl sm:text-5xl
            font-extrabold
            tracking-tight
            text-gray-900
            "
              >
                Applicant Details
              </h1>

              <p className="mt-4 text-gray-600 leading-7">
                Review candidate profile and hiring status.
              </p>

            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex flex-wrap items-center gap-3">

              {application?.status === "pending" ? (
                <>
                  <button
                    onClick={() => handleStatus("accepted")}
                    className="
                h-11 px-6
                rounded-2xl
                bg-[#16a34a]
                hover:bg-[#15803d]
                text-white
                text-sm font-medium
                shadow-sm
                transition-all duration-300
                "
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleStatus("rejected")}
                    className="
                h-11 px-6
                rounded-2xl
                bg-[#ef4444]
                hover:bg-[#dc2626]
                text-white
                text-sm font-medium
                shadow-sm
                transition-all duration-300
                "
                  >
                    Reject
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleStatus("pending")}
                  className="
              h-11 px-6
              rounded-2xl
              bg-gray-700
              hover:bg-black
              text-white
              text-sm font-medium
              shadow-sm
              transition-all duration-300
              "
                >
                  Undo Status
                </button>
              )}

            </div>

          </div>

          {/* PROFILE CARD */}
          <div
            className="
        rounded-[36px]
        border border-white/60
        bg-white/80
        backdrop-blur-xl
        shadow-[0_10px_40px_rgba(0,0,0,0.05)]
        p-8 sm:p-10
        "
          >

            <div
              className="
          flex flex-col xl:flex-row
          xl:items-start xl:justify-between
          gap-8
          "
            >

              {/* LEFT */}
              <div className="flex items-start gap-6 flex-1 min-w-0">

                {/* Avatar */}
                <img
                  src={
                    application?.applicant?.profile?.profilePhoto?.startsWith("http")
                      ? application.applicant.profile.profilePhoto
                      : "/default-avatar.png"
                  }
                  alt="profile"
                  className="
              w-24 h-24
              rounded-full
              object-cover
              border-4 border-white
              shadow-sm
              shrink-0
              "
                />

                {/* Info */}
                <div className="flex-1 min-w-0">

                  <h2
                    className="
                text-4xl
                font-extrabold
                tracking-tight
                text-gray-900
                leading-tight
                "
                  >
                    {application?.applicant?.fullname}
                  </h2>

                  <p className="text-gray-500 mt-3">
                    Applied for this position
                  </p>

                  {/* Contact */}
                  <div
                    className="
                flex flex-wrap
                items-center gap-5
                mt-6
                text-sm text-gray-500
                "
                  >

                    <span className="flex items-center gap-2">
                      📧 {application?.applicant?.email}
                    </span>

                    <span className="flex items-center gap-2">
                      📞 +91 {application?.applicant?.phoneNumber}
                    </span>

                  </div>

                </div>

              </div>

              {/* Status */}
              <div>

                {application?.status === "pending" ? (

                  <span
                    className="
                inline-flex items-center
                rounded-full
                bg-[#fff7ed]
                px-5 py-3
                text-sm font-medium text-orange-700
                "
                  >
                    Pending
                  </span>

                ) : application?.status === "rejected" ? (

                  <span
                    className="
                inline-flex items-center
                rounded-full
                bg-[#fef2f2]
                px-5 py-3
                text-sm font-medium text-red-700
                "
                  >
                    Rejected
                  </span>

                ) : (

                  <span
                    className="
                inline-flex items-center
                rounded-full
                bg-[#ecfdf3]
                px-5 py-3
                text-sm font-medium text-green-700
                "
                  >
                    Accepted
                  </span>

                )}

              </div>

            </div>

          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

            {/* LEFT */}
            <div className="space-y-8">

              {/* About */}
              <div
                className="
            rounded-[32px]
            bg-white/80
            backdrop-blur-xl
            shadow-sm
            p-8
            "
              >

                <h3 className="text-2xl font-bold text-gray-900 mb-5">
                  About Candidate
                </h3>

                <p className="text-gray-600 leading-8">
                  {application?.applicant?.profile?.bio ||
                    "No bio added by the applicant."}
                </p>

              </div>

              {/* Resume */}
              <div
                className="
            rounded-[32px]
            bg-white/80
            backdrop-blur-xl
            shadow-sm
            p-8
            "
              >

                {/* Top */}
                <div
                  className="
              flex flex-col lg:flex-row
              lg:items-center lg:justify-between
              gap-5
              mb-7
              "
                >

                  <div>

                    <h3 className="text-2xl font-bold text-gray-900">
                      Resume
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      Preview or download applicant resume
                    </p>

                  </div>

                  {/* Buttons */}
                  {resumeUrl && (

                    <div className="flex flex-wrap items-center gap-3">

                      {/* View */}
                      <a
                        href={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(resumeUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                    h-11 px-5
                    rounded-2xl
                    bg-[#eef4ff]
                    hover:bg-blue-100
                    text-sm font-medium text-blue-700
                    flex items-center
                    transition-all duration-300
                    "
                      >
                        View Full
                      </a>

                      {/* Download */}
                      <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                    h-11 px-5
                    rounded-2xl
                    bg-gradient-to-r from-blue-600 to-violet-600
                    hover:from-blue-700 hover:to-violet-700
                    text-white
                    text-sm font-medium
                    flex items-center
                    shadow-sm
                    transition-all duration-300
                    "
                      >
                        Download
                      </a>

                    </div>

                  )}

                </div>

                {/* Preview */}
                <div
                  className="
              overflow-hidden
              rounded-[24px]
              border border-[#edf2ff]
              bg-[#f8fbff]
              h-[650px]
              "
                >

                  {resumeUrl ? (

                    <iframe
                      src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(resumeUrl)}`}
                      title="Resume Preview"
                      className="w-full h-full"
                    />

                  ) : (

                    <div
                      className="
                  flex items-center justify-center
                  h-full
                  text-gray-400 text-sm
                  "
                    >
                      No Resume Uploaded
                    </div>

                  )}

                </div>

              </div>

            </div>

            {/* RIGHT */}
            <div className="space-y-8">

              {/* Skills */}
              <div
                className="
            rounded-[32px]
            bg-white/80
            backdrop-blur-xl
            shadow-sm
            p-8
            "
              >

                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Skills
                </h3>

                <div className="flex flex-wrap gap-3">

                  {application?.applicant?.profile?.skills?.length > 0 ? (

                    application.applicant.profile.skills.map((skill, index) => (

                      <span
                        key={`${skill}-${index}`}
                        className="
                    rounded-full
                    bg-[#eef4ff]
                    px-4 py-2
                    text-sm font-medium text-blue-700
                    "
                      >
                        {skill}
                      </span>

                    ))

                  ) : (

                    <p className="text-sm text-gray-400">
                      No skills added
                    </p>

                  )}

                </div>

              </div>

              {/* Quick Info */}
              <div
                className="
            rounded-[32px]
            bg-white/80
            shadow-sm
            p-8
            "
              >

                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Candidate Info
                </h3>

                <div className="space-y-5 text-sm">

                  <div>
                    <p className="text-gray-500 mb-2">
                      Email
                    </p>

                    <p className="font-semibold text-gray-900 break-all">
                      {application?.applicant?.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 mb-2">
                      Phone Number
                    </p>

                    <p className="font-semibold text-gray-900">
                      +91 {application?.applicant?.phoneNumber}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 mb-2">
                      Current Status
                    </p>

                    <p className="font-semibold text-gray-900 capitalize">
                      {application?.status}
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </>
  );
};

export default ApplicantDetailPage;