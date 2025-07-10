import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import useApplicationStore from "@/store/useApplicationStore";
import { toast } from "sonner";

const shortListingStatus = ["pending", "accepted", "rejected"];

const ApplicantsTable = () => {
  const { applicants, updateApplicationStatus } = useApplicationStore();

  const statusHandler = async (status, applicationId) => {
    try {
      await updateApplicationStatus(applicationId, status);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="my-5">
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.length <= 0 ? (
            <span>No Applicants Found</span>
          ) : (
            applicants.map((applicant) => (
              <TableRow>
                <TableCell>{applicant?.applicant?.fullname}</TableCell>
                <TableCell>{applicant?.applicant?.email}</TableCell>
                <TableCell>{applicant?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  <a
                    href={applicant?.applicant?.profile?.resume || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-blue-500"
                  >
                    {applicant?.applicant?.profile?.resumeOriginalName || "-"}
                  </a>
                </TableCell>
                <TableCell>{applicant?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 space-y-2">
                      {shortListingStatus.map((status, index) => (
                        <div
                          onClick={() => statusHandler(status, applicant?._id)}
                          key={index}
                          className="cursor-pointer"
                        >
                          {status.toUpperCase()}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
