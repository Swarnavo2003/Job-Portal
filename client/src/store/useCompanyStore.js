import { axiosInstance, BASE_URL } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

const useCompanyStore = create((set) => ({
  companies: [],
  company: null,
  isGettingCompanies: false,
  isGettingCompanyById: false,
  isRegisteringCompany: false,
  isUpdatingCompany: false,

  getCompanies: async () => {
    set({ isGettingCompanies: true });
    try {
      const res = await axiosInstance.get(`${BASE_URL}/company/get`);
      if (res.data.success) {
        set({ companies: res.data.companies });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isGettingCompanies: false });
    }
  },

  getCompanyById: async (companyId) => {
    set({ isGettingCompanyById: true });
    try {
      const res = await axiosInstance.get(
        `${BASE_URL}/company/get/${companyId}`
      );
      if (res.data.success) {
        set({ company: res.data.company });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isGettingCompanyById: false });
    }
  },

  registerCompany: async (data, navigate) => {
    set({ isRegisteringCompany: true });
    try {
      const res = await axiosInstance.post(
        `${BASE_URL}/company/register`,
        data
      );
      if (res.data.success) {
        set({ company: res.data.company });
        toast.success(res.data.message);
        navigate(`/admin/company/${res.data.company._id}`);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isRegisteringCompany: false });
    }
  },

  updateCompany: async (data, navigate, companyId) => {
    set({ isUpdatingCompany: true });
    try {
      const res = await axiosInstance.put(
        `${BASE_URL}/company/update/${companyId}`,
        data
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingCompany: false });
    }
  },
}));

export default useCompanyStore;
