import React from 'react';
import type { LegalPageData } from '@/types/legal';

interface LegalPageProps {
    data: LegalPageData;
}

const LegalPage: React.FC<LegalPageProps> = ({ data }) => {
    return (
        <div className="min-h-screen bg-white">
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* Page Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {data.title}
                    </h1>
                </div>

                {/* Content Container - No Card */}
                <div className="space-y-12">
                    {/* Last Updated */}
                    <div className="mb-8">
                        <p className="text-cyan-500 text-sm font-medium">
                            Last Updated: {data.lastUpdated}
                        </p>
                    </div>

                    {/* Introduction */}
                    <div className="mb-12">
                        <p className="text-gray-700 leading-relaxed text-base">
                            {data.introduction}
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="space-y-12">
                        {data.sections.map((section) => (
                            <section key={section.id} className="scroll-mt-20" id={section.id}>
                                <h2 className="text-2xl font-semibold text-cyan-500 mb-6">
                                    {section.title}
                                </h2>
                                <div className="prose prose-gray max-w-none">
                                    <p className="text-gray-700 leading-relaxed text-base">
                                        {section.content}
                                    </p>
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalPage;