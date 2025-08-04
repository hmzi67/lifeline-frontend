import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Loading from './common/Loading';

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    redirectTo = '/login'
}) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // Show loading spinner while checking authentication
    if (isLoading) {
        return <Loading />;
    }

    // If not authenticated, redirect to login with current location
    if (!isAuthenticated) {
        return <Navigate
            to={redirectTo}
            state={{ from: location }}
            replace
        />;
    }

    // If authenticated, render the protected component
    return <>{children}</>;
};

export default ProtectedRoute;
