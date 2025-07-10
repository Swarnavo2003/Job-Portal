import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useCompanyStore from "@/store/useCompanyStore";
import { Textarea } from "../ui/textarea";

const CompanySetup = () => {
  const { id } = useParams();
  const {
    isGettingCompanyById,
    company,
    getCompanyById,
    updateCompany,
    isUpdatingCompany,
  } = useCompanyStore();
  const navigate = useNavigate();

  useEffect(() => {
    getCompanyById(id);
  }, [getCompanyById, id]);

  const [input, setInput] = useState({
    name: (company && company?.name) || "",
    description: (company && company?.description) || "",
    website: (company && company?.website) || "",
    location: (company && company?.location) || "",
    file: null,
  });

  useEffect(() => {
    if (company) {
      setInput({
        name: company?.name || "",
        description: company?.description || "",
        website: company?.website || "",
        location: company?.location || "",
        file: null,
      });
    }
  }, [company]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    updateCompany(formData, navigate, id);
  };

  if (isGettingCompanyById) {
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
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center gap-5 py-8">
          <Button
            onClick={() => navigate("/admin/companies")}
            variant="outline"
            className="flex items-center gap-2 test-gray-500 font-semibold"
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
          <h1 className="font-bold text-xl">Company Setup</h1>
        </div>
        <form
          onSubmit={submitHandler}
          className="border border-gray-100 rounded-2xl shadow-xl  p-5 space-y-3"
        >
          <div>
            <Label>Company Name</Label>
            <Input
              value={input.name}
              onChange={changeEventHandler}
              name="name"
              className="my-2"
              placeholder="Write your company name"
            />
          </div>
          <div>
            <Label>Company Description</Label>
            <Textarea
              value={input.description}
              onChange={changeEventHandler}
              name="description"
              className="my-2"
              placeholder="Write your company name"
            />
          </div>
          <div>
            <Label>Company Location</Label>
            <Input
              value={input.location}
              onChange={changeEventHandler}
              name="location"
              className="my-2"
              placeholder="Write your company name"
            />
          </div>
          <div>
            <Label>Company Website</Label>
            <Input
              value={input.website}
              onChange={changeEventHandler}
              name="website"
              className="my-2"
              placeholder="Write your company name"
            />
          </div>
          <div>
            <Label>Company Logo</Label>
            <Input
              type="file"
              accept="image/*"
              className="my-2"
              onChange={changeFileHandler}
            />
          </div>
          <Button type="submit">
            {isUpdatingCompany ? "Updating..." : "Update"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
