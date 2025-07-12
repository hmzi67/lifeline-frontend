import React from 'react';

interface FormInputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    error?: string;
    onRightIconClick?: () => void;
    className?: string;
    required?: boolean;
}



const FormInput: React.FC<FormInputProps> = ({
    type,
    placeholder,
    value,
    onChange,
    icon,
    rightIcon,
    error,
    className = "",
    required = false
}) => {
    return (
        <div className="relative">
            {icon && (
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    {icon}
                </div>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className={`w-full border focus:outline-none focus:ring-2 transition-all ${className} ${error ? 'border-red-300 focus:border-red-400 focus:ring-red-400/20' : ''
                    }`}
            />
            {rightIcon && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    {rightIcon}
                </div>
            )}
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    );
};

export default FormInput;