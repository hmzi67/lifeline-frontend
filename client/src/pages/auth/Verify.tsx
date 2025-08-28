import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import api from "@/lib/axios.ts";
import { Button } from "@/components/ui/button.tsx";
import { Home, MailCheck, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Verify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>(searchParams.get("email") || "");
  const [otp, setOtp] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [resendMessage, setResendMessage] = useState<string>("");
  const [resendSuccess, setResendSuccess] = useState<boolean>(false);
  const [resendLoading, setResendLoading] = useState<boolean>(false);

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setResendMessage("");
    setLoading(true);

    if (!email || !otp) {
      setError("Email and OTP are required.");
      setLoading(false);
      return;
    }

    try {
      await api.post("auth/verify", { email, otp });
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Verification failed. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendMessage("");
    setResendSuccess(false);
    setError("");
    setResendLoading(true);

    if (!email) {
      setResendMessage("Please enter your email address to resend the OTP.");
      setResendLoading(false);
      return;
    }

    try {
      await api.post("auth/resend-verification", { email });
      setResendMessage("A new verification OTP has been sent to your email!");
      setResendSuccess(true);
    } catch (err: any) {
      setResendMessage(err.response?.data?.message || "Failed to resend OTP.");
      setResendSuccess(false);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-cyan-100 to-blue-100 px-4">
      <div className="w-full max-w-md text-center py-10 px-6 rounded-3xl shadow-2xl bg-white border border-gray-200 animate-fade-in">
        {success ? (
          <div className="text-green-600 text-xl font-semibold space-y-6">
            <MailCheck className="w-14 h-14 mx-auto" />
            <p>Email verified successfully!</p>
            <p className="text-sm text-gray-500">
              You will be redirected to the login page shortly.
            </p>
            <Link to="/login">
              <Button className="w-full mt-2 rounded-full text-lg font-semibold px-10 py-3 flex items-center justify-center gap-2">
                <Home className="w-5 h-5" />
                Go to Login
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <MailCheck className="w-14 h-14 mx-auto mb-4 text-blue-500" />
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              Verify Your Email
            </h2>
            <p className="text-gray-500 mb-6">
              Enter the OTP sent to your email address.
            </p>
            <form
              onSubmit={handleVerify}
              className="flex flex-col gap-4 items-center text-gray-700"
            >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full rounded-xl"
            />
            <Input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter your 6-digit OTP"
              required
              maxLength={6}
              className="w-full rounded-xl text-center tracking-[0.5em]"
            />
            {error && (
              <p className="text-sm font-medium text-red-600">{error}</p>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full text-lg font-semibold px-10 py-3 mt-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Verify Account"}
            </Button>
            </form>
            <div className="mt-4 text-sm">
              <p className="text-gray-600">
                Didn't receive the code?{" "}
                <Button
                  variant="link"
                  onClick={handleResend}
                  disabled={resendLoading}
                  className="p-0 h-auto font-medium text-blue-600"
                >
                  {resendLoading ? "Sending..." : "Resend OTP"}
                </Button>
              </p>
              {resendMessage && (
                <p
                  className={`text-sm mt-2 font-medium ${
                    resendSuccess ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {resendMessage}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
