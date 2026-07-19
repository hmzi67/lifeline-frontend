import api from '@/lib/axios';
import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getPostLoginRedirectPath } from '@/lib/onboarding';

const OAuthCallback: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setToken, setUser } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        const error = searchParams.get('error');

        const fetchUser = async () => {
            try {
                const res = await api.get('/auth/me');
                const user = res.data?.data?.user;

                // Sync user into AuthContext (also persists to localStorage)
                setUser(user);

                const redirectPath = await getPostLoginRedirectPath(user?.id);
                navigate(redirectPath);
            } catch (err) {
                console.error(err);
                navigate('/auth/login?error=failed_to_fetch_user');
            }
        };

        if (error) {
            // Handle OAuth errors
            console.error('OAuth error:', error);
            let errorMessage = 'Authentication failed. Please try again.';

            switch (error) {
                case 'oauth_failed':
                    errorMessage = 'Google authentication failed. Please try again.';
                    break;
                case 'oauth_error':
                    errorMessage = 'An error occurred during authentication.';
                    break;
                case 'oauth_denied':
                    errorMessage = 'Google authentication was denied.';
                    break;
                case 'token_generation_failed':
                    errorMessage = 'Failed to generate authentication tokens.';
                    break;
            }

            // Redirect to login with error message
            navigate(`/auth/login?error=${encodeURIComponent(errorMessage)}`);
            return;
        }

        if (token) {
            // Sync the access token into AuthContext (also persists to localStorage)
            setToken(token);
            fetchUser();
            return;
        }

        // If no token or error, redirect to login
        navigate('/auth/login');
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-gray-600">Completing authentication...</p>
                </div>
            </div>
        </div>
    );
};

export default OAuthCallback;
