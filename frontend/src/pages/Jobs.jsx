import { useState, useMemo } from "react";
import Navbar from "@/components/shared/Navbar";
import Job from "@/components/jobs/Job";
import FilterCard from "@/components/jobs/FilterCard";

const jobsData = new Array(12).fill(null).map((_, i) => ({
  _id: i,
  company: "Company Name",
  location: ["Navsari", "Vadodara", "Anand"][i % 3],
  title: ["Frontend Developer", "Backend Developer", "Fullstack Developer"][i % 3],
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda eos provident a, dolorem perferendis.",
  positions: 2 + i,
  type: i % 2 === 0 ? "Full Time" : "Part Time",
  salary: i % 2 === 0 ? "5–40k" : "50k–1L",
}));

const Jobs = () => {
  const [filters, setFilters] = useState({
    location: [],
    industry: [],
    salary: [],
  });

  // Filter logic
  const filteredJobs = useMemo(() => {
    return jobsData.filter((job) => {
      const locationMatch =
        filters.location.length === 0 ||
        filters.location.includes(job.location);

      const industryMatch =
        filters.industry.length === 0 ||
        filters.industry.includes(job.title);

      const salaryMatch =
        filters.salary.length === 0 ||
        filters.salary.includes(job.salary);

      return locationMatch && industryMatch && salaryMatch;
    });
  }, [filters]);

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Find Your Next Job
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Browse curated job opportunities from top companies that match your skills.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
          
          {/* Filters */}
          <FilterCard onFilterChange={setFilters} />

          {/* Jobs List */}
          <div
            className="
              h-[calc(100vh-220px)]
              overflow-y-auto
              pr-1
              scrollbar-thin
              scrollbar-thumb-muted
              scrollbar-track-transparent
            "
          >
            {filteredJobs.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center h-full text-center">
                <h2 className="text-xl font-semibold mb-2">
                  No jobs found
                </h2>
                <p className="text-muted-foreground max-w-sm">
                  Try adjusting your filters to see more opportunities.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredJobs.map((job) => (
                  <Job key={job._id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Jobs;
