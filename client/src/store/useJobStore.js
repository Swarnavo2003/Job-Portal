import { axiosInstance, BASE_URL } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

const useJobStore = create((set) => ({
  allJobs: [],
  job: null,
  isFetchingJobById: false,
  isApplyingJob: false,

  getAllJobs: async () => {
    try {
      const res = await axiosInstance.get(`${BASE_URL}/job/get`);
      if (res.data.success) {
        set({ allJobs: res.data.jobs });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  getJobById: async (jobId) => {
    set({ isFetchingJobById: true });
    try {
      const res = await axiosInstance.get(`${BASE_URL}/job/get/${jobId}`);
      if (res.data.success) {
        set({ job: res.data.job });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isFetchingJobById: false });
    }
  },

  applyJob: async (jobId) => {
    set({ isApplyingJob: true });
    try {
      const res = await axiosInstance.post(
        `${BASE_URL}/application/apply/${jobId}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isApplyingJob: false });
    }
  },
}));

export default useJobStore;
