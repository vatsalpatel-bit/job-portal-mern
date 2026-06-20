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

        const applications = res?.data?.applications || res?.applications || [];

        dispatch(setAppliedJobs(applications));

      } catch (error) {
        console.error(error);
      }
    };

    fetchAppliedJobs();
  }, [dispatch]);

  return (
    <div
      className="
  overflow-hidden
  rounded-[32px]
  border border-white/60
  bg-white/80
  backdrop-blur-xl
  shadow-[0_10px_40px_rgba(0,0,0,0.05)]
  "
    >

      <Table>

        {/* HEADER */}
        <TableHeader>

          <TableRow className="border-b border-gray-100 bg-[#f8fbff] hover:bg-[#f8fbff]">

            <TableHead className="h-14 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Date
            </TableHead>

            <TableHead className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Job Role
            </TableHead>

            <TableHead className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Company
            </TableHead>

            <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-gray-500 pr-6">
              Status
            </TableHead>

          </TableRow>

        </TableHeader>

        {/* BODY */}
        <TableBody>

          {paginatedJobs.map((item) => (

            <TableRow
              key={item._id}
              className="
          border-b border-gray-100/80
          hover:bg-[#f8fbff]/60
          transition-colors
          "
            >

              {/* Date */}
              <TableCell className="px-6 py-5 text-sm text-gray-500">
                {new Date(item.createdAt).toLocaleDateString()}
              </TableCell>

              {/* Job Role */}
              <TableCell
                className="
            py-5
            text-[15px]
            font-semibold
            text-gray-900
            "
              >
                {item.job?.title}
              </TableCell>

              {/* Company */}
              <TableCell className="py-5 text-sm text-gray-600">
                {item.job?.company?.name}
              </TableCell>

              {/* Status */}
              <TableCell className="py-5 pr-6 text-right">

                <Badge
                  className={`
              rounded-full px-4 py-1.5
              text-xs font-semibold
              border-0 shadow-sm

              ${item.status === "accepted"
                      ? "bg-[#ecfdf3] text-green-700"
                      : item.status === "rejected"
                        ? "bg-[#fef2f2] text-red-700"
                        : "bg-[#eef4ff] text-blue-700"
                    }
              `}
                >
                  {item.status}
                </Badge>

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

      {/* PAGINATION */}
      <div
        className="
    flex flex-col md:flex-row
    items-center justify-between
    gap-5
    px-6 py-5
    border-t border-gray-100
    bg-white/60
    backdrop-blur-xl
    "
      >

        {/* Left */}
        <p className="text-sm text-gray-500">

          Page{" "}

          <span className="font-semibold text-gray-900">
            {page}
          </span>{" "}

          of{" "}

          <span className="font-semibold text-gray-900">
            {totalPages}
          </span>

        </p>

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

            {[...Array(totalPages)].map((_, index) => {

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

          {totalPages == 0 ? (
            <button
              disabled
              onClick={() => setPage(page + 1)}
              className={`
        h-11 px-5 rounded-2xl
        text-sm font-medium
        transition-all duration-300
        bg-gray-100 text-gray-400 cursor-not-allowed

        `}
            >
              Next
            </button>
          ) : (<button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className={`
        h-11 px-5 rounded-2xl
        text-sm font-medium
        transition-all duration-300

        ${page === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100 shadow-sm"
              }
        `}
          >
            Next
          </button>)}


        </div>

      </div>

    </div>


  );
};

export default AppliedJobTable;
