import { useEffect, useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById } from "@/services/jobApi";
import { applyJobApi, undoApplicationApi } from "@/services/applicationApi";
import { useSelector, useDispatch } from "react-redux";
import { setAppliedJobs } from "@/redux/slices/jobSlice";
import { toast } from "sonner";
import Footer from "@/components/shared/Footer";
import { getAppliedJobsApi } from "@/services/applicationApi";


const DetailPage = () => {
  const { id } = useParams(); // get id from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const { appliedJobs = [] } = useSelector((state) => state.job);

  const isApplied = appliedJobs.some(
    (jobId) => jobId.toString() === id.toString()
  );

  const handleApply = async () => {
    if (isApplied) return;

    try {
      const res = await applyJobApi(id);

      dispatch(setAppliedJobs([...appliedJobs, job._id]));

      toast.success(res.message || "Applied Successfully");

    } catch (error) {
      const message = error?.response?.data?.message;

      if (message === "You already applied for this job") {
        dispatch(setAppliedJobs([...appliedJobs, job._id]));
      }

      toast.error(message || "Application failed");
    }
  };

  const handleUndo = async () => {
    const data = await undoApplicationApi(id);
    dispatch(
      setAppliedJobs(
        appliedJobs.filter(
          (jobId) =>
            jobId.toString() !== id.toString()
        )
      )
    );
  }
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await getJobById(id);
        setJob(res.data.job);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await getAppliedJobsApi();
        const jobIds = res.applications.map(
          (app) => app.job._id || app.job
        );

        dispatch(setAppliedJobs(jobIds));

      } catch (error) {
        console.log(error);
      }
    };

    fetchAppliedJobs();
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="p-10 text-center">Loading job...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f8fbff] pt-28 pb-16 overflow-hidden relative">

        {/* Background Blur */}
        <div className="absolute top-[-120px] left-[-80px] h-[320px] w-[320px] rounded-full bg-[#eef4ff] blur-3xl opacity-70" />

        <div className="absolute right-[-120px] top-[80px] h-[280px] w-[280px] rounded-full bg-[#fff4db] blur-3xl opacity-70" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="
        mb-6
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
        "
          >
            ← Back
          </button>

          {/* Main Card */}
          <div
            className="
        rounded-[36px]
        border border-white/60
        bg-white/80
        backdrop-blur-xl
        shadow-[0_10px_40px_rgba(0,0,0,0.05)]
        p-8 sm:p-10 lg:p-12
        "
          >

            {/* TOP */}
            <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-10">

              {/* LEFT */}
              <div className="flex-1">

                {/* Company */}
                <div className="flex items-center gap-5 mb-8">

                  <div
                    className="
                w-16 h-16
                rounded-3xl
                bg-[#f8fbff]
                border border-[#edf2ff]
                overflow-hidden
                flex items-center justify-center
                shadow-sm
                "
                  >
                    <img
                      src={job?.company?.logo}
                      alt="logo"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>

                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                      {job?.company?.name}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {job?.location}
                    </p>

                  </div>

                </div>

                {/* Title */}
                <h1
                  className="
              text-4xl sm:text-5xl
              font-extrabold
              tracking-tight
              text-gray-900
              leading-[1.1]
              max-w-3xl
              "
                >
                  {job?.title}
                </h1>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-3 mt-8">

                  <span
                    className="
                px-4 py-2 rounded-full
                bg-[#eef4ff]
                text-sm font-medium text-blue-700
                shadow-sm
                "
                  >
                    {job?.position} Positions
                  </span>

                  <span
                    className="
                px-4 py-2 rounded-full
                bg-[#fff4db]
                text-sm font-medium text-orange-700
                shadow-sm
                "
                  >
                    {job?.jobType}
                  </span>

                  <span
                    className="
                px-4 py-2 rounded-full
                bg-[#f3e8ff]
                text-sm font-medium text-purple-700
                shadow-sm
                "
                  >
                    ₹ {job?.salary}
                  </span>

                  <span
                    className="
                px-4 py-2 rounded-full
                bg-[#ecfdf3]
                text-sm font-medium text-green-700
                shadow-sm
                "
                  >
                    {job?.experienceLevel} Years Experience
                  </span>

                </div>

              </div>

              {/* RIGHT */}
              <div
                className="
            xl:min-w-[260px]
            rounded-3xl
            bg-[#f8fbff]
            border border-[#edf2ff]
            p-6
            shadow-sm
            "
              >

                <div className="flex flex-col gap-4">

                  {/* Apply */}
                  <Button
                    disabled={isApplied}
                    onClick={handleApply}
                    className={`
                h-12 rounded-2xl text-sm font-medium shadow-md
                ${isApplied
                        ? "bg-gray-300 hover:bg-gray-300 text-gray-600"
                        : "bg-black hover:bg-gray-900 text-white"
                      }
                `}
                  >
                    {isApplied ? "Already Applied" : "Apply Now"}
                  </Button>

                  {/* Undo */}
                  {isApplied && (
                    <Button
                      variant="outline"
                      onClick={handleUndo}
                      className="
                  h-12 rounded-2xl
                  border-0
                  bg-white
                  hover:bg-gray-100
                  text-sm font-medium
                  shadow-sm
                  "
                    >
                      Undo Application
                    </Button>
                  )}

                  {/* Date */}
                  <div className="pt-2 text-center">

                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                      Posted On
                    </p>

                    <p className="text-sm font-medium text-gray-700">
                      {new Date(job?.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Divider */}
            <div className="my-12 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* Description */}
            <div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Job Description
              </h2>

              <p className="text-[15px] leading-8 text-gray-600 max-w-4xl">
                {job?.description}
              </p>

            </div>

            {/* Divider */}
            <div className="my-12 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* Details */}
            <div>

              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Job Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                <div className="rounded-3xl bg-[#eef4ff] p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Role
                  </p>

                  <h3 className="font-semibold text-gray-900">
                    {job?.title}
                  </h3>
                </div>

                <div className="rounded-3xl bg-[#fff4db] p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Location
                  </p>

                  <h3 className="font-semibold text-gray-900">
                    {job?.location}
                  </h3>
                </div>

                <div className="rounded-3xl bg-[#f3e8ff] p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Experience
                  </p>

                  <h3 className="font-semibold text-gray-900">
                    {job?.experienceLevel} Years
                  </h3>
                </div>

                <div className="rounded-3xl bg-[#ecfdf3] p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Salary
                  </p>

                  <h3 className="font-semibold text-gray-900">
                    ₹ {job?.salary}
                  </h3>
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

export default DetailPage;