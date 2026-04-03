import { useEffect, useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";
import { getJobById } from "@/services/jobApi";
import { applyJobApi } from "@/services/applicationApi";
import { useSelector, useDispatch } from "react-redux";
import { setAppliedJobs } from "@/redux/slices/jobSlice";


const DetailPage = () => {
  const { id } = useParams(); // get id from URL

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

    dispatch(setAppliedJobs([...appliedJobs,job._id]));

    toast.success(res.message || "Applied Successfully");

  } catch (error) {
    const message = error?.response?.data?.message;

    if (message === "You already applied for this job") {
      dispatch(setAppliedJobs([...appliedJobs,job._id])); // 🔥 sync fix
    }

    toast.error(message || "Application failed");
  }
};
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

      <div className="pt-20 pb-10">
        <div className="mx-auto max-w-5xl px-6">

          {/* HEADER */}
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-2xl font-semibold mb-3">
                {job?.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">
                  {job?.position} Positions
                </Badge>

                <Badge className="bg-orange-100 text-orange-700">
                  {job?.jobType}
                </Badge>

                <Badge className="bg-purple-100 text-purple-700">
                  ₹{job?.salary}
                </Badge>
              </div>
            </div>

            <Button
              disabled={isApplied}
              onClick={handleApply}
              className="rounded-full"
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">
              Job Description
            </h2>

            <div className="h-px bg-muted mb-6" />

            <div className="space-y-3 text-sm">

              <p>
                <span className="font-medium">Role:</span>{" "}
                {job?.title}
              </p>

              <p>
                <span className="font-medium">Location:</span>{" "}
                {job?.location}
              </p>

              <p>
                <span className="font-medium">Description:</span>{" "}
                {job?.description}
              </p>

              <p>
                <span className="font-medium">Experience:</span>{" "}
                {job?.experienceLevel} yrs
              </p>

              <p>
                <span className="font-medium">Salary:</span>{" "}
                ₹{job?.salary}
              </p>

              <p>
                <span className="font-medium">Posted Date:</span>{" "}
                {new Date(job?.createdAt).toLocaleDateString()}
              </p>

            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default DetailPage;