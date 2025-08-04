import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from '../../components/auth/AuthForm';
import AuthLayout from '../../components/auth/AuthLayout';
import SocialAuthButtons from '../../components/auth/SocialAuthButtons';
import api from "@/lib/axios.ts";
import axios from "axios";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleLogin = async (data: Record<string, string | boolean>) => {
    setFieldErrors({})
    const {
      email,
      password,
      rememberMe
    } = data as {
      email: string;
      password: string;
      rememberMe: boolean
    };

    console.log('Login attempt:', { email, password, rememberMe });

    setLoading(true);

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
        rememberMe,
      });

      console.log(response.data);
      navigate("/questions")

    }catch (error: any) {
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
        setFieldErrors({ general: 'Unexpected error occurred.' });
      }
    }

  };

  return (
      <AuthLayout
          title="Sign in to your account"
          subtitle="Welcome back! select method to login"
          bottomText={
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link className="text-primary-600 hover:text-primary-700 font-medium" to={'/signup'}>
                Sign up
              </Link>
            </p>
          }
          social={<SocialAuthButtons />}
      >
        <AuthForm
            mode="login"
            onSubmit={handleLogin}
            loading={loading}
            errors={fieldErrors}
        />
      </AuthLayout>
  );
};

export default Login;