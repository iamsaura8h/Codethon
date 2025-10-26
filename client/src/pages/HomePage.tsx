import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Hello, {user?.name}</h1>
        <p className="text-gray-600">Welcome to your protected Home Page!</p>
        {user?.avatar && (
          <img src={user.avatar} alt="avatar" className="w-24 mt-4 rounded-full border border-black" />
        )}
      </div>
    </div>
  );
};

export default HomePage;
