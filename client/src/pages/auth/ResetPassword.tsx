import React, { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import api from "@/lib/axios.ts";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");

    try {
      const response = await api.post("/auth/request-password-reset", {
        email: email,
      });

      console.log(response.data);
      setSubmitted(true);
      setError(response?.data?.message || "Failed to resend email.");

    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to resend email.");
    }



  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Reset Your Password
        </h2>
        {submitted ? (
          <p className="text-green-600 text-center">
            {error}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <Button
              type="submit"
              className="w-full py-4 rounded-xl transition-colors"
            >
              Send Reset Link
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
