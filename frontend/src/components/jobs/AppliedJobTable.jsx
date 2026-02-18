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

const AppliedJobTable = () => {
  // dummy data (replace with API later)
  const appliedJobs = [
    {
      id: 1,
      date: "17-07-2024",
      role: "Frontend Developer",
      company: "Google",
      status: "Selected",
    },
    {
      id: 2,
      date: "17-07-2024",
      role: "Frontend Developer",
      company: "Google",
      status: "Selected",
    },
    {
      id: 3,
      date: "17-07-2024",
      role: "Frontend Developer",
      company: "Google",
      status: "Selected",
    },
    {
      id: 4,
      date: "17-07-2024",
      role: "Frontend Developer",
      company: "Google",
      status: "Selected",
    },
  ];

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
          {appliedJobs.map((job) => (
            <TableRow
              key={job.id}
              className="hover:bg-muted/50 transition"
            >
              <TableCell>{job.date}</TableCell>
              <TableCell className="font-medium">
                {job.role}
              </TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell className="text-right">
                <Badge className="rounded-full px-3">
                  {job.status}
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
