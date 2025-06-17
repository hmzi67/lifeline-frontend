import React from 'react';
import type { LegalSection } from '@/types/legal';

interface LegalNavigationProps {
    sections: LegalSection[];
    activeSection?: string;
    onSectionClick: (sectionId: string) => void;
}

const LegalNavigation: React.FC<LegalNavigationProps> = ({
    sections,
    activeSection,
    onSectionClick
}) => {
    return (
        <div className="sticky top-8">
            {/* No card wrapper - direct content */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Table of Contents
                </h3>
                <nav className="space-y-1">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => onSectionClick(section.id)}
                            className={`block w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${activeSection === section.id
                                    ? 'bg-cyan-50 text-cyan-600 font-medium border-l-4 border-cyan-500'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            {section.title}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default LegalNavigation;