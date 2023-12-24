import React, { useState } from 'react';
import { auth, provider } from './firebase.js';
import { signInWithPopup } from 'firebase/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your traditional login logic here
    // You can use state values (username and password) for authentication
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Logged in with Google:', user);
      // Add your logic after successful Google login
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {/* Your existing login form */}
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>

      {/* Google login button */}
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
