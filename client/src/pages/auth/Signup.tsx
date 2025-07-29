import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import AuthLayout from '../../components/auth/AuthLayout';
import SocialAuthButtons from '../../components/auth/SocialAuthButtons';

const Signup: React.FC = () => {
  const handleSignup = (data: Record<string, string | boolean>) => {
    const { name, email, password } = data as { name: string; email: string; password: string };
    console.log('Signup attempt:', { name, email, password });
    // TODO: Call your API here
  };

  return (
    <AuthLayout
      title="Sign up to create account"
      subtitle="Welcome back! select method to login"
      bottomText={
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to={'/login'} className="text-primary-500 hover:text-primary-600 font-medium">
            Sign in
          </Link>
        </p>
      }
      social={<SocialAuthButtons />}
    >
      <AuthForm mode="signup" onSubmit={handleSignup} />
    </AuthLayout>
  );
};

export default Signup;