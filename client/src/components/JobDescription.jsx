import { useParams } from "react-router";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import useGetJobById from "@/hooks/useGetJobById";
import useJobStore from "@/store/useJobStore";
import { Loader2 } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";

const JobDescription = () => {
  const { user } = useAuthStore();
  const { job, isFetchingJobById, applyJob } = useJobStore();

  const params = useParams();
  const jobId = params.id;
  const refechJob = useGetJobById(jobId);

  const isApplied =
    job?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  if (isFetchingJobById || !job) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin size-10" />
      </div>
    );
  }

  const applyJobHandler = async () => {
    await applyJob(job._id);
    refechJob();
  };

  return (
    <div className="max-w-6xl mx-auto my-10 border border-gray-100 rounded-md p-5 shadow-xl shadow-gray-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{job.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge variant={"ghost"} className="text-blue-700 font-bold">
              {job.position} Positions
            </Badge>
            <Badge variant={"ghost"} className="text-red-700 font-bold">
              {job.jobType}
            </Badge>
            <Badge variant={"ghost"} className="text-purple-700 font-bold">
              {job.salary}LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? () => {} : applyJobHandler}
          disabled={isApplied}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </Button>
      </div>
      <div>
        <h1 className="border-b-1 border-b-gray-200 font-medium py-4">
          Job Description
        </h1>
        <div className="my-4">
          <h1 className="font-bold my-1">
            Role: <span className="font-normal text-gray-800">{job.title}</span>
          </h1>
          <h1 className="font-bold my-1">
            Location:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {job.location}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Description:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {job.description}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Experience:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {job.experienceLevel}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Salary:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {job.salary}LPA
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Total Applicants:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {job.applications.length}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Posted Date:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {job?.createdAt.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
