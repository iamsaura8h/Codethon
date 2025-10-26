import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

declare global {
  interface Window { google: any; }
}

const LoginPage = () => {
  const { setUser } = useAuth();
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
          setUser(res.data.user); // update context
          navigate("/home");      // then redirect
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
      { theme: "outline", size: "large", width: 250 }
    );

    window.google.accounts.id.prompt();
  }, [navigate, setUser]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-3xl font-semibold mb-8">Sign in with Google</h1>
      <div id="google-signin"></div>
    </div>
  );
};

export default LoginPage;
