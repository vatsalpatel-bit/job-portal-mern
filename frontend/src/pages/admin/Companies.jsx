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

const Companies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");
  const [page, setPage] = useState(1);
  const allCompaies = useSelector((state) => state.company.allCompanies);

  useEffect(() => {

    const fetchCompanies = async () => {

      try {

        let data;

        if (debounceSearch) {

          data = await searchCompanyApi(
            // data=await serachJobApi(
            debounceSearch,
            page
          );

        } else {

          data = await getAllCompanyApi(page);
          //        data = await getAdminJobStatus(page);
        }

        dispatch(setAllCompanies(data));
        //      dispatch(setAllAdminJobs(data));
      } catch (error) {
        console.log(error);
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

  return (
    <div className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10 mt-16">

        {/* Top Section */}
        <div className="flex items-center justify-between mb-8">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search companies..."
            className="w-72 bg-white border rounded-lg shadow-sm"
          />

          <Button
            onClick={() => navigate("/admin/company/create")}
            className="bg-black text-white px-5 py-2 rounded-lg shadow-sm hover:bg-black/90"
          >
            New Company
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border">

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">

            {/* Left */}
            <div className="text-sm text-gray-500">
              Showing page{" "}
              <span className="font-semibold text-gray-800">
                {page}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-800">
                {allCompaies?.totalPages}
              </span>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">

              {/* Previous */}
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all
        ${page === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
              >
                Previous
              </button>

              {/* Pages */}
              <div className="flex items-center gap-1">

                {[...Array(allCompaies?.totalPages)].map((_, index) => {
                  const pageNumber = index + 1;

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all
              ${page === pageNumber
                          ? "bg-black text-white shadow-sm"
                          : "bg-white border text-gray-700 hover:bg-gray-100"
                        }`}
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
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all
        ${page === allCompaies?.totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
              >
                Next
              </button>

            </div>
          </div>

          {/* Header */}
          <div className="grid grid-cols-[80px_1.5fr_1fr_120px_140px_60px] px-6 py-3 text-xs font-semibold text-gray-500 border-b uppercase tracking-wide">
            <p>Logo</p>
            <p>Name</p>
            <p>Date</p>
            <p>Jobs</p>
            <p>Applicants</p>
            <p className="text-right">Action</p>
          </div>

          {/* Body */}
          {allCompaies?.companies?.length === 0 ? (

            <div className="flex flex-col items-center justify-center py-24 text-center">

              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                No Companies Found
              </h2>

              <p className="text-sm text-gray-500 mb-6">
                You haven't created any company yet.
              </p>

              <Button
                onClick={() => navigate("/admin/company/create")}
                className="rounded-xl px-5"
              >
                Create Company
              </Button>

            </div>

          ) : (allCompaies?.companies?.map((company) => (
            <div
              key={company._id}
              onClick={() => navigate(`/admin/company/${company._id}`)}
              className="grid grid-cols-[80px_1.5fr_1fr_120px_140px_60px] items-center px-6 py-4 hover:bg-gray-50 transition cursor-pointer border-b last:border-none"
            >
              {/* Logo */}
              <img
                src={
                  company.logo?.startsWith("http")
                    ? company.logo
                    : "https://via.placeholder.com/40"
                }
                alt="logo"
                className="w-10 h-10 rounded-md object-cover border"
              />

              {/* Name */}
              <p className="font-medium text-gray-800">
                {company.name}
              </p>

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
                <span className="inline-flex items-center gap-1 text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                  <Briefcase className="w-3.5 h-3.5" />
                  {company.totalJobs ?? 0}
                </span>
              </div>

              {/* Applicants */}
              <div>
                <span className="inline-flex items-center gap-1 text-xs font-medium bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full">
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
                    <button className="p-2 rounded-md hover:bg-gray-100 transition">
                      <MoreHorizontal className="text-gray-500 w-4 h-4" />
                    </button>
                  </PopoverTrigger>

                  <PopoverContent
                    align="end"
                    className="w-40 p-1 rounded-lg shadow-lg border bg-white"
                  >
                    <button
                      onClick={() => navigate(`/admin/company/${company._id}/edit`)}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
                    >
                      <Pencil className="w-4 h-4 text-gray-500" />
                      Edit
                    </button>

                    <div />


                  </PopoverContent>
                </Popover>

              </div>
            </div>
          )))}
        </div>
      </div>
    </div>
  );
};

export default Companies;