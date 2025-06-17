import React from "react";


interface BlogCardProps {
    title: string;
    excerpt: string;
    imageUrl: string;
    readMoreLink: string;
    size?: 'small' | 'medium' | 'large' | 'featured';
}

export const BlogCard: React.FC<BlogCardProps> = ({title, excerpt, imageUrl, readMoreLink, size = 'medium'}) => {
    if (size === 'featured') {
        return (
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="h-80 bg-gray-200 relative overflow-hidden">
            <img
                src={imageUrl}
        alt={title}
        className="w-full h-full object-cover"
            />
            </div>
            <div className="p-6">
        <h2 className="font-bold text-gray-900 text-2xl mb-3 leading-tight">
            {title}
            </h2>
            <p className="text-gray-600 text-base mb-4 leading-relaxed">
            {excerpt}
            </p>
            <a
        href={readMoreLink}
        className="text-teal-500 text-sm font-semibold hover:text-teal-600 transition-colors duration-200"
            >
            READ MORE →
                    </a>
                    </div>
                    </div>
    );
    }

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="h-48 bg-gray-200 relative overflow-hidden">
        <img
            src={imageUrl}
    alt={title}
    className="w-full h-full object-cover"
        />
        </div>
        <div className="p-4">
    <h3 className="font-semibold text-gray-800 text-lg mb-2 leading-tight">
        {title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 leading-relaxed">
        {excerpt}
        </p>
        <a
    href={readMoreLink}
    className="text-teal-500 text-sm font-semibold hover:text-teal-600 transition-colors duration-200"
        >
        READ MORE →
                </a>
                </div>
                </div>
);
};
