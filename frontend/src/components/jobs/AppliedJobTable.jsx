import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAppliedJobsApi } from "@/services/applicationApi";
import { setAppliedJobs } from "@/redux/slices/jobSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const AppliedJobTable = () => {
  const dispatch = useDispatch();
  const appliedJobs = useSelector((state) => state.job.appliedJobs || [])
  const [page, setPage] = useState(1);

  const limit = 5;

  const totalPages = Math.ceil(appliedJobs.length / limit);

  const paginatedJobs = appliedJobs.slice(
    (page - 1) * limit,
    page * limit
  );

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await getAppliedJobsApi();

        console.log("API RESPONSE:", res);

        const applications = res?.data?.applications || res?.applications || [];

        dispatch(setAppliedJobs(applications));

      } catch (error) {
        console.log(error);
      }
    };

    fetchAppliedJobs();
  }, [dispatch]);

  return (
    <div className="rounded-xl border bg-background">
      <Table>

        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedJobs.map((item) => (
            <TableRow key={item._id}>
              <TableCell>
                {new Date(item.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell className="font-medium">
                {item.job?.title}
              </TableCell>

              <TableCell>
                {item.job?.company?.name}
              </TableCell>

              <TableCell className="text-right">
                <Badge className="rounded-full px-3">
                  {item.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between px-4 py-4 border-t bg-white rounded-b-xl">

        {/* Left */}
        <p className="text-sm text-gray-500">
          Page{" "}
          <span className="font-semibold text-black">
            {page}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-black">
            {totalPages}
          </span>
        </p>

        {/* Right */}
        <div className="flex items-center gap-2">

          {/* Previous */}
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition
        ${page === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
              }`}
          >
            Previous
          </button>

          {/* Pages */}
          <div className="flex items-center gap-1">

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;

              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`w-10 h-10 rounded-lg text-sm font-semibold transition
              ${page === pageNumber
                      ? "bg-black text-white"
                      : "bg-white border hover:bg-gray-100"
                    }`}
                >
                  {pageNumber}
                </button>
              );
            })}

          </div>

          {/* Next */}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition
        ${page === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
              }`}
          >
            Next
          </button>

        </div>

      </div>
    </div>


  );
};

export default AppliedJobTable;
