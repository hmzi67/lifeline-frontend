import React from 'react';
import { X, Loader2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface FormField {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'number' | 'select' | 'file' | 'checkbox' | 'date' | 'time';
    required?: boolean;
    placeholder?: string;
    options?: Array<{ value: string; label: string }>;
    accept?: string; // For file inputs
    rows?: number; // For textarea
    min?: number; // For number inputs
    max?: number; // For number inputs
    disabled?: boolean;
}

export interface FormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Record<string, any>) => Promise<void>;
    title: string;
    fields: FormField[];
    initialData?: Record<string, any>;
    submitLabel?: string;
    cancelLabel?: string;
}

export const FormModal: React.FC<FormModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    fields,
    initialData = {},
    submitLabel = 'Save',
    cancelLabel = 'Cancel',
}) => {
    const [formData, setFormData] = React.useState<Record<string, any>>(initialData);
    const [loading, setLoading] = React.useState(false);
    const [submitError, setSubmitError] = React.useState<string | null>(null);
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [previewUrls, setPreviewUrls] = React.useState<Record<string, string>>({});

    React.useEffect(() => {
        if (isOpen) {
            setFormData(initialData);
            setErrors({});
            setSubmitError(null);
            // Set preview URLs for existing images
            const previews: Record<string, string> = {};
            fields.forEach((field) => {
                if (field.type === 'file' && initialData[field.name]) {
                    previews[field.name] = initialData[field.name];
                }
            });
            setPreviewUrls(previews);
        }
    }, [isOpen, initialData, fields]);

    const handleChange = (name: string, value: any) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
        if (submitError) setSubmitError(null);
    };

    const handleFileChange = (name: string, file: File | null) => {
        if (file) {
            setFormData((prev) => ({ ...prev, [name]: file }));
            // Create preview URL
            const url = URL.createObjectURL(file);
            setPreviewUrls((prev) => ({ ...prev, [name]: url }));
        } else {
            setFormData((prev) => {
                const newData = { ...prev };
                delete newData[name];
                return newData;
            });
            setPreviewUrls((prev) => {
                const newUrls = { ...prev };
                delete newUrls[name];
                return newUrls;
            });
        }
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        fields.forEach((field) => {
            if (field.required && !formData[field.name]) {
                newErrors[field.name] = `${field.label} is required`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setLoading(true);
        setSubmitError(null);
        try {
            await onSubmit(formData);
            onClose();
        } catch (error: any) {
            console.error('Form submission error:', error);
            setSubmitError(error.message || 'An error occurred while saving.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50">
                    <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        disabled={loading}
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                    <div className="space-y-4">
                        {/* ... fields ... */}
                        {fields.map((field) => (
                            <div key={field.name}>
                                {/* ... field rendering ... */}
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {field.label}
                                    {field.required && <span className="text-red-500 ml-1">*</span>}
                                </label>

                                {field.type === 'text' && (
                                    <input
                                        type="text"
                                        value={formData[field.name] || ''}
                                        onChange={(e) => handleChange(field.name, e.target.value)}
                                        placeholder={field.placeholder}
                                        disabled={field.disabled || loading}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                    />
                                )}

                                {field.type === 'textarea' && (
                                    <textarea
                                        value={formData[field.name] || ''}
                                        onChange={(e) => handleChange(field.name, e.target.value)}
                                        placeholder={field.placeholder}
                                        rows={field.rows || 4}
                                        disabled={field.disabled || loading}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                    />
                                )}

                                {field.type === 'number' && (
                                    <input
                                        type="number"
                                        value={formData[field.name] || ''}
                                        onChange={(e) => handleChange(field.name, parseFloat(e.target.value))}
                                        placeholder={field.placeholder}
                                        min={field.min}
                                        max={field.max}
                                        disabled={field.disabled || loading}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                    />
                                )}

                                {field.type === 'select' && (
                                    <select
                                        value={formData[field.name] || ''}
                                        onChange={(e) => handleChange(field.name, e.target.value)}
                                        disabled={field.disabled || loading}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                    >
                                        <option value="">Select {field.label}</option>
                                        {field.options?.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                )}

                                {field.type === 'checkbox' && (
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData[field.name] || false}
                                            onChange={(e) => handleChange(field.name, e.target.checked)}
                                            disabled={field.disabled || loading}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">{field.placeholder}</span>
                                    </div>
                                )}

                                {field.type === 'date' && (
                                    <input
                                        type="date"
                                        value={formData[field.name] || ''}
                                        onChange={(e) => handleChange(field.name, e.target.value)}
                                        disabled={field.disabled || loading}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                    />
                                )}

                                {field.type === 'time' && (
                                    <input
                                        type="time"
                                        value={formData[field.name] || ''}
                                        onChange={(e) => handleChange(field.name, e.target.value)}
                                        disabled={field.disabled || loading}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                    />
                                )}

                                {field.type === 'file' && (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-4">
                                            <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
                                                <Upload className="w-4 h-4" />
                                                <span className="text-sm">Choose File</span>
                                                <input
                                                    type="file"
                                                    accept={field.accept}
                                                    onChange={(e) => handleFileChange(field.name, e.target.files?.[0] || null)}
                                                    disabled={field.disabled || loading}
                                                    className="hidden"
                                                />
                                            </label>
                                            {formData[field.name] && (
                                                <span className="text-sm text-gray-600">
                                                    {formData[field.name] instanceof File
                                                        ? formData[field.name].name
                                                        : 'File selected'}
                                                </span>
                                            )}
                                        </div>
                                        {previewUrls[field.name] && (
                                            <div className="relative w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
                                                <img
                                                    src={previewUrls[field.name]}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}

                                {errors[field.name] && (
                                    <p className="text-sm text-red-600 mt-1">{errors[field.name]}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    {submitError && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">{submitError}</p>
                        </div>
                    )}
                </form>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={loading}
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            submitLabel
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};
