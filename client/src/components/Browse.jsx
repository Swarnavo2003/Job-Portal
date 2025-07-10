import useJobStore from "@/store/useJobStore";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { useEffect, useState } from "react";
import { axiosInstance, BASE_URL } from "@/lib/axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Browse = () => {
  const { searchQuery } = useJobStore();
  console.log(searchQuery);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `${BASE_URL}/job/get?keyword=${searchQuery}`
        );
        if (res.data.success) {
          setJobs(res.data.jobs);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [searchQuery]);

  if (loading) {
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
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results {jobs.length}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {jobs.map((job, index) => {
            return <Job job={job} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
