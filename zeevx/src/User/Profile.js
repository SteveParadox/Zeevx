import React, { useState } from 'react';
import useAuth from "../Hooks/useAuth";
import { updateProfile } from 'firebase/auth'; 

const Profile = () => {
  const {auth} = useAuth();
  const [displayName, setDisplayName] = useState(auth?.displayName || '');
  const [photoURL, setPhotoURL] = useState(auth?.photoURL || '');

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(auth, { displayName, photoURL });
      console.log('Profile updated successfully');
      // You can add additional logic or feedback messages here
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  if (!auth) {
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
