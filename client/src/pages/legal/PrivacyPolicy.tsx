import React from 'react';
import LegalPage from '@/components/legal/LegalPage';
import { PRIVACY_POLICY_DATA } from '@/constants/legalConstants';

const PrivacyPolicy: React.FC = () => {
    return <LegalPage data={PRIVACY_POLICY_DATA} />;
};

export default PrivacyPolicy;