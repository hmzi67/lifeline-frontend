import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Zap, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login, loading, error, isAuthenticated, clearError } = useAuthStore();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    // Clear store error when user starts typing
    useEffect(() => {
        if (error) clearError();
    }, [email, password]);

    const validate = (): boolean => {
        const errors: typeof fieldErrors = {};
        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Enter a valid email address';
        }
        if (!password) {
            errors.password = 'Password is required';
        }
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        await login({ email: email.trim(), password });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 flex items-center justify-center p-4">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-teal-100 to-cyan-200 rounded-full opacity-40 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-100 to-cyan-200 rounded-full opacity-40 blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                    {/* Top gradient bar */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-teal-400 to-cyan-500" />

                    <div className="p-10">
                        {/* Logo & Title */}
                        <div className="flex flex-col items-center mb-10">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg mb-4">
                                <Zap className="w-9 h-9 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                                Lifeline Admin
                            </h1>
                            <p className="text-gray-500 text-sm mt-2">Sign in to your admin account</p>
                        </div>

                        {/* API Error Banner */}
                        {error && (
                            <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} noValidate className="space-y-5">
                            {/* Email */}
                            <div className="space-y-1.5">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                    Email address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: undefined }));
                                        }}
                                        placeholder="admin@example.com"
                                        className={`pl-10 h-11 rounded-xl border-gray-200 focus:border-teal-400 focus:ring-teal-400 transition-colors ${fieldErrors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''
                                            }`}
                                        disabled={loading}
                                    />
                                </div>
                                {fieldErrors.email && (
                                    <p className="text-xs text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {fieldErrors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            if (fieldErrors.password) setFieldErrors((p) => ({ ...p, password: undefined }));
                                        }}
                                        placeholder="••••••••"
                                        className={`pl-10 pr-10 h-11 rounded-xl border-gray-200 focus:border-teal-400 focus:ring-teal-400 transition-colors ${fieldErrors.password ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''
                                            }`}
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {fieldErrors.password && (
                                    <p className="text-xs text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {fieldErrors.password}
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-11 mt-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Signing in…
                                    </span>
                                ) : (
                                    'Sign in'
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="px-10 pb-8 text-center">
                        <p className="text-xs text-gray-400">
                            Lifeline Admin Panel &mdash; Authorized personnel only
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
