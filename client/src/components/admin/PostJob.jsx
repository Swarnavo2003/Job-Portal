import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import useCompanyStore from "@/store/useCompanyStore";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useJobStore from "@/store/useJobStore";
import { useNavigate } from "react-router";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    experience: "",
    jobType: "",
    position: 0,
    companyId: "",
  });

  const { companies, getCompanies, isGettingCompanies } = useCompanyStore();
  const { createJob, isCreatingJob } = useJobStore();
  const navigate = useNavigate();

  useEffect(() => {
    getCompanies();
  }, [getCompanies]);

  const changeEventHandler = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSelectHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value.toLowerCase()
    );

    if (selectedCompany) {
      setInput({ ...input, companyId: selectedCompany._id });
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    createJob(input, navigate);
  };

  if (isGettingCompanies) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin size-10" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <form
        onSubmit={onSubmitHandler}
        className="max-w-2xl mx-auto py-8 px-4 border border-gray-200 rounded-2xl shadow-md"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2 col-span-2">
            <Label>Title</Label>
            <Input
              value={input.title}
              onChange={changeEventHandler}
              type="text"
              name="title"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>

          <div className="space-y-2 col-span-2">
            <Label>Description</Label>
            <Input
              value={input.description}
              onChange={changeEventHandler}
              type="text"
              name="description"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>

          <div className="space-y-2">
            <Label>Requirements</Label>
            <Input
              value={input.requirements}
              onChange={changeEventHandler}
              type="text"
              name="requirements"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>

          <div className="space-y-2">
            <Label>Salary</Label>
            <Input
              value={input.salary}
              onChange={changeEventHandler}
              type="text"
              name="salary"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <Input
              value={input.location}
              onChange={changeEventHandler}
              type="text"
              name="location"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>

          <div className="space-y-2">
            <Label>Experience</Label>
            <Input
              value={input.experience}
              onChange={changeEventHandler}
              type="text"
              name="experience"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>

          <div className="space-y-2">
            <Label>Job Type</Label>
            <Input
              value={input.jobType}
              onChange={changeEventHandler}
              type="text"
              name="jobType"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>

          <div className="space-y-2">
            <Label>Position</Label>
            <Input
              value={input.position}
              onChange={changeEventHandler}
              type="number"
              name="position"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>

          {companies.length > 0 && (
            <div className="space-y-2">
              <Label>Company</Label>
              <Select onValueChange={handleSelectHandler}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select A Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => (
                      <SelectItem key={company._id} value={company.name}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <Button
          disabled={companies.length <= 0}
          type="submit"
          className="w-full mt-4"
        >
          {companies.length <= 0
            ? "No Companies Registered Yet"
            : isCreatingJob
            ? "Posting Job..."
            : "Post Job"}
        </Button>
      </form>
    </div>
  );
};

export default PostJob;
