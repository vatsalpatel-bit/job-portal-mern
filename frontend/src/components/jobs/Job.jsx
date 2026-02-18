import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const jobId="vp13";

  if (!job) return null;

  return (
    <div
      onClick={() => navigate(`/jobs/${job._id}`)}
      className="group cursor-pointer rounded-2xl border bg-background p-6
      transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11">
            <AvatarImage src={job.companyLogo} />
            <AvatarFallback>
              {job.company?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-semibold text-base">
              {job.company}
            </h3>
            <p className="text-xs text-muted-foreground">
              {job.location} • {job.createdAt || "2 days ago"}
            </p>
          </div>
        </div>

        {/* Bookmark */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSaved(!saved);
          }}
          className="rounded-full p-2 hover:bg-muted"
        >
          <Bookmark
            className={`w-5 h-5 ${
              saved ? "fill-primary text-primary" : "text-muted-foreground"
            }`}
          />
        </button>
      </div>

      {/* Title */}
      <h2 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2">
        {job.title}
      </h2>

      <p className="text-sm text-muted-foreground mb-5 line-clamp-3">
        {job.description}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge variant="secondary">
          {job.positions} Openings
        </Badge>

        <Badge variant="outline">
          {job.type}
        </Badge>

        <Badge className="bg-primary/10 text-primary border-primary/20">
          ₹ {job.salary}
        </Badge>
      </div>

      {/* Actions */}
      <div
        className="flex gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => navigate(`/description/${jobId}`)}
        >
          Details
        </Button>

        <Button className="flex-1 rounded-full">
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default Job;
