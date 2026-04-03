
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAppliedJobs} from "@/redux/slices/jobSlice";
import { toast } from "sonner";
import { applyJobApi } from "@/services/applicationApi";

const LatestJobs = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { appliedJobs = [], savedJobs = [] } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);

  const [applied, setApplied] = useState(appliedJobs.includes(job._id));
const [applying, setApplying] = useState(false);

  if (!job) return null;

  const isApplied = appliedJobs.includes(job._id);

  // 💰 Format Salary
  const formatSalary = (amount) => {
    if (!amount) return "Not Disclosed";
    if (amount >= 100000) {
      return `₹ ${(amount / 100000).toFixed(1)} LPA`;
    }
    return `₹ ${amount.toLocaleString()}`;
  };

  // 📅 Posted Time
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

  if (applied) return;

  try {
    setApplying(true);

    await applyJobApi(job._id);

    dispatch(setAppliedJobs([...appliedJobs, job._id]));

    setApplied(true);   // 🔥 this immediately disables button

    toast.success("Applied Successfully");  

  } catch (err) {
    console.log(err);
    toast.error("Application failed");
  } finally {
    setApplying(false);
  }
};

  return (
    <div className="rounded-2xl border bg-background p-6 transition hover:shadow-xl hover:-translate-y-1 duration-200 relative">

      {/* NEW Badge */}
      {isNew && (
        <Badge className="absolute top-4 right-4 bg-green-100 text-green-700 border-green-300">
          New
        </Badge>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11">
            <AvatarImage src={job.company?.logo} />
            <AvatarFallback>
              {job.company?.name?.charAt(0) || "C"}
            </AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-semibold text-base">
              {job.company?.name || "Company"}
            </h3>
            <p className="text-xs text-muted-foreground">
              {job.location}
            </p>
            <p className="text-xs text-muted-foreground">
              {getDaysAgo(job.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {/* TITLE */}
      <h2 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2">
        {job.title}
      </h2>

      <p className="text-sm text-muted-foreground mb-5 line-clamp-3">
        {job.description}
      </p>

      {/* BADGES */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge variant="secondary">
          {job.position} Openings
        </Badge>

        <Badge variant="outline">
          {job.jobType}
        </Badge>

        <Badge variant="outline">
          {job.experienceLevel} Years Exp
        </Badge>

        <Badge className="bg-primary/10 text-primary border-primary/20">
          {formatSalary(job.salary)}
        </Badge>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => navigate(`/job/${job._id}`)}
        >
          Details
        </Button>

        <Button
          className="flex-1 rounded-full"
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

export default LatestJobs;

