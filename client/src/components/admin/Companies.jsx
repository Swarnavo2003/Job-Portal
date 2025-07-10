import { useNavigate } from "react-router";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CompaniesTable from "./CompaniesTable";
import { useEffect, useState } from "react";
import useCompanyStore from "@/store/useCompanyStore";
import { Loader2 } from "lucide-react";

const Companies = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { companies, isGettingCompanies, getCompanies } = useCompanyStore();

  useEffect(() => {
    getCompanies();
  }, [getCompanies]);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(input.toLowerCase())
  );

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
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Filter by name"
            className="w-fit"
          />
          <Button onClick={() => navigate("/admin/company/create")}>
            New Company
          </Button>
        </div>
        <CompaniesTable companies={filteredCompanies} />
      </div>
    </div>
  );
};

export default Companies;
