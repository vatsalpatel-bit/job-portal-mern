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

const AppliedJobTable = () => {
  const dispatch = useDispatch();
  const appliedJobs = useSelector((state) => state.job.appliedJobs || [])
  
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
          {appliedJobs.map((item) => (
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
    </div>
  );
};

export default AppliedJobTable;
