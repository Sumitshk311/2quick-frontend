import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      localStorage.setItem("user", JSON.stringify({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      }));

      navigate("/");
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-xl p-8">

        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-green-700">
            2Quick 🛒
          </h1>
          <p className="text-gray-500 mt-2">
            Login to continue shopping
          </p>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 font-semibold hover:bg-gray-50 transition"
        >
          <FcGoogle className="text-2xl" />
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-6">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
