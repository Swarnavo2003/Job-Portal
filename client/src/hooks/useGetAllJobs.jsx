import useJobStore from "@/store/useJobStore";
import { useEffect } from "react";

const useGetAllJobs = () => {
  const { getAllJobs, searchQuery } = useJobStore();

  useEffect(() => {
    getAllJobs(searchQuery);
  }, [getAllJobs, searchQuery]);
};

export default useGetAllJobs;
