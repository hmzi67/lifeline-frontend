import React, { useEffect } from 'react';
import { useAuthStore, useUIStore } from '../../stores';

interface StoreInitializerProps {
    children: React.ReactNode;
}

export const StoreInitializer: React.FC<StoreInitializerProps> = ({ children }) => {
    const { checkAuthStatus, setLoading } = useAuthStore();
    const { setTheme } = useUIStore() as { setTheme: (theme: 'light' | 'dark' | 'system') => void };

    useEffect(() => {
        const initializeApp = async () => {
            // Initialize theme from localStorage, default to light
            const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' || 'light';
            setTheme(savedTheme);

            // Ensure document starts with correct theme
            const root = document.documentElement;
            root.classList.remove('dark'); // Remove any existing dark class

            // Check authentication status
            try {
                setLoading(true);
                await checkAuthStatus();
            } catch (error) {
                console.error('Failed to check auth status:', error);
            } finally {
                setLoading(false);
            }
        };

        initializeApp();
    }, [checkAuthStatus, setLoading, setTheme]);

    return <>{children}</>;
};
