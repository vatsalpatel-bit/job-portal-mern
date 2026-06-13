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
import Footer from "@/components/shared/Footer";

const Jobs = () => {
  const dispatch = useDispatch();
  const { allJobs, loading } = useSelector((state) => state.job);
  const [filters, setFilters] = useState({
    location: [],
    industry: [],
    salary: []
  });
  const [filterOptions, setFilterOptions] = useState({
    industries: []
  });

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await getJobFiltersApi();
        setFilterOptions({
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
        const jobIds = res.applications.map(
          (app) => app.job._id || app.job
        );

        dispatch(setAppliedJobs(jobIds));

      } catch (error) {
        console.log(error);
      }
    };

    fetchAppliedJobs();
  }, []);

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

      <section className="min-h-screen bg-white">


{/* Hero */}
          <div
            className="
  relative overflow-hidden
  mb-16
  bg-[#f8fbff]
  pb-20 pt-48 px-6
  text-center flex items-center flex-col
  "
          >

            {/* Background Blur Shapes */}
            <div
              className="
    absolute top-[-120px] left-[-80px]
    h-[300px] w-[300px]
    rounded-full
    bg-[#eef4ff]
    blur-3xl opacity-70
    "
            />

            <div
              className="
    absolute right-[-80px] top-[20px]
    h-[260px] w-[260px]
    rounded-full
    bg-[#fff4db]
    blur-3xl opacity-70
    "
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center">

              {/* Badge */}
              <div className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-md px-5 py-2 shadow-sm mb-6 border border-white/60">

                <span className="text-sm font-medium text-gray-700">
                  🚀 Discover curated opportunities
                </span>

              </div>

              {/* Heading */}
              <h1
                className="
      text-4xl sm:text-5xl lg:text-6xl
      font-extrabold
      text-gray-900
      leading-tight
      tracking-tight
      max-w-3xl
      "
              >
                Find Your Next{" "}

                <span
                  className="
        bg-gradient-to-r from-blue-600 to-violet-500
        bg-clip-text text-transparent
        "
                >
                  Dream Job
                </span>

              </h1>

              {/* Subtitle */}
              <p
                className="
      mt-6
      text-gray-600
      text-base sm:text-lg
      leading-8
      max-w-2xl
      "
              >
                Browse curated job opportunities from top companies
                that match your skills, experience, and career goals.
              </p>

            </div>

          </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">

          

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-10 items-start">

            {/* Sidebar */}

            <FilterCard
              options={filterOptions}
              onFilterChange={setFilters}
            />


            {/* Jobs Section */}
            <div className="space-y-8">

              {/* Top Bar */}
              {!loading && allJobs?.length > 0 && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Available Jobs
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {allJobs.length} opportunities available
                    </p>
                  </div>

                </div>
              )}

              {/* Loading */}
              {loading ? (
                <div className="min-h-[60vh] flex items-center justify-center">

                  <div className="flex flex-col items-center gap-5">

                    <div className="w-12 h-12 border-[5px] border-black border-t-transparent rounded-full animate-spin" />

                    <p className="text-sm text-gray-500 font-medium">
                      Loading jobs...
                    </p>

                  </div>

                </div>

              ) : !allJobs || allJobs.length === 0 ? (

                /* Empty State */
                <div className="rounded-3xl bg-white/70 backdrop-blur-sm shadow-sm p-12 flex flex-col items-center justify-center text-center min-h-[400px]">

                  <div className="w-20 h-20 rounded-full bg-[#f7efff] flex items-center justify-center mb-6 text-3xl">
                    🔍
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    No jobs found
                  </h2>

                  <p className="text-gray-500 max-w-md leading-7">
                    Try changing your filters or search keywords
                    to discover more opportunities.
                  </p>

                </div>

              ) : (

                /* Jobs Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-2 gap-7">
                  {allJobs.map((job) => (
                    <Job key={job._id} job={job} />
                  ))}
                </div>

              )}

            </div>

          </div>

        </div>

      </section>
      <Footer/>
    </>
  );
};

export default Jobs;  