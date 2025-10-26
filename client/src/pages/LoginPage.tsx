// src/pages/LoginPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

declare global {
  interface Window {
    google: any;
  }
}

const LoginPage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.google || !window.google.accounts) return;

    const handleGoogleResponse = async (response: any) => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/google",
          { credential: response.credential },
          { withCredentials: true }
        );

        if (res.data.user) {
          navigate("/home");
        }
      } catch (err) {
        console.error("Google login failed:", err);
      }
    };

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-signin")!,
      {
        theme: "outline",
        size: "large",
        width: 250,
      }
    );

    window.google.accounts.id.prompt(); // show One-Tap if available
    setLoading(false);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-3xl font-semibold mb-8">Sign in with Google</h1>

      <div id="google-signin"></div>

      {loading && <p className="mt-4 text-gray-500">Loading...</p>}
    </div>
  );
};

export default LoginPage;
