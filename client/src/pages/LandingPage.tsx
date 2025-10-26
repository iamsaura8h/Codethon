import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <main className="flex flex-col justify-center items-center h-[80vh] text-center space-y-6">
        <h1 className="text-4xl font-bold">Welcome to CodeAuth</h1>
        <p className="text-gray-600">A minimal App to demonstrate G-Auth</p>
        <Link
          to="/login"
          className="border border-black px-6 py-3 inline-block"
        >
          Continue with Google
        </Link>
      </main>
    </div>
  );
};

export default LandingPage;
