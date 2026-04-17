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
import { Pencil } from "lucide-react";
import { getAllCompanyApi } from "@/services/companyApi";
import { useDispatch, useSelector } from "react-redux";
import { setCompanies } from "@/redux/slices/companiesSlice";

const Companies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");
  const allCompaies = useSelector((state) => state.company.allCompanies);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getAllCompanyApi();
        // console.log(data.companies);
        dispatch(setCompanies(data.companies));
      } catch (error) {
        console.log(error)
      }
    }
    fetchCompanies();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search);
    }, 500);                                         //0.5s delay 
    return () => clearTimeout(timer);
  }, [search]);

  const searchText = debounceSearch.trim().toLowerCase();

  const filterCompanies = allCompaies?.filter((company) => {
    const name = company?.name.toLowerCase() || "";
    return (
      name.includes(searchText)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto px-6 py-10 mt-16">

        {/* 🔝 Top Section */}
        <div className="flex items-center justify-between mb-10">

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

        {/* 📦 Table Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          {/* Header */}
          <div className="grid grid-cols-[80px_1fr_1fr_60px] px-6 py-3 text-xs font-semibold text-gray-500 border-b uppercase tracking-wide">
            <p>Logo</p>
            <p>Name</p>
            <p>Date</p>
            <p className="text-right">Action</p>
          </div>

          {/* Body */}
          {filterCompanies?.map((company) => (
            <div
              key={company._id}
              onClick={() => navigate(`/admin/company/${company._id}`)}
              className="grid grid-cols-[80px_1fr_1fr_60px] items-center px-6 py-4 hover:bg-gray-50 transition cursor-pointer"
            >
              {/* Logo */}
              <img
                src={
                  company.logo && company.logo.startsWith("http")
                    ? company.logo
                    : "https://via.placeholder.com/40"
                }
                alt="logo"
                className="w-10 h-10 rounded-md object-cover border"
              />

              {/* Name */}
              <p className="font-medium text-gray-700">
                {company.name}
              </p>

              {/* Date */}
              <p className="text-sm text-gray-700">
                {new Date(company.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                })}
              </p>

              {/* Action */}
              <div
                className="flex justify-end"
                onClick={(e) => e.stopPropagation()}
              >
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="p-1 rounded-md hover:bg-gray-100 transition">
                      <MoreHorizontal className="text-gray-500" />
                    </button>
                  </PopoverTrigger>

                  <PopoverContent
                    align="end"
                    className="w-32 p-1 rounded-lg shadow-md"
                  >
                    <button
                      onClick={() => navigate(`/admin/company/${company._id}/edit`)}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Companies;