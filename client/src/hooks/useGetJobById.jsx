import useJobStore from "@/store/useJobStore";
import { useEffect } from "react";

const useGetJobById = (jobId) => {
  const { getJobById } = useJobStore();

  useEffect(() => {
    getJobById(jobId);
  }, [getJobById, jobId]);
};

export default useGetJobById;
