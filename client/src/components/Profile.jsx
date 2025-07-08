import { Contact2, Mail, Pen } from "lucide-react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import useAuthStore from "@/store/useAuthStore";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuthStore();
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="size-24">
              <AvatarImage
                src={
                  user?.profile?.profilePhoto
                    ? user?.profile?.profilePhoto
                    : "https://github.com/shadcn.png"
                }
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>

            <div>
              <h1 className="font-medium text-xl">{user.fullname}</h1>
              <p className="font-sm text-gray-600">{user.profile.bio}</p>
            </div>
          </div>

          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-2 my-2">
            <Mail />
            <span>{user.email}</span>
          </div>

          <div className="flex items-center gap-2 my-2">
            <Contact2 />
            <span>{user.phoneNumber}</span>
          </div>
        </div>

        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex flex-wrap gap-2">
            {user.profile.skills.length !== 0 ? (
              user.profile.skills.map((item, index) => (
                <div key={index} className="flex items-center gap-2 my-2">
                  <Badge variant="outline">{item}</Badge>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-2 my-2">
                <span className="text-gray-900 text-sm">No Skills Added</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {user.profile.resume && user.profile.resumeOriginalName ? (
            <a
              target="_blank"
              href={user.profile.resume}
              className="text-blue-500 w-full hover:underline"
            >
              {user.profile.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-900 text-sm">No Resume Added</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-xl my-5">Applied Jobs</h1>

        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
