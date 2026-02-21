import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import api from "@/lib/axios.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Home, MailCheck, Loader2, Mail, Shield } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

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

    if (otp.length !== 6) {
      setError("Please enter a complete 6-digit OTP.");
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-6 text-center pb-8">
            {success ? (
              <div className="space-y-4">
                <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <MailCheck className="w-10 h-10 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Email Verified Successfully!
                  </h1>
                  <p className="text-gray-500 text-sm">
                    Your account has been verified. You will be redirected to the login page shortly.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mx-auto w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                  <Shield className="w-10 h-10 text-primary-600" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Verify Your Email
                  </h1>
                  <p className="text-gray-500 text-sm">
                    We've sent a 6-digit verification code to your email address.
                  </p>
                </div>
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            {success ? (
              <div className="space-y-4">
                <div className="w-full h-2 bg-green-100 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <Link to="/login" className="block">
                  <Button
                    size="lg"
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Continue to Login
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleVerify} className="space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary-500" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="h-12 rounded-xl border-gray-200 focus:border-primary-400 focus:ring-primary-400/20 transition-all duration-200"
                  />
                </div>

                {/* OTP Input */}
                <div className="space-y-4">
                  <Label htmlFor="otp" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary-500" />
                    Verification Code
                  </Label>
                  <div className="flex flex-col items-center space-y-4">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={(value) => setOtp(value)}
                      className="gap-3"
                    >
                      <InputOTPGroup className="gap-2">
                        <InputOTPSlot
                          index={0}
                          className="w-12 h-12 text-lg font-bold border-2 border-gray-200 rounded-xl focus:border-primary-400 focus:ring-primary-400/20 transition-all duration-200"
                        />
                        <InputOTPSlot
                          index={1}
                          className="w-12 h-12 text-lg font-bold border-2 border-gray-200 rounded-xl focus:border-primary-400 focus:ring-primary-400/20 transition-all duration-200"
                        />
                        <InputOTPSlot
                          index={2}
                          className="w-12 h-12 text-lg font-bold border-2 border-gray-200 rounded-xl focus:border-primary-400 focus:ring-primary-400/20 transition-all duration-200"
                        />
                      </InputOTPGroup>
                      <InputOTPGroup className="gap-2">
                        <InputOTPSlot
                          index={3}
                          className="w-12 h-12 text-lg font-bold border-2 border-gray-200 rounded-xl focus:border-primary-400 focus:ring-primary-400/20 transition-all duration-200"
                        />
                        <InputOTPSlot
                          index={4}
                          className="w-12 h-12 text-lg font-bold border-2 border-gray-200 rounded-xl focus:border-primary-400 focus:ring-primary-400/20 transition-all duration-200"
                        />
                        <InputOTPSlot
                          index={5}
                          className="w-12 h-12 text-lg font-bold border-2 border-gray-200 rounded-xl focus:border-primary-400 focus:ring-primary-400/20 transition-all duration-200"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                    <p className="text-xs text-gray-500 text-center">
                      Enter the 6-digit code sent to your email
                    </p>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm font-medium text-red-600 text-center">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading || otp.length !== 6}
                  className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5 mr-2" />
                      Verifying Account...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 mr-2" />
                      Verify Account
                    </>
                  )}
                </Button>

                {/* Resend Section */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="text-center space-y-3">
                    <p className="text-sm text-gray-600">
                      Didn't receive the verification code?
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleResend}
                      disabled={resendLoading}
                      className="text-primary-600 hover:text-primary-700 hover:bg-primary-50 font-semibold transition-all duration-200"
                    >
                      {resendLoading ? (
                        <>
                          <Loader2 className="animate-spin w-4 h-4 mr-2" />
                          Sending new code...
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          Resend Verification Code
                        </>
                      )}
                    </Button>

                    {/* Resend Message */}
                    {resendMessage && (
                      <div className={`p-3 rounded-xl ${resendSuccess
                          ? "bg-green-50 border border-green-200"
                          : "bg-red-50 border border-red-200"
                        }`}>
                        <p className={`text-sm font-medium text-center ${resendSuccess ? "text-green-600" : "text-red-600"
                          }`}>
                          {resendMessage}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Need help? <Link to="/support" className="text-primary-600 hover:text-primary-700 font-medium">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
}