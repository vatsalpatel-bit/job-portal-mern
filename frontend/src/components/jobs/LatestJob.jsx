import { useSelector } from "react-redux";
import LatestJobCard from "../jobs/LatestJobCard";

const LatestJobs = () => {
  const { allJobs } = useSelector((state) => state.job);
// const allJobs=""
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
          {allJobs?.length === 0 ? (
            
            <div className="flex flex-col items-center justify-center py-24 text-center ml-auto mr-auto col-start-1 col-end-6">

              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                No Jobs Available
              </h2>

              <p className="text-sm text-gray-500">
                There are currently no job openings available.
              </p>

            </div>

          ) : (

            allJobs?.slice(0, 6).map((job) => (
              <LatestJobCard key={job._id} job={job} />
            )))}
        </div>

      </div>
    </section>
  );
};

export default LatestJobs;
