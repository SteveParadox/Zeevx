import React, { useState } from 'react';
import { useAuth } from './Auth'; // Assuming you have an Auth.js file
import { updateProfile } from 'firebase/auth'; // Assuming you are using Firebase Authentication

const Profile = () => {
  const user = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(user, { displayName, photoURL });
      console.log('Profile updated successfully');
      // You can add additional logic or feedback messages here
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <label>
          Display Name:
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Photo URL:
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleUpdateProfile}>Update Profile</button>
      {/* You can add more profile information or customization here */}
    </div>
  );
};

export default Profile;
