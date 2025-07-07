import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const JobDescription = () => {
  const isApplied = false;
  return (
    <div className="max-w-6xl mx-auto my-10 border border-gray-100 rounded-md p-5 shadow-xl shadow-gray-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">Job Title</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge variant={"ghost"} className="text-blue-700 font-bold">
              12 Positions
            </Badge>
            <Badge variant={"ghost"} className="text-red-700 font-bold">
              Part Time
            </Badge>
            <Badge variant={"ghost"} className="text-purple-700 font-bold">
              24LPA
            </Badge>
          </div>
        </div>
        <Button disabled={isApplied}>
          {isApplied ? "Applied" : "Apply Now"}
        </Button>
      </div>
      <div>
        <h1 className="border-b-1 border-b-gray-200 font-medium py-4">
          Job Description
        </h1>
        <div className="my-4">
          <h1 className="font-bold my-1">
            Role:{" "}
            <span className="font-normal text-gray-800">
              Frontend Developer
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Location:{" "}
            <span className="pl-4 font-normal text-gray-800">Hyderabad</span>
          </h1>
          <h1 className="font-bold my-1">
            Description:{" "}
            <span className="pl-4 font-normal text-gray-800">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Corporis, eum.
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Experience:{" "}
            <span className="pl-4 font-normal text-gray-800">2 yrs</span>
          </h1>
          <h1 className="font-bold my-1">
            Salary:{" "}
            <span className="pl-4 font-normal text-gray-800">12LPA</span>
          </h1>
          <h1 className="font-bold my-1">
            Total Applicants:{" "}
            <span className="pl-4 font-normal text-gray-800">4</span>
          </h1>
          <h1 className="font-bold my-1">
            Posted Date:{" "}
            <span className="pl-4 font-normal text-gray-800">07/07/2025</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
