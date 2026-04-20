import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";

const FilterCard = ({ options, onFilterChange }) => {

  const [filters, setFilters] = useState({
    location: [],
    industry: [],
    salary: [],
  });

  const [open, setOpen] = useState(true);

  //  SAFE parent update
  useEffect(() => {
    onFilterChange?.(filters);
  }, [filters]);

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
      location: [],
      industry: [],
      salary: [],
    });
  };
  return (
    <div className="sticky top-24 rounded-2xl border bg-background p-6 h-fit">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Filter Jobs</h1>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          <ChevronDown
            className={`h-4 w-4 transition ${open ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>

      {open && (
        <div className="space-y-8">

          {/*  Location */}
          <div>
            <h2 className="text-sm font-medium mb-3 text-muted-foreground">
              Location
            </h2>

            <div className="space-y-2">
              {options?.locations?.map((loc) => (
                <label
                  key={loc}
                  className="flex items-center gap-3 text-sm cursor-pointer"
                >
                  <Checkbox
                    checked={filters.location.includes(loc)}
                    onCheckedChange={() =>
                      toggleFilter("location", loc)
                    }
                  />
                  {loc}
                </label>
              ))}
            </div>
          </div>

          {/*  Industry */}
          <div>
            <h2 className="text-sm font-medium mb-3 text-muted-foreground">
              Industry
            </h2>

            <div className="space-y-2">
              {options?.industries?.map((industry) => (
                <label
                  key={industry}
                  className="flex items-center gap-3 text-sm cursor-pointer"
                >
                  <Checkbox
                    checked={filters.industry.includes(industry)}
                    onCheckedChange={() =>
                      toggleFilter("industry", industry)
                    }
                  />
                  {industry}
                </label>
              ))}
            </div>
          </div>

          {/* Salary (Static for now) */}
          <div>
            <h2 className="text-sm font-medium mb-3 text-muted-foreground">
              Salary
            </h2>

            <div className="space-y-2">
              {["0–30k", "30k–60k", "60k–1L","1L–2L","2L+"].map((range) => (
                <label
                  key={range}
                  className="flex items-center gap-3 text-sm cursor-pointer"
                >
                  <Checkbox
                    checked={filters.salary.includes(range)}
                    onCheckedChange={() =>
                      toggleFilter("salary", range)
                    }
                  />
                  {range}
                </label>
              ))}
            </div>
          </div>

          {/* Clear Button */}
          <Button
            variant="outline"
            className="w-full"
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