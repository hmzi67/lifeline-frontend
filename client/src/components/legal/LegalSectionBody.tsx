import React from 'react';
import { Link } from 'react-router-dom';
import type { LegalListItem, LegalSection } from '@/types/legal';

const LegalList: React.FC<{ items: LegalListItem[] }> = ({ items }) => (
    <ul className="mt-4 space-y-3 list-disc pl-5 marker:text-primary-500">
        {items.map((item, index) => (
            <li key={index} className="text-gray-700 leading-relaxed text-base">
                {item.label && (
                    <span className="font-semibold text-gray-900">{item.label}: </span>
                )}
                {item.text}
            </li>
        ))}
    </ul>
);

/** Renders the body of a legal section: intro, list, subsections, note, outro, link. */
const LegalSectionBody: React.FC<{ section: LegalSection }> = ({ section }) => (
    <>
        {section.content && (
            <p className="text-gray-700 leading-relaxed text-base">{section.content}</p>
        )}

        {section.items && <LegalList items={section.items} />}

        {section.subsections?.map((subsection, index) => (
            <div key={index} className="mt-6">
                {subsection.title && (
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {subsection.title}
                    </h3>
                )}
                {subsection.content && (
                    <p className="text-gray-700 leading-relaxed text-base">
                        {subsection.content}
                    </p>
                )}
                {subsection.items && <LegalList items={subsection.items} />}
            </div>
        ))}

        {section.note && (
            <p className="mt-6 border-l-4 border-primary-500 bg-cyan-50 rounded-r-lg px-5 py-4 text-gray-800 leading-relaxed text-base font-medium">
                {section.note}
            </p>
        )}

        {section.outro && (
            <p className="mt-4 text-gray-700 leading-relaxed text-base">{section.outro}</p>
        )}

        {section.link && (
            <Link
                to={section.link.to}
                className="inline-block mt-4 text-primary-500 hover:text-primary-600 font-medium underline underline-offset-4"
            >
                {section.link.label}
            </Link>
        )}
    </>
);

export default LegalSectionBody;
