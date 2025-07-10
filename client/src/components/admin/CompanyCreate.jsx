import { useNavigate } from "react-router";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import useCompanyStore from "@/store/useCompanyStore";
import { useState } from "react";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const { registerCompany, isRegisteringCompany } = useCompanyStore();

  const submitHandler = async (e) => {
    e.preventDefault();
    await registerCompany({ companyName }, navigate);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-600 text-sm">
            Give your company a name. You can change it later.
          </p>
        </div>

        <Label>Company</Label>
        <Input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="my-2"
          placeholder="Write your company name"
        />

        <div className="flex items-center gap-2 my-10">
          <Button
            onClick={() => navigate("/admin/companies")}
            variant="outline"
          >
            Cancel
          </Button>
          <Button onClick={submitHandler} disabled={isRegisteringCompany}>
            {isRegisteringCompany ? "Creating..." : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
