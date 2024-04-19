import React, { useState } from 'react';
import './Profileupdate.css'; // Import CSS file for styling
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../customer/state/Auth/registerSlice';

const UpadteProfile = () => {
  const { user } = useSelector(store => store.user)
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.mobile);
 const dispatch = useDispatch()
  const handleUpdateProfile = async() => {
    const userData = {
      firstName:firstName,
      lastName:lastName,
      email:email,
      mobile:phone
    }
    console.log(userData);
   await dispatch(updateUser(userData))
    // Logic for updating profile
   console.log("Profile updated!");
  };

  const handleAdminDashboard = () => {
    // Logic for navigating to admin dashboard
    console.log("Navigating to admin dashboard...");
  };

  return (
    <div className="profile-page">
      <div className="profile-section">
        <h3>Update Personal Information</h3>
        <div className="profile-field">
          <label>FirstName:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="profile-field">
          <label>LastName:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
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

     
      <div onClick={handleUpdateProfile} className="profile-buttons" style={{display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
        <button >Update Profile</button>
      </div>
    </div>
  );
};

export default UpadteProfile;
