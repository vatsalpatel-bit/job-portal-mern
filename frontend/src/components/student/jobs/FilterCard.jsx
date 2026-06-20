import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";

const FilterCard = ({ options, onFilterChange }) => {

  const [filters, setFilters] = useState({
    industry: [],
    salary: [],
  });

  const [open, setOpen] = useState(true);

  // safe parent update
  useEffect(() => {
    onFilterChange?.(filters);
  }, [filters,onFilterChange]);

  const toggleFilter = (type, value) => {
    setFilters((prev) => {
      const updated = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];

      return { ...prev, [type]: updated };
    });
  };

  const clearFilters = () => {
    setFilters({
      industry: [],
      salary: [],
    });
  };
  return (
   <div className="rounded-3xl  bg-white p-5 shadow-sm overflow-hidden  sticky top-24">

      {/* Header */}
      <div className="flex items-center justify-between mb-7 ">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Filter Jobs
          </h1>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setOpen(!open)}
          className="md:hidden rounded-xl hover:bg-white/70"
        >
          <ChevronDown
            className={`h-4 w-4 transition duration-300 ${open ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>

      {open && (
        <div className="space-y-8">

          {/*  Industry */}
          <div className="rounded-2xl  backdrop-blur-sm p-5 shadow-sm bg-[#fffbf7]">
            <h2 className="text-sm font-semibold mb-4 text-gray-700 tracking-wide">
              Industry
            </h2>

            <div className="space-y-3">
              {options?.industries?.map((industry) => (
                <label
                  key={industry}
                  className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer hover:translate-x-1 transition duration-200"
                >
                  <Checkbox
                    checked={filters.industry.includes(industry)}
                    onCheckedChange={() =>
                      toggleFilter("industry", industry)
                    }
                  />

                  <span className="font-medium">
                    {industry}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Salary (Static for now) */}
          <div className="rounded-2xl bg-[#f4fffa] p-5 shadow-sm">
            <h2 className="text-sm font-semibold mb-4 text-gray-700 tracking-wide">
              Salary
            </h2>

            <div className="space-y-3">
              {["0–1L", "1L–2L", "2L–3L", "3L–5L", "5L–10L", "10L–20L", "20L–30L", "30L+"].map((range) => (
                <label
                  key={range}
                  className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer hover:translate-x-1 transition duration-200"
                >
                  <Checkbox
                    checked={filters.salary.includes(range)}
                    onCheckedChange={() =>
                      toggleFilter("salary", range)
                    }
                  />

                  <span className="font-medium">
                    {range}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Clear Button */}
          <Button
            variant="outline"
            className="w-full rounded-2xl border-0 bg-white hover:bg-black hover:text-white text-gray-800 shadow-sm h-11 font-medium transition-all duration-300"
            onClick={clearFilters}
          >
            Clear All Filters
          </Button>

        </div>
      )}
    </div>
  );
};

export default FilterCard;