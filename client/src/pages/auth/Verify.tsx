import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/lib/axios.ts";
import { Button } from "@/components/ui/button.tsx";
import { Home, RefreshCcw, MailCheck, MailX } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Verify() {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [showResendForm, setShowResendForm] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [resendMessage, setResendMessage] = useState<string>("");
  const [resendSuccess, setResendSuccess] = useState<boolean>(false);

  useEffect(() => {
    setError("");
    const verifyToken = async () => {
      try {
        await api.post("auth/verify", { token });
        setSuccess(true);
      } catch (error: any) {
        console.error("Verification failed", error.response?.data);
        setError(error.response?.data?.message || "Something went wrong");
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    setResendMessage("");
    setResendSuccess(false);

    try {
      await api.post("auth/resend-verification", { email });
      setResendMessage("Verification email sent successfully!");
      setResendSuccess(true);
    } catch (error: any) {
      setResendMessage(
        error.response?.data?.message || "Failed to resend email."
      );
      setResendSuccess(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-cyan-100 to-blue-100 px-4">
      <div className="w-full max-w-xl text-center py-10 px-6 rounded-3xl shadow-2xl bg-white border border-gray-200 animate-fade-in">
        {success ? (
          <div className="text-green-600 text-xl font-semibold space-y-6">
            <MailCheck className="w-14 h-14 mx-auto" />
            <p>Email verified successfully!</p>
            <Link to="/">
              <Button className="w-full mt-5 rounded-full text-lg font-semibold px-10 py-3 flex items-center gap-2">
                <Home className="w-5 h-5" />
                Go Home
              </Button>
            </Link>
          </div>
        ) : error && !showResendForm ? (
          <div className="text-red-600 text-xl font-semibold space-y-6">
            <MailX className="w-14 h-14 mx-auto" />
            <p>{error}</p>
            <Button
              onClick={() => setShowResendForm(true)}
              className="w-full rounded-full text-lg font-semibold px-10 py-3 flex items-center gap-2"
              variant="destructive"
            >
              <RefreshCcw className="w-5 h-5" />
              Resend
            </Button>
          </div>
        ) : showResendForm ? (
          <form
            onSubmit={handleResend}
            className="flex flex-col gap-4 items-center text-gray-700"
          >
            <p className="text-lg font-semibold mb-1">
              Enter your email to resend verification
            </p>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-3/4 rounded-xl"
            />
            <Button
              type="submit"
              className="rounded-full text-lg font-semibold px-10 py-3 mt-2"
            >
              Send Verification
            </Button>

            {resendMessage && (
              <p
                className={`text-sm mt-2 font-medium ${
                  resendSuccess ? "text-green-600" : "text-red-600"
                }`}
              >
                {resendMessage}
              </p>
            )}

            {resendSuccess && (
              <Button
                onClick={() => setShowResendForm(false)}
                variant="outline"
                className="mt-3 rounded-full text-sm font-medium"
              >
                Back
              </Button>
            )}
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 text-blue-600">
            <svg
              className="animate-spin h-14 w-14 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0
                3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="font-semibold text-lg mt-2">Verifying your email...</p>
          </div>
        )}
      </div>
    </div>
  );
}
