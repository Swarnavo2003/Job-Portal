import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button variant="outline">
          <Avatar>
            <AvatarImage
              src={job?.company?.logo || "https://github.com/shadcn.png"}
              className="object-cover"
            />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-600">{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 truncate">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge variant={"ghost"} className="text-blue-700 font-bold">
          {job?.position} Positions
        </Badge>
        <Badge variant={"ghost"} className="text-red-700 font-bold">
          {job?.jobType}
        </Badge>
        <Badge variant={"ghost"} className="text-purple-700 font-bold">
          {job?.salary}LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button onClick={() => navigate(`/job/${job?._id}`)} variant="outline">
          Details
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
