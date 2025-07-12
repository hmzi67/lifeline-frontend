import React from 'react';
import { cn } from '@/lib/utils';

interface LinkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'subtle';
    href?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({
    children,
    className,
    variant = 'default',
    href,
    ...props
}) => {
    const baseClasses = "font-medium transition-colors duration-200 focus:outline-none focus:underline";

    const variantClasses = {
        default: "text-cyan-500 hover:text-cyan-600",
        subtle: "text-gray-600 hover:text-gray-800"
    };

    if (href) {
        return (
            <a
                href={href}
                className={cn(baseClasses, variantClasses[variant], className)}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            className={cn(baseClasses, variantClasses[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default LinkButton;