import React, { useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import Job from "@/components/student/jobs/Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedJobs } from "@/redux/slices/jobSlice";
import { getFilteredJobsApi } from "@/services/jobApi";
import { useLocation, useNavigate } from "react-router-dom";
import { setLoading } from "@/redux/slices/authslice";
import Footer from "@/components/shared/Footer";
import { getAppliedJobsApi } from "@/services/applicationApi";
import { setAppliedJobs } from "@/redux/slices/jobSlice";

const Browse = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchedJobs, } = useSelector((state) => state.job);

  //get keyword from url
  const keyword = new URLSearchParams(location.search).get("keyword");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        dispatch(setLoading(true));
        const data = await getFilteredJobsApi({ keyword });
        dispatch(setSearchedJobs(data.jobs));
      } catch (error) {
        console.log(error);
      }
      finally {
        dispatch(setLoading(false));
      };

    };

    if (keyword) fetchJobs();
  }, [keyword,dispatch]);

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
  }, [dispatch]);

  return (
    <>
      <div className="min-h-screen overflow-hidden relative">

        <Navbar />

        {/* Background Blur */}
        <div className="absolute top-[-120px] left-[-80px] h-[320px] w-[320px] rounded-full bg-[#eef4ff] blur-3xl opacity-70" />

        <div className="absolute right-[-100px] top-[120px] h-[280px] w-[280px] rounded-full bg-[#fff4db] blur-3xl opacity-70" />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-16 relative z-10">

          {/* HERO SECTION */}
          <div
            className="
        relative overflow-hidden
        rounded-[40px]
        bg-[#f8fbff]
        backdrop-blur-xl
        border border-white/60
        shadow-[0_10px_40px_rgba(0,0,0,0.05)]
        px-6 sm:px-10 py-14
        mb-12
        "
          >

            {/* Content */}
            <div className="relative z-10">

              {/* Top Row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

                {/* Left */}
                <div>

                  {/* Badge */}
                  <div
                    className="
                inline-flex items-center
                rounded-full
                bg-white
                px-4 py-2
                shadow-sm
                border border-white/60
                mb-5
                "
                  >
                    <span className="text-sm font-medium text-gray-700">
                      🔍 Search Results
                    </span>
                  </div>

                  {/* Heading */}
                  <h1
                    className="
                text-4xl sm:text-5xl
                font-extrabold
                tracking-tight
                text-gray-900
                leading-tight
                "
                  >
                    Results for{" "}

                    <span
                      className="
                  bg-gradient-to-r
                  from-blue-600 to-violet-500
                  bg-clip-text text-transparent
                  "
                    >
                      "{keyword}"
                    </span>

                  </h1>

                  {/* Subtitle */}
                  <p className="text-gray-600 mt-4 text-base sm:text-lg leading-7">

                    Found{" "}

                    <span className="font-semibold text-gray-900">
                      {searchedJobs?.length}
                    </span>{" "}

                    matching opportunities for your search.

                  </p>

                </div>

                {/* Right */}
                <button
                  onClick={() => navigate("/")}
                  className="
              h-12 px-6
              rounded-2xl
              bg-black
              hover:bg-gray-900
              text-white
              text-sm font-medium
              shadow-md
              transition-all duration-300
              hover:scale-[1.02]
              "
                >
                  ← Back
                </button>

              </div>

            </div>

          </div>

          {/* Empty State */}
          {!searchedJobs || searchedJobs.length === 0 ? (

            <div
              className="
          rounded-[36px]
          bg-white/70
          backdrop-blur-xl
          border border-white/60
          shadow-[0_10px_40px_rgba(0,0,0,0.05)]
          py-24 px-6
          flex flex-col items-center justify-center text-center
          "
            >

              <div
                className="
            h-24 w-24
            rounded-full
            bg-[#eef4ff]
            flex items-center justify-center
            text-4xl
            mb-6
            "
              >
                🔎
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                No jobs found
              </h2>

              <p className="text-gray-500 max-w-md leading-7">
                Try changing your keywords or search terms
                to discover more opportunities.
              </p>

            </div>

          ) : (

            /* Jobs Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

              {searchedJobs.map((job) => (
                <Job key={job._id} job={job} />
              ))}

            </div>

          )}

        </main>

      </div>

      <Footer />

    </>
  );
};

export default Browse;