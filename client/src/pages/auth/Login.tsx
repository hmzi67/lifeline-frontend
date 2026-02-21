import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from '../../components/auth/AuthForm';
import AuthLayout from '../../components/auth/AuthLayout';
import SocialAuthButtons from '../../components/auth/SocialAuthButtons';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { login } = useAuth();

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
      await login(email, password);

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

  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="Welcome back! Let's continue your wellness journey."
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