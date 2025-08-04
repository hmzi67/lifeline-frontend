import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Loading from './common/Loading';

interface PublicRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
    children,
    redirectTo = '/dashboard'
}) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // Show loading spinner while checking authentication
    if (isLoading) {
        return <Loading />;
    }

    // If authenticated, redirect to dashboard (or intended destination)
    if (isAuthenticated) {
        const intendedDestination = location.state?.from?.pathname || redirectTo;
        return <Navigate to={intendedDestination} replace />;
    }

    // If not authenticated, render the public component (login/signup)
    return <>{children}</>;
};

export default PublicRoute;
