import { axiosInstance, BASE_URL } from "@/lib/axios";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,

  setUser: (user) => set({ user }),
  setIsLoading: (value) => set({ isLoading: value }),

  getProfile: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`${BASE_URL}/user/profile`);
      if (res.data.success) {
        set({ user: res.data.user });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  registerUser: async (data, navigate) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(`${BASE_URL}/user/register`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(`${BASE_URL}/user/profile/update`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      set({ user: res.data.user });
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  loginUser: async (data, navigate) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post(`${BASE_URL}/user/login`, data);
      if (res.data.success) {
        set({ user: res.data.user });
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  logoutUser: async (navigate) => {
    try {
      const res = await axiosInstance.get(`${BASE_URL}/user/logout`);
      if (res.data.success) {
        set({ user: null });
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));

export default useAuthStore;
