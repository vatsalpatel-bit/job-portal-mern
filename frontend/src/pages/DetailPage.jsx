import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DetailPage = () => {
  // simulate applied state (later replace with API data)
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = () => {
    setIsApplied(true);
  };

  return (
    <>
      <Navbar />

      <div className="pt-20 pb-10">
        <div className="mx-auto max-w-5xl px-6">

          {/* HEADER */}
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-2xl font-semibold mb-3">
                Frontend Developer
              </h1>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">12 Positions</Badge>
                <Badge className="bg-orange-100 text-orange-700">
                  Part Time
                </Badge>
                <Badge className="bg-purple-100 text-purple-700">
                  24LPA
                </Badge>
              </div>
            </div>

            {/* APPLY BUTTON */}
            {isApplied ? (
              <Button disabled className="rounded-full">
                Already Applied
              </Button>
            ) : (
              <Button
                className="rounded-full"
                onClick={handleApply}
              >
                Apply Now
              </Button>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">
              Job Description
            </h2>
            <div className="h-px bg-muted mb-6" />

            <div className="space-y-3 text-sm">
              <p>
                <span className="font-medium">Role:</span>{" "}
                Frontend Developer
              </p>
              <p>
                <span className="font-medium">Location:</span>{" "}
                Hyderabad
              </p>
              <p>
                <span className="font-medium">Description:</span>{" "}
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Praesentium similique sed dolor!
              </p>
              <p>
                <span className="font-medium">Experience:</span>{" "}
                2 yrs
              </p>
              <p>
                <span className="font-medium">Salary:</span>{" "}
                12LPA
              </p>
              <p>
                <span className="font-medium">Total Applicants:</span>{" "}
                4
              </p>
              <p>
                <span className="font-medium">Posted Date:</span>{" "}
                17-07-2024
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default DetailPage;
