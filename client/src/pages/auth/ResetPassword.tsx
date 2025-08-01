import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import api from "@/lib/axios.ts";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  // States for requesting reset
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // States for resetting password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/request-password-reset", {
        email: email,
      });

      console.log(response.data);
      setSubmitted(true);
      setError(response?.data?.message || "Reset link sent to your email.");
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
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
        token: token,
        newPassword: password,
      });

      console.log(response.data);
      setResetSuccess(true);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
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
        {token ? (
          // Password Reset Form (when token is present)
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Set New Password
            </h2>
            {resetSuccess ? (
              <div className="text-center">
                <p className="text-green-600 mb-4">
                  Password reset successful! Redirecting to login...
                </p>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              </div>
            ) : (
              <form onSubmit={handlePasswordReset} className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            )}
          </>
        ) : (
          // Email Request Form (when no token)
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Reset Your Password
            </h2>
            {submitted ? (
              <div className="text-center">
                <p className="text-green-600">
                  {error || "Reset link sent to your email. Please check your inbox."}
                </p>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setEmail("");
                    setError("");
                  }}
                  className="mt-4 w-full py-2 rounded-xl bg-gray-500 hover:bg-gray-600"
                >
                  Send Another Email
                </Button>
              </div>
            ) : (
              <form onSubmit={handleRequestReset} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                  {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl transition-colors disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
