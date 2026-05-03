import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendOTP = async () => {
    if (!email) {
      alert("Please enter email");
      return;
    }

    const res = await fetch("http://localhost:5000/api/auth/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      alert("OTP sent to your email");
      navigate("/reset-password");
    } else {
      alert("Error sending OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-5 text-center">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={sendOTP}
          className="w-full bg-blue-500 text-white p-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
        >
          Send OTP
        </button>
      </div>
    </div>
  );
}
