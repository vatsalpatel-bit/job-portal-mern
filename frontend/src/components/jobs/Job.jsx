import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAppliedJobs } from "@/redux/slices/jobSlice";
import { toast } from "sonner";
import { applyJobApi } from "@/services/applicationApi";


const Job = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { appliedJobs = [] } = useSelector((state) => state.job);
  const [applying, setApplying] = useState(false);

  if (!job) return null;

  const isApplied = appliedJobs?.some(
    (id) => id.toString() === job._id.toString()
  );
  // console.log(job._id)
  // console.log(appliedJobs)
  // console.log(isApplied)

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

      const res = await applyJobApi(job._id);

      dispatch(setAppliedJobs([...appliedJobs, job._id]));
      toast.success("Applied Successfully ✅");

    } catch (error) {

      if (error?.response?.status === 400) {
        toast.error("You already applied for this job");
      } else {
        toast.error("Application failed");
      }

    } finally {
      setApplying(false);
    }

  };

  return (
    <div className="rounded-3xl bg-[#f8fbff] p-6 sm:p-7 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">

      {/* NEW Badge */}
      {isNew && (
        <Badge className="absolute top-5 right-5 bg-[#effff7] text-green-700 border-0 rounded-full px-3 py-1 font-medium shadow-sm">
          New
        </Badge>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 shadow-sm ring-4 ring-white">
            <AvatarImage src={job.company?.logo} />
            <AvatarFallback className="bg-[#f7efff] text-gray-700 font-semibold">
              {job.company?.name?.charAt(0) || "C"}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <h3 className="font-semibold text-[15px] sm:text-base text-gray-900 tracking-tight">
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

      {/* TITLE */}
      <h2 className="text-xl sm:text-[22px] font-bold text-gray-900 leading-snug mb-3 line-clamp-2">
        {job.title}
      </h2>

      {/* DESCRIPTION */}
      <p className="text-sm leading-6 text-gray-600 mb-6 line-clamp-3">
        {job.description}
      </p>

      {/* BADGES */}
      <div className="flex flex-wrap gap-3 mb-7">

        <Badge className="bg-[#f7efff] text-purple-700 border-0 rounded-full px-4 py-1.5 font-medium shadow-sm">
          {job.position} Openings
        </Badge>

        <Badge className="bg-[#fef5ec] text-orange-700 border-0 rounded-full px-4 py-1.5 font-medium shadow-sm">
          {job.jobType}
        </Badge>

        <Badge className="bg-[#effff7] text-green-700 border-0 rounded-full px-4 py-1.5 font-medium shadow-sm">
          {job.experienceLevel} Years Exp
        </Badge>

        <Badge className="bg-white text-gray-800 border-0 rounded-full px-4 py-1.5 font-semibold shadow-sm">
          {formatSalary(job.salary)}
        </Badge>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4">

        <Button
          variant="outline"
          className="flex-1 rounded-2xl border-0 bg-white hover:bg-gray-100 text-gray-800 shadow-sm h-11 font-medium"
          onClick={() => navigate(`/job/${job._id}`)}
        >
          Details
        </Button>

        <Button
          className="flex-1 rounded-2xl bg-black hover:bg-gray-900 text-white h-11 font-medium shadow-md"
          disabled={isApplied || applying}
          onClick={handleApply}
        >
          {applying
            ? "Applying..."
            : isApplied
              ? "Already Applied"
              : "Apply Now"}
        </Button>
      </div>
    </div>
  );
};

export default Job;

