import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

const LatestJobCard = ({ job }) => {
  return (
    <Card
      className="rounded-2xl border border-border/40
      bg-background shadow-sm transition
      hover:shadow-md hover:-translate-y-1 cursor-pointer"
    >
      <CardContent className="p-6 space-y-4">

        {/* Company */}
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-foreground">
            {job.company}
          </h3>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {job.location}
          </div>
        </div>

        {/* Job Title */}
        <div>
          <h4 className="text-base font-semibold text-foreground">
            {job.title}
          </h4>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {job.description}
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 pt-3">
          <Badge className="rounded-full bg-primary/10 text-primary">
            {job.positions} Positions
          </Badge>

          <Badge className="rounded-full bg-orange-500/10 text-orange-600">
            {job.type}
          </Badge>

          <Badge className="rounded-full bg-purple-500/10 text-purple-600">
            {job.salary}
          </Badge>
        </div>

      </CardContent>
    </Card>
  );
};

export default LatestJobCard;
