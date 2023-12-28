import React from 'react';
import { UserAgentApplication } from 'msal';

const config = {
  auth: {
    clientId: 'Your-Application-Client-ID',
    authority: 'https://login.microsoftonline.com/Your-Tenant-ID',
    redirectUri: 'http://localhost:3000/callback',
  },
};

const msalInstance = new UserAgentApplication(config);

const MicrosoftLogin = ({ onMicrosoftLogin }) => {
  const handleLogin = async () => {
    try {
      const loginResponse = await msalInstance.loginPopup();

      // Access user information from loginResponse
      console.log('Logged in:', loginResponse);

      // Pass user information to the parent component
      onMicrosoftLogin(loginResponse);
    } catch (error) {
      console.error('Error signing in with Microsoft:', error.message);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Microsoft</button>
    </div>
  );
};

export default MicrosoftLogin;
