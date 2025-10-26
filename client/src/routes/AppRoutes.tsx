import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import { useAuth } from "../context/AuthContext";

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // wait for backend check

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/home" /> : <LandingPage />} />
      <Route path="/login" element={user ? <Navigate to="/home" /> : <LoginPage />} />
      <Route path="/home" element={user ? <HomePage /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
