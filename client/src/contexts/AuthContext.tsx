import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { AuthUser } from '../types/auth.types';
import { api } from '../services/api';

interface AuthContextType {
    user: AuthUser | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    setUser: (user: AuthUser | null) => void;
    setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setTokenState] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Memoize isAuthenticated to prevent unnecessary re-renders
    const isAuthenticated = useMemo(() => !!user && !!token, [user, token]);

    // Initialize auth state from localStorage
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const storedToken = localStorage.getItem('token');
                const storedUser = localStorage.getItem('user');

                if (storedToken && storedUser) {
                    setTokenState(storedToken);
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
                clearAuthState();
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth().then(r => console.log(r));
    }, []);

    const clearAuthState = () => {
        setUser(null);
        setTokenState(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
    };

    const setToken = (newToken: string | null) => {
        setTokenState(newToken);
        if (newToken) {
            localStorage.setItem('token', newToken);
            sessionStorage.setItem('token', newToken);
        } else {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
        }
    };

    const updateUser = (newUser: AuthUser | null) => {
        setUser(newUser);
        if (newUser) {
            localStorage.setItem('user', JSON.stringify(newUser));
            sessionStorage.setItem('user', JSON.stringify(newUser));
        } else {
            localStorage.removeItem('user');
            sessionStorage.removeItem('user');
        }
    };

    const login = async (email: string, password: string, rememberMe: boolean): Promise<void> => {
        try {
            const response = await api.post('/auth/login', {
                email,
                password,
            });

            if (response.data.success) {
                //   if (rememberMe) {
                const { user, accessToken } = response.data.data;
                setToken(accessToken);
                updateUser(user);
                //   }
            } else {
                throw new Error(response.data.message || 'Login failed');
            }
        } catch (error: any) {
            // // If API is not available, provide mock login for testing
            // if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
            //     console.warn('API not available');
            // }

            // const errorMessage = error.response?.data?.message || error.message || 'Login failed';
            // throw new Error(errorMessage);
            if (error.response?.data?.errors) {
                throw error.response.data.errors;
            }

            throw new Error(error.response?.data?.message || error.message || 'Signin failed');
        }
    };

    const signup = async (name: string, email: string, password: string): Promise<void> => {
        try {
            const response = await api.post('/auth/signup', { name, email, password });

            if (response.data.success) {
                const { user: userData, token: userToken } = response.data;
                setToken(userToken);
                updateUser(userData);
            } else {
                throw new Error(response.data.message || 'Signup failed');
            }
        } catch (error: any) {
            if (error.response?.data?.errors) {
                throw error.response.data.errors;
            }

            throw new Error(error.response?.data?.message || error.message || 'Signup failed');
        }
    };


    const logout = () => {
        clearAuthState();
        // Redirect to home page
        window.location.href = '/';
    };

    // Memoize context value to prevent unnecessary re-renders
    const value = useMemo(() => ({
        user,
        token,
        isLoading,
        isAuthenticated,
        login,
        signup,
        logout,
        setUser: updateUser,
        setToken,
    }), [user, token, isLoading, isAuthenticated]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
