import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthForm from '../../components/auth/AuthForm';
import AuthLayout from '../../components/auth/AuthLayout';
import SocialAuthButtons from '../../components/auth/SocialAuthButtons';
import axios from "axios";
import { useAuth } from '../../contexts/AuthContext';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { signup } = useAuth();

  // Get the intended destination from location state, or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSignup = async (data: Record<string, string | boolean>) => {
    setFieldErrors({})
    const { name, email, password } = data as {
      name: string;
      email: string;
      password: string;
    };

    setLoading(true);

    try {
      // Use the auth context signup method
      await signup(name, email, password);

      // Redirect to intended destination or dashboard
      navigate(from, { replace: true });

    } catch (error: any) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        const responseErrors = error.response?.data?.errors;
        if (Array.isArray(responseErrors)) {
          const formattedErrors: Record<string, string> = {};
          for (const err of responseErrors) {
            formattedErrors[err.field] = err.message;
          }
          setFieldErrors(formattedErrors);
        } else {
          // fallback to general error
          setFieldErrors({ general: error.response?.data?.message || 'Signup failed' });
        }
      } else {
        setFieldErrors({ general: error.message || 'Unexpected error occurred.' });
      }
    }
  };

  return (
    <AuthLayout
      title="Sign up to create account"
      subtitle="Welcome back! select method to login"
      bottomText={
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-primary-500 hover:text-primary-600 font-medium"
          >
            Sign in
          </Link>
        </p>
      }
      social={<SocialAuthButtons />}
    >
      <AuthForm
        mode="signup"
        onSubmit={handleSignup}
        loading={loading}
        errors={fieldErrors}
      />
      {/*<p className={'w-full text-center mt-6 text-red-500 font-medium'}>{errorString}</p>*/}
    </AuthLayout>
  );
};

export default Signup;