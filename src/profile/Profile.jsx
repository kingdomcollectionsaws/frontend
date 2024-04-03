import React, { useEffect } from 'react';
import { AiOutlineShopping, AiOutlineEdit, AiOutlineUser, AiOutlineDashboard } from 'react-icons/ai'; // Import icons from react-icons
import './ProfilePage.css'; // Import your CSS file for styling
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../customer/Loader';
import { useNavigate } from 'react-router-dom';
import { getUserDetail, logout } from '../customer/state/Auth/registerSlice';

function ProfilePage() {
    const {user,loading} = useSelector(store=>store.user);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const logouthandle = ()=>{
        dispatch(logout())
        localStorage.clear();
        navigate('/');
        // window.location.reload();
          }
          useEffect(()=>{
            dispatch(getUserDetail())
          },[])
  return (
    !loading?<div className="container mt-14">
    <div className="profile-card">
      <div className="profile-picture">
        <img src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" alt="Profile" />
      </div>
      <div className="profile-info">
        <h2>User Profile</h2>
        <ul>
          <li><strong>Name:</strong> {user?.firstName} {user?.lastName}</li>
          <li><strong>Email:</strong> {user?.email}</li>
          <li><strong>Phone:</strong> {user?.mobile}</li>
        
        </ul>
      </div>
    </div>
    <div className="profile-buttons" style={{backgroundColor:'white'}}>
      <button className="profile-button" onClick={()=>navigate('/account/order')}><AiOutlineShopping /> My Orders</button>
      <button className="profile-button" onClick={()=>navigate('/checkout?step=2')}><AiOutlineEdit  /> Address Update</button>
      <button className="profile-button" onClick={()=>navigate('/profile/update')}><AiOutlineUser /> Update Profile</button>
     {user?.role === "ADMIN"? <button className="profile-button" onClick={()=>navigate('/AdmIn')}><AiOutlineDashboard /> Admin Dashboard</button>:''}
      <button className="profile-button" onClick={logouthandle}><AiOutlineUser /> Logout</button>
    </div>
  </div>:<Loader/>
  );
}

export default ProfilePage;
