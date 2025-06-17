import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import FormInput from '@/components/auth/FormInput';
import SocialButton from '@/components/auth/SocialButton';

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      // Handle successful submission here
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = (provider: 'google' | 'apple') => {
    console.log(`${provider} sign up clicked`);
    // Handle social sign up here
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
      </div>

      {/* Plus icon in top left */}
      <div className="absolute top-8 left-8 text-white/70 z-10">
        <div className="w-8 h-8 flex items-center justify-center">
          <Plus className="w-6 h-6" />
        </div>
      </div>

      {/* Main Content */}
      <Card className="relative z-10 w-full max-w-md bg-transparent border-none shadow-none">
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-3 leading-tight">
              Sign up to create account
            </h1>
            <p className="text-gray-300 text-lg">
              Welcome back! select method to login
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 mb-8">
            <FormInput
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange('name')}
              icon={<User className="h-5 w-5" />}
              error={errors.name}
              required
            />

            <FormInput
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange('email')}
              icon={<Mail className="h-5 w-5" />}
              error={errors.email}
              required
            />

            <FormInput
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange('password')}
              icon={<Lock className="h-5 w-5" />}
              rightIcon={showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              onRightIconClick={() => setShowPassword(!showPassword)}
              error={errors.password}
              required
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-cyan-400 hover:bg-cyan-500 text-white font-semibold text-lg transition-all duration-200 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="text-center mb-6">
            <p className="text-gray-300 font-medium">Or continue with email</p>
          </div>

          {/* Social Login Buttons */}
          <div className="flex gap-4">
            <SocialButton
              provider="google"
              onClick={() => handleSocialSignUp('google')}
              className="flex-1"
            />
            <SocialButton
              provider="apple"
              onClick={() => handleSocialSignUp('apple')}
              className="flex-1"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Signup;