import useJobStore from "@/store/useJobStore";
import { useEffect } from "react";

const useGetAllJobs = () => {
  const { getAllJobs } = useJobStore();

  useEffect(() => {
    getAllJobs();
  }, [getAllJobs]);
};

export default useGetAllJobs;
