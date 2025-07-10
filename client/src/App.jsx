import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import useGetAllJobs from "./hooks/useGetAllJobs";
import { Loader2 } from "lucide-react";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";

function App() {
  const { user, getProfile, isFetchingProfile } = useAuthStore();

  useEffect(() => {
    getProfile();
  }, [getProfile]);
  useGetAllJobs();

  if (isFetchingProfile && !user)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin size-10" />
      </div>
    );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!user ? <Login /> : <Home />} />
        <Route path="/signup" element={!user ? <Signup /> : <Home />} />
        <Route path="/jobs" element={user ? <Jobs /> : <Login />} />
        <Route
          path="/job/:id"
          element={user ? <JobDescription /> : <Login />}
        />
        <Route path="/browse" element={user ? <Browse /> : <Login />} />
        <Route path="/profile" element={user ? <Profile /> : <Login />} />
        <Route
          path="/admin/companies"
          element={user && user.role === "recruiter" ? <Companies /> : <Home />}
        />
        <Route
          path="/admin/company/create"
          element={
            user && user.role === "recruiter" ? <CompanyCreate /> : <Home />
          }
        />
        <Route
          path="/admin/company/:id"
          element={
            user && user.role === "recruiter" ? <CompanySetup /> : <Home />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
