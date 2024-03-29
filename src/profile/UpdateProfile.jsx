import React, { useState } from 'react';
import './Profileupdate.css'; // Import CSS file for styling

const UpadteProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleUpdateProfile = () => {
    // Logic for updating profile
    console.log("Profile updated!");
  };

  const handleAdminDashboard = () => {
    // Logic for navigating to admin dashboard
    console.log("Navigating to admin dashboard...");
  };

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <div className="profile-section">
        <h3>Personal Information</h3>
        <div className="profile-field">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="profile-field">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="profile-field">
          <label>Phone:</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
      </div>

     
      <div className="profile-buttons">
        <button onClick={handleUpdateProfile}>Update Profile</button>
      </div>
    </div>
  );
};

export default UpadteProfile;
