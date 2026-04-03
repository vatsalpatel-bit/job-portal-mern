import { useSelector } from "react-redux";
import LatestJobCard from "../jobs/LatestJobCard";

const LatestJobs = () => {
  const { allJobs } = useSelector((state) => state.job);

  return (
    <section className="w-full bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-foreground">
            Latest & Top{" "}
            <span className="text-primary">Job Openings</span>
          </h2>
          <p className="mt-2 text-muted-foreground max-w-xl">
            Discover the best opportunities from top companies hiring right now
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-8">
          {allJobs?.slice(0, 6).map((job) => (
            <LatestJobCard key={job._id} job={job} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default LatestJobs;
