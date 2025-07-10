import { axiosInstance, BASE_URL } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

const useApplicationStore = create((set) => ({
  applicants: [],
  appliedJobs: [],
  isFetchingApplicants: false,
  isUpdatingApplication: false,
  isFetchingAppliedJobs: false,

  getApplicants: async (jobId) => {
    set({ isFetchingApplicants: true });
    try {
      const res = await axiosInstance.get(
        `${BASE_URL}/application/${jobId}/applicants`
      );

      if (res.data?.success) {
        set({ applicants: res.data?.job?.applications || [] });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isFetchingApplicants: false });
    }
  },

  updateApplicationStatus: async (applicationId, status) => {
    set({ isUpdatingApplication: true });
    try {
      const res = await axiosInstance.post(
        `${BASE_URL}/application/status/${applicationId}/update`,
        { status }
      );

      if (res.data?.success) {
        toast.success(res.data?.message || "Application status updated");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingApplication: false });
    }
  },

  getAppliedJobs: async () => {
    set({ isFetchingAppliedJobs: true });
    try {
      const res = await axiosInstance.get(`${BASE_URL}/application/get`);

      if (res.data?.success) {
        set({ appliedJobs: res.data?.applications || [] });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isFetchingAppliedJobs: false });
    }
  },
}));

export default useApplicationStore;
