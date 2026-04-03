import React, { useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import Job from "@/components/jobs/Job";
import { useDispatch, useSelector } from "react-redux";
import {  setSearchedJobs } from "@/redux/slices/jobSlice";
import { getFilteredJobsApi } from "@/services/jobApi";
import { useLocation } from "react-router-dom";
import { setLoading } from "@/redux/slices/authslice";

const Browse = () => {
  const location=useLocation();
  const dispatch = useDispatch();
  const { searchedJobs,loading } = useSelector((state) => state.job);

  //get keyword from url
  const keyword= new URLSearchParams(location.search).get("keyword");
  console.log(keyword);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        dispatch(setLoading(true));
        const data = await getFilteredJobsApi({keyword}); 
        dispatch(setSearchedJobs(data.jobs));
      } catch (error) {
        console.log(error);
      }
      finally{
        dispatch(setLoading(false));
      };
    
    };

   if(keyword) fetchJobs();
  }, [keyword]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Search Results for "{keyword}"
            <span className="text-muted-foreground text-base sm:text-lg ml-2">
              ({searchedJobs?.length})
            </span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Jobs matching your search
          </p>
        </div>

        {!searchedJobs || searchedJobs.length === 0 ? (
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
            {searchedJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Browse;