import React from "react";
import Navbar from "@/components/shared/Navbar";
import Job from "@/components/jobs/Job";

const jobsData = new Array(7).fill(null).map((_, i) => ({
  _id: i,
  company: "Company Name",
  location: ["Navsari", "Vadodara", "Anand"][i % 3],
  title: ["Frontend Developer", "Backend Developer", "Fullstack Developer"][i % 3],
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda eos provident a, dolorem perferendis.",
  positions: 2 + i,
  type: i % 2 === 0 ? "Full Time" : "Part Time",
  salary: "5–40k",
}));

const Browse = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Search Results
            <span className="text-muted-foreground text-base sm:text-lg ml-2">
              ({jobsData.length})
            </span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Jobs matching your search
          </p>
        </div>

        {/* Job Cards */}
        {jobsData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <h2 className="text-xl font-semibold mb-2">
              No jobs found
            </h2>
            <p className="text-muted-foreground max-w-sm">
              Try changing your keywords or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobsData.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}

      </main>
    </div>
  );
};

export default Browse;
