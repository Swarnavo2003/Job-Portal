import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router";

const Job = () => {
  const navigate = useNavigate();
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button variant="outline">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="text-sm text-gray-600">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
          nesciunt deleniti ad numquam sunt natus dolor dignissimos, eveniet
          quaerat consectetur.
        </p>
      </div>
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
      <div className="flex items-center gap-4 mt-4">
        <Button onClick={() => navigate(`/job/1`)} variant="outline">
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
