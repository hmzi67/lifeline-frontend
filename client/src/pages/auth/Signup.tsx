import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import image1 from "@/assets/images/landing/hero-1.webp";
import GoogleOAuthButton from "@/components/auth/GoogleOAuthButton";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSignup = async () => {
    setFieldErrors({});

    // Basic validation
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    // if (!formData.email.trim()) errors.email = 'Email is required';
    // if (!formData.password.trim()) errors.password = 'Password is required';
    // if (formData.password.length < 8) errors.password = 'Password must be at least 6 characters';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);

    try {
      await signup(formData.name, formData.email, formData.password);

      navigate("/questions")

    } catch (error: any) {
      setLoading(false);
      if (Array.isArray(error)) {
        const formattedErrors: Record<string, string> = {};
        error.forEach((err: { field: string; message: string }) => {
          formattedErrors[err.field] = err.message;
        });
        setFieldErrors(formattedErrors);
      } else {
        setFieldErrors({ general: error.message || 'Signup failed' });
      }
    }
  };

  const handleSocialAuth = (provider: string) => {
    console.log(`Authenticate with ${provider}`);
    alert(`${provider} authentication would be implemented here`);
  };

  const handleSignInClick = () => {
    alert('Navigate to sign in page');
  };

  return (
    <div className="min-h-screen relative overflow-hidden ">
      {/* Background Image with Overlay */}
      <img
        src={image1}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <div className="w-12 h-12 mx-auto bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Sign up to create account
            </h1>
            <p className="text-gray-300 text-sm">
              Welcome back! select method to login
            </p>
          </div>

          {/* Main Form Container */}
          <div className="p-6">
            <div className="space-y-4">
              {/* Name Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-300" />
                </div>
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5  border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400/50 transition-all duration-200"
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-sm text-red-400">{fieldErrors.name}</p>
                )}
              </div>

              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-300" />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400/50 transition-all duration-200"
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-sm text-red-400">{fieldErrors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-300" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-white/5  border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400/50 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-300 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
                {fieldErrors.password && (
                  <p className="mt-1 text-sm text-red-400">{fieldErrors.password}</p>
                )}
              </div>

              {/* General Error */}
              {fieldErrors.general && (
                <p className="text-sm text-red-400 text-center">{fieldErrors.general}</p>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSignup}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primay-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-primary-500/25"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing Up...
                  </div>
                ) : (
                  'Sign Up'
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 h-px bg-white/20"></div>
              <span className="px-4 text-gray-300 text-sm">Or continue with email</span>
              <div className="flex-1 h-px bg-white/20"></div>
            </div>

            {/* Social Auth Buttons */}
            <div className="grid ">
              <GoogleOAuthButton className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/10 transition-all duration-200 group" />
            </div>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-300 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary-400 hover:text-primary-300 font-medium transition-colors underline-offset-2 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;