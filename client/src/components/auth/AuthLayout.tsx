import React from 'react';
import SideImage from '../../assets/images/auth/sideImage.jpeg';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    bottomText: React.ReactNode;
    dividerText?: string;
    social?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
    children,
    title,
    subtitle,
    bottomText,
    dividerText = 'Or continue with email',
    social,
}) => (
    <div className="min-h-screen flex">
        {/* Left side - Image */}
        <div className="hidden lg:flex lg:w-1/2 relative">
            <img src={SideImage} alt="" className="object-cover" />
        </div>
        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                    <p className="text-gray-600">{subtitle}</p>
                </div>
                {children}
                <div className="mt-6 text-center">{bottomText}</div>
                {/* Divider */}
                <div className="mt-6 mb-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">{dividerText}</span>
                        </div>
                    </div>
                </div>
                {social}
            </div>
        </div>
    </div>
);

export default AuthLayout;
