import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import AuthLayout from '../../components/auth/AuthLayout';
import SocialAuthButtons from '../../components/auth/SocialAuthButtons';

const Login: React.FC = () => {
  const handleLogin = (data: Record<string, string | boolean>) => {
    const { email, password, rememberMe } = data as { email: string; password: string; rememberMe: boolean };
    console.log('Login attempt:', { email, password, rememberMe });
    // TODO: Call your API here
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
      <AuthForm mode="login" onSubmit={handleLogin} />
    </AuthLayout>
  );
};

export default Login;