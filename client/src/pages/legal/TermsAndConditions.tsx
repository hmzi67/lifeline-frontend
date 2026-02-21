import React from 'react';
import LegalPage from '@/components/legal/LegalPage';
import { TERMS_CONDITIONS_DATA } from '@/constants/legalConstants';

const TermsAndConditions: React.FC = () => {
    return <LegalPage data={TERMS_CONDITIONS_DATA} />;
};

export default TermsAndConditions;