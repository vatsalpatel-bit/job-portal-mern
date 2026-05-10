import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Pencil, Trash2 } from "lucide-react";
import { getAllCompanyApi, searchCompanyApi } from "@/services/companyApi";
import { useDispatch, useSelector } from "react-redux";
import { setAllCompanies } from "@/redux/slices/companiesSlice";
import { Briefcase } from "lucide-react";
import { Users } from "lucide-react";
import Footer from "@/components/shared/Footer";

const Companies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const allCompaies = useSelector((state) => state.company.allCompanies);

  useEffect(() => {

    const fetchCompanies = async () => {

      try {
        setLoading(true);
        let data;
        if (debounceSearch) {
          data = await searchCompanyApi(
            debounceSearch,
            page
          );
        } else {
          data = await getAllCompanyApi(page);
        }
        dispatch(setAllCompanies(data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    };
    fetchCompanies();

  }, [page, debounceSearch]);

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
            Loading companies...
          </p>

        </div>

      </div>
    );
  }
  return (
   <>
  <div className="bg-[#f8fbff] overflow-hidden relative pt-24">

    {/* Background Blur */}
    <div className="absolute top-[-120px] left-[-80px] h-[320px] w-[320px] rounded-full bg-[#eef4ff] blur-3xl opacity-70" />

    <div className="absolute right-[-120px] top-[120px] h-[280px] w-[280px] rounded-full bg-[#fff4db] blur-3xl opacity-70" />

    <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">

      {/* HERO */}
      <div
        className="
        relative overflow-hidden
        rounded-[40px]
        bg-white/70
        backdrop-blur-xl
        border border-white/60
        shadow-[0_10px_40px_rgba(0,0,0,0.05)]
        px-8 sm:px-10 py-10
        mb-10
        "
      >

        {/* Blur */}
        <div className="absolute top-[-100px] right-[-80px] h-[220px] w-[220px] rounded-full bg-[#eef4ff] blur-3xl opacity-70" />

        {/* Content */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

          {/* Left */}
          <div>

            <div
              className="
              inline-flex items-center
              rounded-full
              bg-[#eef4ff]
              px-4 py-2
              text-sm font-medium text-blue-700
              mb-5
              "
            >
              🏢 Company Management
            </div>

            <h1
              className="
              text-4xl sm:text-5xl
              font-extrabold
              tracking-tight
              text-gray-900
              "
            >
              Manage Companies
            </h1>

            <p className="mt-4 text-gray-600 text-base leading-7 max-w-2xl">
              Create, organize and manage recruiter companies
              from one modern dashboard.
            </p>

          </div>

          {/* Right */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

            {/* Search */}
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search companies..."
              className="
              h-12 w-full sm:w-80
              rounded-2xl
              border-0
              bg-white
              px-5
              shadow-sm
              focus-visible:ring-2 focus-visible:ring-blue-200
              "
            />

            {/* Button */}
            <Button
              onClick={() => navigate("/admin/company/create")}
              className="
              h-12 px-6
              rounded-2xl
              bg-gradient-to-r from-blue-600 to-violet-600
              hover:from-blue-700 hover:to-violet-700
              text-white
              shadow-[0_10px_25px_rgba(59,130,246,0.25)]
              transition-all duration-300
              hover:-translate-y-0.5
              "
            >
              New Company
            </Button>

          </div>

        </div>

      </div>

      {/* TABLE CARD */}
      <div
        className="
        overflow-hidden
        rounded-[36px]
        border border-white/60
        bg-white/80
        backdrop-blur-xl
        shadow-[0_10px_40px_rgba(0,0,0,0.05)]
        "
      >

        {/* Header */}
        <div
          className="
          grid grid-cols-[80px_1.5fr_1fr_120px_140px_60px]
          px-8 py-5
          text-xs font-semibold uppercase tracking-wider
          text-gray-500
          bg-[#f8fbff]
          border-b border-gray-100
          "
        >

          <p>Logo</p>
          <p>Name</p>
          <p>Date</p>
          <p>Jobs</p>
          <p>Applicants</p>
          <p className="text-right">Action</p>

        </div>

        {/* Empty State */}
        {allCompaies?.companies?.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-28 text-center">

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
              🏢
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              No Companies Found
            </h2>

            <p className="text-gray-500 mb-7 max-w-md leading-7">
              You haven&apos;t created any company yet.
              Start by adding your first recruiter company.
            </p>

            <Button
              onClick={() => navigate("/admin/company/create")}
              className="
              h-12 px-6
              rounded-2xl
              bg-black hover:bg-gray-900
              text-white
              shadow-md
              "
            >
              Create Company
            </Button>

          </div>

        ) : (

          allCompaies?.companies?.map((company) => (

            <div
              key={company._id}
              onClick={() => navigate(`/admin/company/${company._id}`)}
              className="
              grid grid-cols-[80px_1.5fr_1fr_120px_140px_60px]
              items-center
              px-8 py-5
              hover:bg-[#f8fbff]/70
              transition-all duration-300
              cursor-pointer
              border-b border-gray-100/80
              last:border-none
              "
            >

              {/* Logo */}
              <div
                className="
                h-12 w-12
                rounded-2xl
                bg-[#f8fbff]
                border border-[#edf2ff]
                overflow-hidden
                flex items-center justify-center
                shadow-sm
                "
              >

                <img
                  src={
                    company.logo?.startsWith("http")
                      ? company.logo
                      : "https://via.placeholder.com/40"
                  }
                  alt="logo"
                  className="w-full h-full object-cover"
                />

              </div>

              {/* Name */}
              <div>

                <p className="font-semibold text-gray-900">
                  {company.name}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Company Profile
                </p>

              </div>

              {/* Date */}
              <p className="text-sm text-gray-500">

                {new Date(company.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}

              </p>

              {/* Jobs */}
              <div>

                <span
                  className="
                  inline-flex items-center gap-2
                  rounded-full
                  bg-[#eef4ff]
                  px-3 py-1.5
                  text-xs font-semibold text-blue-700
                  shadow-sm
                  "
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  {company.totalJobs ?? 0}
                </span>

              </div>

              {/* Applicants */}
              <div>

                <span
                  className="
                  inline-flex items-center gap-2
                  rounded-full
                  bg-[#f3e8ff]
                  px-3 py-1.5
                  text-xs font-semibold text-purple-700
                  shadow-sm
                  "
                >
                  <Users className="w-3.5 h-3.5" />
                  {company.totalApplicants ?? 0}
                </span>

              </div>

              {/* Action */}
              <div
                className="flex justify-end"
                onClick={(e) => e.stopPropagation()}
              >

                <Popover>

                  <PopoverTrigger asChild>

                    <button
                      className="
                      h-10 w-10
                      rounded-xl
                      bg-white
                      hover:bg-gray-100
                      shadow-sm
                      flex items-center justify-center
                      transition-all duration-300
                      "
                    >
                      <MoreHorizontal className="text-gray-500 w-4 h-4" />
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
                      onClick={() => navigate(`/admin/company/${company._id}/edit`)}
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
                      Edit Company
                    </button>

                  </PopoverContent>

                </Popover>

              </div>

            </div>

          ))

        )}

        {/* Pagination */}
        <div
          className="
          flex flex-col lg:flex-row
          items-center justify-between
          gap-5
          px-8 py-5
          border-t border-gray-100
          bg-white/60
          backdrop-blur-xl
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
              {allCompaies?.totalPages}
            </span>

          </div>

          {/* Right */}
          <div className="flex items-center gap-2">

            {/* Previous */}
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className={`
              h-11 px-5 rounded-2xl
              text-sm font-medium
              transition-all duration-300

              ${page === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100 shadow-sm"
                }
              `}
            >
              Previous
            </button>

            {/* Pages */}
            <div className="flex items-center gap-2">

              {[...Array(allCompaies?.totalPages)].map((_, index) => {

                const pageNumber = index + 1;

                return (
                  <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    className={`
                    h-11 w-11
                    rounded-2xl
                    text-sm font-semibold
                    transition-all duration-300

                    ${page === pageNumber
                        ? "bg-black text-white shadow-md"
                        : "bg-white hover:bg-gray-100 shadow-sm"
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
              disabled={page === allCompaies?.totalPages}
              onClick={() => setPage(page + 1)}
              className={`
              h-11 px-5 rounded-2xl
              text-sm font-medium
              transition-all duration-300

              ${page === allCompaies?.totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100 shadow-sm"
                }
              `}
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  </div>

  <Footer />

</>
  );
};

export default Companies;