import { axiosInstance, BASE_URL } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

const useJobStore = create((set) => ({
  allJobs: [],
  job: null,
  adminJobs: [],
  isFetchingAllJobs: false,
  isFetchingJobById: false,
  isFetchingAdminJobs: false,
  isApplyingJob: false,
  isCreatingJob: false,

  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),

  getAllJobs: async () => {
    set({ isFetchingAllJobs: true });
    try {
      const res = await axiosInstance.get(`${BASE_URL}/job/get`);
      if (res.data.success) {
        set({ allJobs: res.data.jobs });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isFetchingAllJobs: false });
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

  getAdminJobs: async () => {
    set({ isFetchingAdminJobs: true });
    try {
      const res = await axiosInstance.get(`${BASE_URL}/job/getadminjobs`);
      if (res.data.success) {
        set({ adminJobs: res.data.jobs });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isFetchingAdminJobs: false });
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

  createJob: async (data, navigate) => {
    set({ isCreatingJob: true });
    try {
      const res = await axiosInstance.post(`${BASE_URL}/job/post`, data);

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isCreatingJob: false });
    }
  },
}));

export default useJobStore;
