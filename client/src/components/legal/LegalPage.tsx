import React from 'react';
import type { LegalPageData } from '@/types/legal';
import LegalSectionBody from './LegalSectionBody';

interface LegalPageProps {
    data: LegalPageData;
}

const LegalPage: React.FC<LegalPageProps> = ({ data }) => {
    return (
        <div className="min-h-screen bg-white">
            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-16">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {data.title}
                    </h1>
                    <p className="text-primary-500 text-sm font-medium">
                        Last Updated: {data.lastUpdated}
                    </p>
                </div>

                {/* Introduction */}
                <p className="text-gray-700 leading-relaxed text-base mb-12">
                    {data.introduction}
                </p>

                {/* Sections */}
                <div className="space-y-12">
                    {data.sections.map((section) => (
                        <section key={section.id} className="scroll-mt-20" id={section.id}>
                            <h2 className="text-2xl font-semibold text-primary-500 mb-4">
                                {section.title}
                            </h2>
                            <LegalSectionBody section={section} />
                        </section>
                    ))}
                </div>

                {/* Contact details */}
                {data.contact && (
                    <div className="mt-12 bg-gray-50 rounded-lg p-6">
                        <p className="text-gray-700 text-base">
                            <span className="font-semibold text-gray-900">Company: </span>
                            {data.contact.company}
                        </p>
                        <p className="text-gray-700 text-base mt-2">
                            <span className="font-semibold text-gray-900">Email: </span>
                            <a
                                href={`mailto:${data.contact.email}`}
                                className="text-primary-500 hover:text-primary-600 font-medium"
                            >
                                {data.contact.email}
                            </a>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LegalPage;
