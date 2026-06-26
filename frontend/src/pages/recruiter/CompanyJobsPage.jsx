import { setAllAdminJobs } from "@/redux/slices/companiesSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MapPin, IndianRupee, Calendar} from "lucide-react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { MoreVertical } from "lucide-react";
import { Pencil,} from "lucide-react";
import { getAdminJobStatus } from "@/services/applicationApi";
import { searchJobApi } from "@/services/jobApi";
import { Button } from "@/components/ui/button";
import Footer from "@/components/shared/Footer";
const CompanyJobsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [search, setSearch] = useState("")
    const [debounceSearch, setDebounceSearch] = useState("")
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const jobs = useSelector((state) => state.company.allAdminJobs);

    useEffect(() => {

        const fetchJobs = async () => {

            try {
                setLoading(true);
                let data;

                if (debounceSearch) {
                    data = await searchJobApi(
                        debounceSearch,
                        page
                    );

                } else {

                    data = await getAdminJobStatus(page);
                }

                dispatch(setAllAdminJobs(data));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        };

        fetchJobs();

    }, [page, debounceSearch,dispatch]);

    useEffect(() => {

        const timer = setTimeout(() => {
            setDebounceSearch(search);
            setPage(1);
        }, 500);

        return () => clearTimeout(timer);

    }, [search]);
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">

                <div className="flex flex-col items-center gap-4">

                    <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />

                    <p className="text-sm text-gray-500">
                        Loading jobs...
                    </p>

                </div>

            </div>
        );
    }
    return (
     <>
  <div className="min-h-screen bg-[#f8fbff] overflow-hidden relative pt-24">

    {/* Background Blur */}
    <div className="absolute top-[-120px] left-[-80px] h-[320px] w-[320px] rounded-full bg-[#eef4ff] blur-3xl opacity-70" />

    <div className="absolute right-[-120px] top-[120px] h-[280px] w-[280px] rounded-full bg-[#fff4db] blur-3xl opacity-70" />

    <div className="max-w-6xl mx-auto px-6 py-10 relative z-10">

      {/* TOP BAR */}
      <div
        className="
        flex flex-col lg:flex-row
        lg:items-center lg:justify-between
        gap-5
        mb-8
        "
      >

        {/* Left */}
        <div>

          <div
            className="
            inline-flex items-center
            rounded-full
            bg-[#eef4ff]
            px-4 py-2
            text-sm font-medium text-blue-700
            mb-4
            "
          >
            💼 Job Management
          </div>

          <h1
            className="
            text-4xl sm:text-5xl
            font-extrabold
            tracking-tight
            text-gray-900
            "
          >
            Manage Jobs
          </h1>

          <p className="mt-3 text-gray-600 leading-7">
            Track, manage and monitor all job postings.
          </p>

        </div>

        {/* Right */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

          {/* Search */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search jobs, companies..."
            className="
            h-12 w-full sm:w-80
            rounded-2xl
            border-0
            bg-white
            px-5
            shadow-sm
            focus:outline-none
            focus:ring-2 focus:ring-blue-200
            "
          />

          {/* New Job */}
          <button
            onClick={() => navigate("/admin/job/create")}
            className="
            h-12 px-6
            rounded-2xl
            bg-gradient-to-r from-blue-600 to-violet-600
            hover:from-blue-700 hover:to-violet-700
            text-white
            text-sm font-medium
            shadow-[0_10px_25px_rgba(59,130,246,0.25)]
            transition-all duration-300
            hover:-translate-y-0.5
            "
          >
            New Job
          </button>

        </div>

      </div>

      {/* JOBS LIST */}
      <div className="space-y-5">

        {jobs?.jobs?.length === 0 ? (

          <div
            className="
            rounded-[36px]
            border border-white/60
            bg-white/80
            backdrop-blur-xl
            shadow-[0_10px_40px_rgba(0,0,0,0.05)]
            py-24 px-6
            flex flex-col items-center text-center
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
              💼
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              No Jobs Found
            </h2>

            <p className="text-gray-500 mb-8 max-w-md leading-7">
              You haven&apos;t posted any jobs yet.
            </p>

            <Button
              onClick={() => navigate("/admin/job/create")}
              className="
              h-12 px-6
              rounded-2xl
              bg-black hover:bg-gray-900
              text-white
              "
            >
              Create Job
            </Button>

          </div>

        ) : (

          jobs?.jobs?.map((job) => (

            <div
              key={job._id}
              className="
              rounded-[32px]
              border border-white/60
              bg-white/80
              backdrop-blur-xl
              shadow-[0_10px_35px_rgba(0,0,0,0.04)]
              p-6 sm:p-7
              transition-all duration-300
              hover:shadow-[0_15px_45px_rgba(0,0,0,0.06)]
              "
            >

              <div
                className="
                flex flex-col xl:flex-row
                xl:items-center xl:justify-between
                gap-8
                "
              >

                {/* LEFT */}
                <div className="flex-1 min-w-0">

                  {/* Job Title */}
                  <h2
                    className="
                    text-2xl
                    font-bold
                    tracking-tight
                    text-gray-900
                    "
                  >
                    {job.title}
                  </h2>

                  {/* Company */}
                  <p className="text-gray-500 mt-2">
                    {job.company?.name}
                  </p>

                  {/* Meta */}
                  <div
                    className="
                    flex flex-wrap
                    items-center gap-5
                    mt-5
                    text-sm text-gray-500
                    "
                  >

                    <span className="flex items-center gap-2">
                      <MapPin size={15} />
                      {job.location}
                    </span>

                    <span className="flex items-center gap-2">
                      <IndianRupee size={15} />
                      {job.salary}
                    </span>

                    <span className="flex items-center gap-2">
                      <Calendar size={15} />

                      {new Date(job.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}

                    </span>

                  </div>

                </div>

                {/* RIGHT */}
                <div
                  className="
                  flex flex-col lg:flex-row
                  lg:items-center
                  gap-7
                  "
                >

                  {/* Stats */}
                  <div
                    className="
                    flex flex-wrap
                    items-center gap-4
                    "
                  >

                    <div
                      className="
                      rounded-2xl
                      bg-[#eef4ff]
                      px-4 py-3
                      min-w-[85px]
                      "
                    >
                      <p className="text-[11px] text-blue-600 mb-1">
                        Total
                      </p>

                      <p className="font-bold text-blue-700 text-lg">
                        {job.total}
                      </p>
                    </div>

                    <div
                      className="
                      rounded-2xl
                      bg-[#ecfdf3]
                      px-4 py-3
                      min-w-[85px]
                      "
                    >
                      <p className="text-[11px] text-green-600 mb-1">
                        Accepted
                      </p>

                      <p className="font-bold text-green-700 text-lg">
                        {job.accepted}
                      </p>
                    </div>

                    <div
                      className="
                      rounded-2xl
                      bg-[#fff7ed]
                      px-4 py-3
                      min-w-[85px]
                      "
                    >
                      <p className="text-[11px] text-orange-600 mb-1">
                        Pending
                      </p>

                      <p className="font-bold text-orange-700 text-lg">
                        {job.pending}
                      </p>
                    </div>

                    <div
                      className="
                      rounded-2xl
                      bg-[#fef2f2]
                      px-4 py-3
                      min-w-[85px]
                      "
                    >
                      <p className="text-[11px] text-red-600 mb-1">
                        Rejected
                      </p>

                      <p className="font-bold text-red-700 text-lg">
                        {job.rejected}
                      </p>
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">

                    <button
                      onClick={() => navigate(`/admin/job/${job._id}/view`)}
                      className="
                      h-11 px-5
                      rounded-2xl
                      bg-[#eef4ff]
                      hover:bg-blue-100
                      text-sm font-medium text-blue-700
                      transition
                      "
                    >
                      View
                    </button>

                    <button
                      onClick={() => navigate(`/admin/job/${job._id}/applicant`)}
                      className="
                      h-11 px-5
                      rounded-2xl
                      bg-[#f3e8ff]
                      hover:bg-purple-100
                      text-sm font-medium text-purple-700
                      transition
                      "
                    >
                      Applicants
                    </button>

                    {/* More */}
                    <Popover>

                      <PopoverTrigger asChild>

                        <button
                          className="
                          h-11 w-11
                          rounded-2xl
                          bg-white
                          hover:bg-gray-100
                          shadow-sm
                          flex items-center justify-center
                          transition
                          "
                        >
                          <MoreVertical className="text-gray-500 w-4 h-4" />
                        </button>

                      </PopoverTrigger>

                      <PopoverContent
                        align="end"
                        className="
                        w-44 p-2
                        rounded-2xl
                        border-0
                        bg-white
                        shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                        "
                      >

                        <button
                          onClick={() => navigate(`/admin/job/${job._id}/edit`)}
                          className="
                          flex items-center gap-3
                          w-full px-3 py-3
                          text-sm font-medium
                          rounded-xl
                          text-gray-700
                          hover:bg-[#f8fbff]
                          transition
                          "
                        >
                          <Pencil className="w-4 h-4 text-gray-500" />
                          Edit Job
                        </button>

                      </PopoverContent>

                    </Popover>

                  </div>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

      {/* PAGINATION */}
      <div
        className="
        sticky bottom-4
        mt-10
        rounded-[28px]
        border border-white/60
        bg-white/80
        backdrop-blur-xl
        shadow-[0_10px_35px_rgba(0,0,0,0.05)]
        px-6 py-5
        flex flex-col lg:flex-row
        items-center justify-between
        gap-5
        "
      >

        {/* Left */}
        <div className="text-sm text-gray-500">

          Showing page{" "}

          <span className="font-semibold text-gray-900">
            {page}
          </span>{" "}

          of{" "}

          <span className="font-semibold text-gray-900">
            {jobs?.totalPages}
          </span>

        </div>

        {/* Right */}
        <div className="flex items-center gap-2">

          {/* Previous */}
          <button
            disabled={page === 1}
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
            className={`
            h-11 px-5 rounded-2xl
            text-sm font-medium transition-all duration-300

            ${page === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
              }
            `}
          >
            Previous
          </button>

          {/* Pages */}
          <div className="flex items-center gap-2">

            {[...Array(jobs?.totalPages || 1)]?.map((_, index) => {

              const pageNumber = index + 1;

              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`
                  h-11 w-11 rounded-2xl
                  text-sm font-semibold transition-all duration-300

                  ${page === pageNumber
                      ? "bg-black text-white shadow-md"
                      : "bg-white border border-gray-100 text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  {pageNumber}
                </button>
              );
            })}

          </div>

          {/* Next */}
          <button
            disabled={page === jobs?.totalPages}
            onClick={() => {
              if (page < jobs?.totalPages) {
                setPage(page + 1);
              }
            }}
            className={`
            h-11 px-5 rounded-2xl
            text-sm font-medium transition-all duration-300

            ${page === jobs?.totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
              }
            `}
          >
            Next
          </button>

        </div>

      </div>

    </div>

  </div>

  <Footer />

</>
    );
};

export default CompanyJobsPage;