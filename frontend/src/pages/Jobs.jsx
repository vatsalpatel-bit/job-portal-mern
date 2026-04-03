import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "@/components/shared/Navbar";
import Job from "@/components/jobs/Job";
import { useState } from "react";
import { getJobFiltersApi } from "@/services/jobApi";
import FilterCard from "@/components/jobs/FilterCard";
import { getFilteredJobsApi } from "@/services/jobApi";
import { setAllJobs, setJobLoading } from "@/redux/slices/jobSlice";
import { getAppliedJobsApi } from "@/services/applicationApi";
import { setAppliedJobs } from "@/redux/slices/jobSlice";

const Jobs = () => {
  const dispatch = useDispatch();
  const { allJobs, loading } = useSelector((state) => state.job);// jobs come from redux 
  const [filters, setFilters] = useState({
    location: [],
    industry: [],
    salary: []
  });

  const [filterOptions, setFilterOptions] = useState({
    locations: [],
    industries: []
  });

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await getJobFiltersApi();
        setFilterOptions({
          locations: res.data.locations,
          industries: res.data.industries
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchFilters();
  }, []);


  useEffect(() => {
  const fetchAppliedJobs = async () => {
    try {
      const res = await getAppliedJobsApi();

      // ✅ extract job IDs
      const jobIds = res.applications.map(
        (app) => app.job._id || app.job
      );

      dispatch(setAppliedJobs(jobIds));
//  dispatch(setAppliedJobs(res.data.applications));
      // console.log(jobIds);

    } catch (error) {
      console.log(error);
    }
  };

  fetchAppliedJobs();
}, []);

  // Initial load
  useEffect(() => {
    const handleFilterChange = async () => {
      try {
        dispatch(setJobLoading(true));
        const res = await getFilteredJobsApi(filters);
        dispatch(setAllJobs(res.jobs));
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setJobLoading(false));
      }
    };
    handleFilterChange();
  }, [filters]);

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Find Your Next Job
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Browse curated job opportunities from top companies that match your skills.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">

          <FilterCard
            options={filterOptions}
            onFilterChange={setFilters}
          />

          <div className="h-[calc(100vh-220px)] overflow-y-auto pr-1">
            {loading ? (
              <p>Loading jobs...</p>
            ) : !allJobs || allJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <h2 className="text-xl font-semibold mb-2">
                  No jobs found
                </h2>

              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {allJobs.map((job) => (
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