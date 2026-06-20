
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAppliedJobs } from "@/redux/slices/jobSlice";
import { toast } from "sonner";
import { applyJobApi } from "@/services/applicationApi";

const LatestJobs = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { appliedJobs = [] } = useSelector((state) => state.job);
  const user = useSelector((state) => state.auth.user);
  const [applying, setApplying] = useState(false);


  if (!job) return null;

  const isApplied = appliedJobs?.some(
    (id) => id.toString() === job._id.toString()
  );

  //  Format Salary
  const formatSalary = (amount) => {
    if (!amount) return "Not Disclosed";
    if (amount >= 100000) {
      return `₹ ${(amount / 100000).toFixed(1)} LPA`;
    }
    return `₹ ${amount.toLocaleString()}`;
  };

  //  Posted Time
  const getDaysAgo = (date) => {
    if (!date) return "";
    const diff = Math.floor(
      (new Date() - new Date(date)) / (1000 * 60 * 60 * 24)
    );

    if (diff === 0) return "Posted Today";
    if (diff === 1) return "Posted 1 day ago";
    return `Posted ${diff} days ago`;
  };

  const isNew =
    job.createdAt &&
    (new Date() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24) <= 3;

  const handleApply = async (e) => {
    e.stopPropagation();

    if (isApplied) return;

    try {
      setApplying(true);

      await applyJobApi(job._id);

      dispatch(setAppliedJobs([...appliedJobs, job._id]));

      toast.success("Applied Successfully");

    } catch (err) {
      console.log(err);
      toast.error("Application failed");
    } finally {
      setApplying(false);
    }
  };

  const handleUser = () => {
    navigate("/login");
    toast.error("First login to apply for jobs")
  }

  return (
    <div
      className="
  group relative overflow-hidden
  rounded-[30px]
  bg-[#f8fbff]
  border border-[#e8eefc]
  p-5
  shadow-[0_4px_25px_rgba(0,0,0,0.04)]
  transition-all duration-300
  hover:-translate-y-1.5
  hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]
  "
    >

      {/* Top Gradient Blur */}
      <div
        className="
    absolute top-0 right-0 h-28 w-28
    rounded-full bg-[#eef4ff]
    blur-3xl opacity-70
    "
      />

      {/* NEW Badge */}
      {isNew && (
        <Badge
          className="
      absolute top-5 right-5
      rounded-full border-0
      bg-[#ecfdf3]
      text-green-700
      px-3 py-1
      font-medium
      shadow-sm
      "
        >
          New
        </Badge>
      )}

      {/* HEADER */}
      <div className="relative flex justify-between items-start mb-5">

        <div className="flex items-center gap-4">

          <Avatar
            className="
        h-12 w-12
        ring-4 ring-white
        shadow-sm
        "
          >
            <AvatarImage src={job.company?.logo} />

            <AvatarFallback
              className="
          bg-[#eef4ff]
          text-gray-700
          font-semibold
          "
            >
              {job.company?.name?.charAt(0) || "C"}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">

            <h3
              className="
          font-semibold text-[15px]
          text-gray-900 tracking-tight
          "
            >
              {job.company?.name || "Company"}
            </h3>

            <p className="text-xs text-gray-500 font-medium">
              {job.location}
            </p>

            <p className="text-xs text-gray-400">
              {getDaysAgo(job.createdAt)}
            </p>

          </div>

        </div>

      </div>

      {/* Separator */}
      <div className="mb-5 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* TITLE */}
      <h2
        className="
    text-xl
    font-bold
    text-gray-900
    leading-snug
    mb-3
    line-clamp-2
    "
      >
        {job.title}
      </h2>

      {/* DESCRIPTION */}
      <p
        className="
    text-sm
    leading-7
    text-gray-600
    mb-6
    line-clamp-3
    "
      >
        {job.description}
      </p>

      {/* BADGES */}
      <div className="flex flex-wrap gap-3 mb-7">

        <Badge
          className="
      rounded-full border-0
      bg-[#f3e8ff]
      text-purple-700
      px-4 py-1.5
      font-medium
      shadow-sm
      "
        >
          {job.position} Openings
        </Badge>

        <Badge
          className="
      rounded-full border-0
      bg-[#fff4db]
      text-orange-700
      px-4 py-1.5
      font-medium
      shadow-sm
      "
        >
          {job.jobType}
        </Badge>

        <Badge
          className="
      rounded-full border-0
      bg-[#ecfdf3]
      text-green-700
      px-4 py-1.5
      font-medium
      shadow-sm
      "
        >
          {job.experienceLevel} Years Exp
        </Badge>

        <Badge
          className="
      rounded-full border-0
      bg-[#eef4ff]
      text-blue-700
      px-4 py-1.5
      font-semibold
      shadow-sm
      "
        >
          {formatSalary(job.salary)}
        </Badge>

      </div>

      {/* ACTIONS */}
      <div className="flex gap-3">

        <Button
          variant="outline"
          className="
      flex-1 h-11
      rounded-2xl
      border-0
      bg-[#f1f6ff]
      hover:bg-gray-100
      text-gray-800
      font-medium
      shadow-sm
      "
          onClick={() => navigate(`/job/${job._id}`)}
        >
          Details
        </Button>

        {user?.role ? (<Button
          className="
      flex-1 h-11
      rounded-2xl
      bg-black
      hover:bg-gray-900
      text-white
      font-medium
      shadow-md
      "
          disabled={isApplied || applying}
          onClick={handleApply}
        >
          {applying
            ? "Applying..."
            : isApplied
              ? "Already Applied"
              : "Apply Now"}
        </Button>) : (<Button
          className="
      flex-1 h-11
      rounded-2xl
      bg-black
      hover:bg-gray-900
      text-white
      font-medium
      shadow-md
      "
          onClick={handleUser}
        // onClick={handleApply}
        >
          Apply Now
        </Button>
        )}



      </div>

    </div>
  );
};

export default LatestJobs;

