import { useNavigate } from "react-router";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import AdminJobsTable from "./AdminJobsTable";
import useJobStore from "@/store/useJobStore";

const AdminJobs = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { isFetchingAdminJobs, getAdminJobs, adminJobs } = useJobStore();

  useEffect(() => {
    getAdminJobs();
  }, [getAdminJobs]);

  const filteredJobs = adminJobs.filter(
    (job) =>
      job?.title.toLowerCase().includes(input.toLowerCase()) ||
      job?.company?.name.toLowerCase().includes(input.toLowerCase())
  );

  if (isFetchingAdminJobs) {
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
            placeholder="Filter by job title or company name"
            className="w-[50%]"
          />
          <Button onClick={() => navigate("/admin/job/create")}>New Job</Button>
        </div>
        <AdminJobsTable jobs={filteredJobs} />
      </div>
    </div>
  );
};

export default AdminJobs;
