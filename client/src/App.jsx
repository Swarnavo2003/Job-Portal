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

function App() {
  const { user, getProfile } = useAuthStore();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
