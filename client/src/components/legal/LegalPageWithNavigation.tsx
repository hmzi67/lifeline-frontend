import React, { useState, useEffect } from 'react';
import type { LegalPageData } from '@/types/legal';
import LegalNavigation from './LegalNavigation';

interface LegalPageWithNavigationProps {
    data: LegalPageData;
}

const LegalPageWithNavigation: React.FC<LegalPageWithNavigationProps> = ({ data }) => {
    const [activeSection, setActiveSection] = useState<string>();

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(sectionId);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = data.sections.map(section => ({
                id: section.id,
                element: document.getElementById(section.id)
            }));

            const current = sections.find(section => {
                if (section.element) {
                    const rect = section.element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });

            if (current) {
                setActiveSection(current.id);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [data.sections]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {data.title}
                    </h1>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar Navigation */}
                    <div className="w-80 flex-shrink-0">
                        <LegalNavigation
                            sections={data.sections}
                            activeSection={activeSection}
                            onSectionClick={scrollToSection}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 lg:p-12">
                            {/* Last Updated */}
                            <div className="mb-8">
                                <p className="text-cyan-500 text-sm font-medium">
                                    Last Updated: {data.lastUpdated}
                                </p>
                            </div>

                            {/* Introduction */}
                            <div className="mb-10">
                                <p className="text-gray-700 leading-relaxed text-base">
                                    {data.introduction}
                                </p>
                            </div>

                            {/* Sections */}
                            <div className="space-y-10">
                                {data.sections.map((section) => (
                                    <section key={section.id} className="scroll-mt-20" id={section.id}>
                                        <h2 className="text-xl font-semibold text-cyan-500 mb-4">
                                            {section.title}
                                        </h2>
                                        <div className="prose prose-gray max-w-none">
                                            <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                                                {section.content}
                                            </p>
                                        </div>
                                    </section>
                                ))}
                            </div>

                            {/* Contact Information */}
                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                        Questions or Concerns?
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        If you have any questions about this {data.title.toLowerCase()}, please contact us at{' '}
                                        <a
                                            href="mailto:legal@fitapp.com"
                                            className="text-cyan-500 hover:text-cyan-600 font-medium"
                                        >
                                            legal@fitapp.com
                                        </a>{' '}
                                        or write to us at: FitApp Inc., 123 Fitness Street, Health City, HC 12345, United States.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalPageWithNavigation;