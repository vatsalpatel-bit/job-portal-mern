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
    console.log(data)
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

      <div className="min-h-screen bg-gray-50 pt-20 pb-12">

        <div className="max-w-5xl mx-auto px-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-black text-shadow-neutral-950 text-xl mb-2.5 "
          >
            ← Back
          </button>

          {/* OUTER LAYER */}
          <div className="bg-white border rounded-3xl shadow-sm p-10">

            {/* Top Section */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">

              {/* Left */}
              <div className="flex-1">

                {/* Company */}
                <div className="flex items-center gap-4 mb-6">

                  <div className="w-14 h-14 rounded-2xl border bg-white overflow-hidden flex items-center justify-center">
                    <img
                      src={job?.company?.logo}
                      alt="logo"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {job?.company?.name}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {job?.location}
                    </p>
                  </div>

                </div>

                {/* Job Title */}
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 leading-tight">
                  {job?.title}
                </h1>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-3 mt-6">

                  <span className="px-4 py-1.5 rounded-full bg-gray-100 text-sm font-medium text-gray-700">
                    {job?.position} Positions
                  </span>

                  <span className="px-4 py-1.5 rounded-full bg-orange-50 text-sm font-medium text-orange-700">
                    {job?.jobType}
                  </span>

                  <span className="px-4 py-1.5 rounded-full bg-purple-50 text-sm font-medium text-purple-700">
                    ₹ {job?.salary}
                  </span>

                  <span className="text-sm text-gray-500">
                    {job?.experienceLevel} Years Experience
                  </span>

                </div>

              </div>

              {/* Right */}
              <div className="flex flex-col items-end gap-3">

                <div className="flex items-center gap-3">

                  {/* Apply */}
                  <Button
                    disabled={isApplied}
                    onClick={handleApply}
                    className={`h-12 px-8 rounded-xl text-sm font-medium
      ${isApplied
                        ? "bg-gray-300 hover:bg-gray-300 text-gray-600"
                        : "bg-black hover:bg-gray-800 text-white"
                      }`}
                  >
                    {isApplied ? "Already Applied" : "Apply Now"}
                  </Button>

                  {/* Undo */}
                  {isApplied && (
                    <Button
                      variant="outline"
                      onClick={handleUndo}
                      className="h-12 px-6 rounded-xl text-sm font-medium"
                    >
                      Undo
                    </Button>
                  )}

                </div>
                <p className="text-sm text-gray-400">
                  Posted{" "}
                  {new Date(job?.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

              </div>

            </div>

            {/* Divider */}
            <div className="my-10 h-px bg-gray-200" />

            {/* Description */}
            <div>

              <h2 className="text-xl font-semibold text-gray-900 mb-5">
                Job Description
              </h2>

              <p className="text-[15px] leading-8 text-gray-600">
                {job?.description}
              </p>

            </div>

            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 mt-10">

              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Role
                </p>

                <h3 className="font-medium text-gray-900">
                  {job?.title}
                </h3>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Location
                </p>

                <h3 className="font-medium text-gray-900">
                  {job?.location}
                </h3>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Experience
                </p>

                <h3 className="font-medium text-gray-900">
                  {job?.experienceLevel} Years
                </h3>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Salary
                </p>

                <h3 className="font-medium text-gray-900">
                  ₹ {job?.salary}
                </h3>
              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default DetailPage;