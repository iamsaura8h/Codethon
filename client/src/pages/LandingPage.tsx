import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const LandingPage = () => {
  const [catImg, setCatImg] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_CAT_API}/cat?json=true`)
      .then((res) => res.json())
      .then((data) => setCatImg(`${import.meta.env.VITE_CAT_API}/cat/${data.id}`))
      .catch(() => setCatImg("https://placekitten.com/400/300")); // fallback
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Cat Auth Starter 🐱</h1>
      {catImg && <img src={catImg} alt="Random Cat" className="mb-6 rounded shadow-md w-80 h-80" />}
      <div className="flex gap-4">
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">Login</Link>
        <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded">Sign Up</Link>
      </div>
    </div>
  );
};
