import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";

const ThankYouPage = () => {
  const [seconds, setSeconds] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    if (seconds === 0) {
      navigate("/");
    }

    return () => clearInterval(timer);
  }, [seconds, navigate]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-white px-4">
      <div className="text-center bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full border border-emerald-200">
        <div className="flex justify-center mb-4">
          <FaThumbsUp className="text-emerald-600 text-6xl animate-bounce" />
        </div>

        <h2 className="text-3xl font-extrabold text-emerald-700 mb-3">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-700 mb-4">
          Thank you for shopping with{" "}
          <span className="font-semibold text-emerald-600">2Quick</span>. Your
          order has been received and is being processed.
        </p>
        <p className="text-gray-600 mb-6">
          Redirecting to homepage in{" "}
          <span className="font-bold text-emerald-700 animate-pulse">
            {seconds}
          </span>{" "}
          seconds.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold transition shadow-md"
        >
          Go to Homepage Now
        </button>
      </div>
    </section>
  );
};

export default ThankYouPage;
