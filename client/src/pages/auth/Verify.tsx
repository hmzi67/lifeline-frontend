import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/lib/axios.ts";
import { Button } from "@/components/ui/button.tsx";
import { Home, RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Verify() {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [showResendForm, setShowResendForm] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [resendMessage, setResendMessage] = useState<string>("");
  const [resendSuccess, setResendSuccess] = useState<boolean>(false);

  useEffect(() => {
    setError("");
    const verifyToken = async () => {
      try {
        await api.post('auth/verify', { token });
        setSuccess(true);
      } catch (error: any) {
        console.error('Verification failed', error.response?.data);
        setError(error.response?.data?.message || "Something went wrong");
      }
    };

    if (token) {
      verifyToken().then(r => console.log(r));
    }
  }, [token]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    setResendMessage("");
    setResendSuccess(false);

    try {
      await api.post('auth/resend-verification', { email });
      setResendMessage("Verification email sent successfully!");
      setResendSuccess(true);
    } catch (error: any) {
      setResendMessage(error.response?.data?.message || "Failed to resend email.");
      setResendSuccess(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-1/2 text-center py-8 rounded-lg shadow-lg bg-white border">
        {success ? (
          <div className="text-green-600 text-lg font-medium">
            <p className="mb-8">Email verified successfully!</p>
            <Link to="/">
              <Button className="rounded-full text-lg font-medium px-16">
                <Home />
                Go Home
              </Button>
            </Link>
          </div>
        ) : error && !showResendForm ? (
          <div className="text-red-600 text-lg font-medium">
            <p className="mb-8">{error}</p>
            <Button
              onClick={() => setShowResendForm(true)}
              className="rounded-full text-lg font-medium px-16"
            >
              <RefreshCcw />
              Resend
            </Button>
          </div>
        ) : showResendForm ? (
          <form
            onSubmit={handleResend}
            className="flex flex-col gap-4 items-center text-gray-700"
          >
            <p className="text-lg font-medium mb-2">Enter your email to resend verification</p>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-1/2"
            />
            <Button type="submit" className="rounded-full text-lg font-medium px-16">
              Send Verification
            </Button>
            {resendMessage && (
              <p className={`text-sm mt-2 font-medium ${
                resendSuccess ? 'text-green-600' : 'text-red-600'
              }`}>
                {resendMessage}
              </p>
            )}
            {resendSuccess && (
              <Button
                onClick={() => setShowResendForm(false)}
                variant="outline"
                className="mt-2 rounded-full"
              >
                Back
              </Button>
            )}
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 text-teal-600">
            <svg className="animate-spin -ml-1 mr-3 h-16 w-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="font-medium text-lg mt-2">Verifying ...</p>
          </div>
        )}
      </div>
    </div>
  );
}