import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getApplicantsApi, updateApplicantStatus } from '@/services/applicationApi';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicant, updateApplicationStatus } from '@/redux/slices/applicationSlice';
import Footer from '@/components/shared/Footer';

const JobApplicantPage = () => {
  const navigate = useNavigate();
  const { id: jobId } = useParams();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const applicant = useSelector((state) => state.application.allApplicant);
  console.log(applicant);


  const handleStatus = async (id, newStatus) => {
    try {
      await updateApplicantStatus(id, newStatus);
      dispatch(updateApplicationStatus({ id, status: newStatus }))
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const fetchApplicantApi = async () => {
      try {
        setLoading(true)
        const data = await getApplicantsApi(jobId, page);
        // console.log(data)
        dispatch(setAllApplicant(data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }

    };
    fetchApplicantApi();
  }, [jobId, dispatch, page]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">

        <div className="flex flex-col items-center gap-4">

          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />

          <p className="text-sm text-gray-500">
            Loading applicants...
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

        <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">

          {/* HEADER */}
          <div
            className="
        flex flex-col lg:flex-row
        lg:items-center lg:justify-between
        gap-5
        mb-10
        "
          >

            {/* Left */}
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
                👥 Candidate Management
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
                Applicants
              </h1>

              <p className="mt-4 text-gray-600 leading-7">
                Manage candidates and review applications.
              </p>

            </div>

            {/* Right */}
            <div
              className="
          rounded-2xl
          bg-white/80
          backdrop-blur-xl
          px-5 py-4
          shadow-sm
          "
            >

              <p className="text-sm text-gray-500 mb-1">
                Total Applicants
              </p>

              <h2 className="text-3xl font-extrabold text-gray-900">
                {applicant?.job?.application?.length || 0}
              </h2>

            </div>

          </div>

          {/* EMPTY */}
          {applicant?.job?.application?.length === 0 ? (

            <div
              className="
          rounded-[36px]
          border border-white/60
          bg-white/80
          backdrop-blur-xl
          shadow-[0_10px_40px_rgba(0,0,0,0.05)]
          py-24 px-6
          flex flex-col items-center text-center
          "
            >

              <div
                className="
            h-24 w-24
            rounded-full
            bg-[#eef4ff]
            flex items-center justify-center
            text-4xl
            mb-6
            "
              >
                👥
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                No Applicants Yet
              </h2>

              <p className="text-gray-500 leading-7 max-w-md">
                No one has applied for this opportunity yet.
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {applicant?.job?.application?.map((a) => (

                <div
                  key={a?.applicant?._id}
                  className="
              rounded-[30px]
              border border-white/60
              bg-white/80
              backdrop-blur-xl
              shadow-[0_10px_35px_rgba(0,0,0,0.04)]
              p-6 sm:p-7
              transition-all duration-300
              hover:shadow-[0_15px_45px_rgba(0,0,0,0.06)]
              "
                >

                  <div
                    className="
                flex flex-col xl:flex-row
                xl:items-center xl:justify-between
                gap-7
                "
                  >

                    {/* LEFT */}
                    <div className="flex items-start gap-5 flex-1 min-w-0">

                      {/* Avatar */}
                      {a.applicant?.profile?.profilePhoto ? (

                        <img
                          src={a.applicant.profile.profilePhoto}
                          alt="profile"
                          className="
                      w-16 h-16
                      rounded-full
                      object-cover
                      border border-[#edf2ff]
                      shadow-sm
                      shrink-0
                      "
                        />

                      ) : (

                        <div
                          className="
                      w-16 h-16
                      rounded-full
                      bg-[#eef4ff]
                      flex items-center justify-center
                      text-blue-700
                      font-bold text-xl
                      shrink-0
                      "
                        >
                          {a.applicant?.fullname?.[0]}
                        </div>

                      )}

                      {/* Info */}
                      <div className="flex-1 min-w-0">

                        <h3
                          className="
                      text-2xl
                      font-bold
                      tracking-tight
                      text-gray-900
                      "
                        >
                          {a.applicant?.fullname}
                        </h3>

                        <p className="text-gray-500 mt-2">
                          Applied for this position
                        </p>

                        {/* Contact */}
                        <div
                          className="
                      flex flex-wrap
                      items-center gap-5
                      mt-5
                      text-sm text-gray-500
                      "
                        >

                          <span className="flex items-center gap-2">
                            📧 {a.applicant?.email}
                          </span>

                          <span className="flex items-center gap-2">
                            📞 +91 {a.applicant?.phoneNumber}
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* RIGHT */}
                    <div
                      className="
                  flex flex-col lg:flex-row
                  lg:items-center
                  gap-5
                  "
                    >

                      {/* Status */}
                      <div>

                        <span
                          className={`
                      inline-flex items-center
                      rounded-full
                      px-4 py-2
                      text-sm font-medium

                      ${a?.status === "accepted"
                              ? "bg-[#ecfdf3] text-green-700"
                              : a?.status === "rejected"
                                ? "bg-[#fef2f2] text-red-700"
                                : "bg-[#fff7ed] text-orange-700"
                            }
                      `}
                        >

                          {a?.status === "accepted"
                            ? "Accepted"
                            : a?.status === "rejected"
                              ? "Rejected"
                              : "Pending"}

                        </span>

                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-3">

                        {/* View */}
                        <button
                          onClick={() =>
                            navigate(`/applicant/${a.applicant._id}/${jobId}/profile`)
                          }
                          className="
                      h-11 px-5
                      rounded-2xl
                      bg-[#eef4ff]
                      hover:bg-blue-100
                      text-sm font-medium text-blue-700
                      transition-all duration-300
                      "
                        >
                          View
                        </button>

                        {/* Pending */}
                        {a?.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleStatus(a._id, "accepted")}
                              className="
                          h-11 px-5
                          rounded-2xl
                          bg-[#ecfdf3]
                          hover:bg-green-100
                          text-sm font-medium text-green-700
                          transition-all duration-300
                          "
                            >
                              Accept
                            </button>

                            <button
                              onClick={() => handleStatus(a._id, "rejected")}
                              className="
                          h-11 px-5
                          rounded-2xl
                          bg-[#fef2f2]
                          hover:bg-red-100
                          text-sm font-medium text-red-700
                          transition-all duration-300
                          "
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {/* Undo */}
                        {(a?.status === "accepted" ||
                          a?.status === "rejected") && (
                            <button
                              onClick={() => handleStatus(a._id, "pending")}
                              className="
                        h-11 px-5
                        rounded-2xl
                        bg-gray-100
                        hover:bg-gray-200
                        text-sm font-medium text-gray-700
                        transition-all duration-300
                        "
                            >
                              Undo
                            </button>
                          )}

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

          {/* PAGINATION */}
          <div
            className="
        sticky bottom-4
        mt-10
        rounded-[28px]
        border border-white/60
        bg-white/80
        backdrop-blur-xl
        shadow-[0_10px_35px_rgba(0,0,0,0.05)]
        px-6 py-5
        flex flex-col lg:flex-row
        items-center justify-between
        gap-5
        "
          >

            {/* Left */}
            <div className="text-sm text-gray-500">

              Showing page{" "}

              <span className="font-semibold text-gray-900">
                {page}
              </span>{" "}

              of{" "}

              <span className="font-semibold text-gray-900">
                {applicant?.totalPages}
              </span>

            </div>

            {/* Right */}
            <div className="flex items-center gap-2">

              {/* Previous */}
              <button
                disabled={page === 1}
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                  }
                }}
                className={`
            h-11 px-5 rounded-2xl
            text-sm font-medium transition-all duration-300

            ${page === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                  }
            `}
              >
                Previous
              </button>

              {/* Pages */}
              <div className="flex items-center gap-2">

                {[...Array(applicant?.totalPages || 1)].map((_, index) => {

                  const pageNumber = index + 1;

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      className={`
                  h-11 w-11 rounded-2xl
                  text-sm font-semibold transition-all duration-300

                  ${page === pageNumber
                          ? "bg-black text-white shadow-md"
                          : "bg-white border border-gray-100 text-gray-700 hover:bg-gray-100"
                        }
                  `}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

              </div>

              {/* Next */}
              <button
                disabled={page === applicant?.totalPages}
                onClick={() => {
                  if (page < applicant?.totalPages) {
                    setPage(page + 1);
                  }
                }}
                className={`
            h-11 px-5 rounded-2xl
            text-sm font-medium transition-all duration-300

            ${page === applicant?.totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                  }
            `}
              >
                Next
              </button>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </>
  );
};

export default JobApplicantPage;