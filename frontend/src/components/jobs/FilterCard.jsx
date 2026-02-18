import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    key: "location",
    options: ["Navsari", "Vadodara", "Anand"],
  },
  {
    filterType: "Industry",
    key: "industry",
    options: [
      "Frontend Developer",
      "Backend Developer",
      "Fullstack Developer",
    ],
  },
  {
    filterType: "Salary",
    key: "salary",
    options: ["5–40k", "50k–1L", "2–3L"],
  },
];

const FilterCard = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    location: [],
    industry: [],
    salary: [],
  });

  const [open, setOpen] = useState(true);

  const toggleFilter = (type, value) => {
    setFilters((prev) => {
      const updated = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];

      const newFilters = { ...prev, [type]: updated };
      onFilterChange?.(newFilters);
      return newFilters;
    });
  };

  const clearFilters = () => {
    const cleared = {
      location: [],
      industry: [],
      salary: [],
    };
    setFilters(cleared);
    onFilterChange?.(cleared);
  };

  return (
    <div
      className="
        sticky top-24
    rounded-2xl
    border
    bg-background
    p-6
    h-fit
    overflow-visible
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">
          Filter Jobs
        </h1>

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

      {/* Filters */}
      {open && (
        <div className="space-y-8">
          {filterData.map((item) => (
            <div key={item.key}>
              <h2 className="text-sm font-medium mb-3 text-muted-foreground">
                {item.filterType}
              </h2>

              <div className="space-y-2">
                {item.options.map((value) => (
                  <label
                    key={value}
                    className="
                      flex items-center gap-3
                      text-sm cursor-pointer
                      hover:text-primary
                    "
                  >
                    <Checkbox
                      checked={filters[item.key].includes(value)}
                      onCheckedChange={() =>
                        toggleFilter(item.key, value)
                      }
                    />
                    {value}
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Clear Filters */}
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
