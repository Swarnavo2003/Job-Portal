import useApplicationStore from "@/store/useApplicationStore";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const AppliedJobTable = () => {
  const { appliedJobs } = useApplicationStore();
  console.log(appliedJobs);
  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedJobs.length <= 0 ? (
            <span>No jobs found</span>
          ) : (
            appliedJobs.map((application) => (
              <TableRow key={application._id}>
                <TableCell>{application?.createdAt.split("T")[0]}</TableCell>
                <TableCell>{application?.job?.title}</TableCell>
                <TableCell>{application?.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={
                      application?.status === "pending"
                        ? "bg-gray-500"
                        : application?.status === "accepted"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }
                  >
                    {application?.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
