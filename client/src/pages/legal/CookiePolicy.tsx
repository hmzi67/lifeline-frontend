import React from 'react';
import LegalPage from '@/components/legal/LegalPage';
import { COOKIE_POLICY_DATA } from '@/constants/legalConstants';

const CookiePolicy: React.FC = () => {
    return <LegalPage data={COOKIE_POLICY_DATA} />;
};

export default CookiePolicy;
