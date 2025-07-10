import useJobStore from "@/store/useJobStore";
import { useCallback, useEffect } from "react";

const useGetJobById = (jobId) => {
  const { getJobById } = useJobStore();

  useEffect(() => {
    getJobById(jobId);
  }, [getJobById, jobId]);

  const refetch = useCallback(() => {
    getJobById(jobId);
  }, [getJobById, jobId]);

  return refetch;
};

export default useGetJobById;
