import React from 'react';
import GoogleOAuthButton from './GoogleOAuthButton';

const SocialAuthButtons: React.FC = () => {
    return (
        <div className="flex">
            <GoogleOAuthButton text="Continue With Google" />
        </div>
    );
};

export default SocialAuthButtons;
