import LatestJobCard from "../jobs/LatestJobCard";

const jobs = Array.from({ length: 6 }).map(() => ({
  company: "Company Name",
  location: "India",
  title: "Job Title",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet.",
  positions: 12,
  type: "Part Time",
  salary: "24 LPA",
}));

const LatestJobs = () => {
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
          {jobs.map((job, index) => (
            <LatestJobCard key={index} job={job} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default LatestJobs;
