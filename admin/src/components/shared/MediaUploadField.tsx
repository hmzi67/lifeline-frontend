import React from 'react';
import { Loader2, Link as LinkIcon, Upload, X } from 'lucide-react';
import { uploadFile, handleApiError } from '@/services/crudService';

type MediaKind = 'image' | 'audio' | 'video';

interface MediaUploadFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    accept: string;
    mediaKind: MediaKind;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    allowManualUrl?: boolean;
}

const previewByKind = (mediaKind: MediaKind, value: string) => {
    if (!value) return null;

    if (mediaKind === 'image') {
        return (
            <img
                src={value}
                alt="Preview"
                className="w-full max-w-md h-48 object-cover rounded-xl border border-gray-200"
                onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
            />
        );
    }

    if (mediaKind === 'audio') {
        return <audio controls className="w-full max-w-md" src={value} />;
    }

    return <video controls className="w-full max-w-md rounded-xl border border-gray-200 bg-black" src={value} />;
};

export const MediaUploadField: React.FC<MediaUploadFieldProps> = ({
    label,
    value,
    onChange,
    accept,
    mediaKind,
    required,
    disabled,
    placeholder,
    allowManualUrl = true,
}) => {
    const [uploading, setUploading] = React.useState(false);
    const [uploadError, setUploadError] = React.useState('');

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setUploadError('');

        try {
            const uploadedUrl = await uploadFile(file);
            onChange(uploadedUrl);
        } catch (error: any) {
            setUploadError(handleApiError(error));
        } finally {
            setUploading(false);
            event.target.value = '';
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                    <label className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${disabled || uploading ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200 cursor-pointer'}`}>
                        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        <span className="text-sm font-medium">{uploading ? 'Uploading…' : `Upload ${mediaKind}`}</span>
                        <input
                            type="file"
                            accept={accept}
                            onChange={handleFileChange}
                            disabled={disabled || uploading}
                            className="hidden"
                        />
                    </label>

                    {value && (
                        <button
                            type="button"
                            onClick={() => onChange('')}
                            disabled={disabled || uploading}
                            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-gray-500 hover:text-red-600 border border-gray-200 rounded-xl hover:border-red-200 transition-colors"
                        >
                            <X className="w-4 h-4" /> Clear
                        </button>
                    )}
                </div>

                {allowManualUrl && (
                    <div className="space-y-2">
                        <div className="relative">
                            <LinkIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="url"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                disabled={disabled || uploading}
                                placeholder={placeholder}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100"
                            />
                        </div>
                        <p className="text-xs text-gray-500">Upload a file or paste an existing URL.</p>
                    </div>
                )}

                {uploadError && (
                    <p className="text-sm text-red-600">{uploadError}</p>
                )}

                {value && (
                    <div className="space-y-2">
                        <p className="text-xs text-gray-500">Preview:</p>
                        {previewByKind(mediaKind, value)}
                    </div>
                )}
            </div>
        </div>
    );
};
