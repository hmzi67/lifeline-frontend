import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from '../../components/auth/AuthForm';
import AuthLayout from '../../components/auth/AuthLayout';
import SocialAuthButtons from '../../components/auth/SocialAuthButtons';
import api from "@/lib/axios.ts";
import axios from "axios";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSignup = async (data: Record<string, string | boolean>) => {
    setFieldErrors({})
    const { name, email, password } = data as {
      name: string;
      email: string;
      password: string;
    };

    setLoading(true);

    try {
      const response = await api.post('/auth/signup', {
        name,
        email,
        password,
      });

      console.log(response.data);
      navigate("/login")

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