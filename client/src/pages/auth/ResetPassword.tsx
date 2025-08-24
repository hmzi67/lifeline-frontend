import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import api from "@/lib/axios.ts";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  // Step tracking
  const [step, setStep] = useState<"request" | "verifyOtp" | "resetSuccess">("request");

  // Request reset
  const [email, setEmail] = useState("");
  const [, setSubmitted] = useState(false);

  // OTP & password reset
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/request-password-reset", { email });
      console.log(response.data);
      setSubmitted(true);
      setStep("verifyOtp");
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtpAndReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length < 4) {
      setError("Please enter the OTP sent to your email.");
      return;
    }
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/reset-password", {
        email,
        otp,
        newPassword: password,
      });
      console.log(response.data);

      setStep("resetSuccess");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        {step === "request" && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Request OTP
            </h2>
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl transition-colors disabled:opacity-50"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </form>
          </>
        )}

        {step === "verifyOtp" && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Enter OTP & Reset Password
            </h2>
            <form onSubmit={handleVerifyOtpAndReset} className="space-y-4">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  OTP
                </label>
                <Input
                  id="otp"
                  type="text"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter the OTP sent to your email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <Input
                  id="password"
                  type="password"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password (min 8 characters)"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl transition-colors disabled:opacity-50"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          </>
        )}

        {step === "resetSuccess" && (
          <div className="text-center">
            <p className="text-green-600 mb-4">
              Password reset successful! Redirecting to login...
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
