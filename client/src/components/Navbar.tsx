import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        credentials: "include",
      });
      setUser(null);      // clear context
      navigate("/");      // redirect landing page
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-black">
      <div className="text-xl font-semibold">CodeAuth</div>
      <div className="space-x-4">
        {user ? (
          <>
            {user.avatar && <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full inline-block mr-2" />}
            <span>{user.name}</span>
            <button onClick={handleLogout} className="border border-black px-3 py-1">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="border border-black px-3 py-1">Login</Link>
            <Link to="/login" className="border border-black px-3 py-1">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
