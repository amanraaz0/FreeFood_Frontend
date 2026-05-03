import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const handleReset = async () => {
    if (!otp || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch("http://localhost:5000/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp, password }),
    });

    if (res.ok) {
      alert("✅ Password changed successfully");

      // 🔥 auto redirect after 2 sec
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      alert("❌ Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>

        {/* OTP */}
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setOtp(e.target.value)}
        />


        {/* New Password */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            className="w-full p-3 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="absolute right-3 top-3 text-gray-600 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="relative mb-6">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full p-3 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <span
            className="absolute right-3 top-3 text-gray-600 cursor-pointer"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Button */}
        <button
          onClick={handleReset}
          className="w-full bg-green-500 text-white p-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-200"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
