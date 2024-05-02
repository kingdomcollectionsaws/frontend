import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import GuestForm from './GuestForm.jsx';
import { useLocation } from 'react-router-dom';
import { GoX } from "react-icons/go";
import { getUserDetail } from '../state/Auth/registerSlice.js';
const style = {
  borderRadius:'20px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    outline:"none",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }
  import { useDispatch, useSelector } from 'react-redux';
export default function AuthModel({ handleClose, open}) {
  const dispatch = useDispatch();
  const { user} = useSelector(store => store.user);
  useEffect(()=>{
    dispatch(getUserDetail())
  },[])
const location = useLocation()
  return (
    <>
    {
     !user ||  user?.role == 'GUEST' ? <div>
      
      <Modal
        open={open}
        onClose={handleClose}
       
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        
        <Box sx={style} className="sm:w-300"  >
     
        <div style={{position:'absolute',top:'-8%',cursor:'pointer',fontSize:'2rem',right:'-2%'}} onClick={handleClose} >
        <GoX style={{color:'#fff'}} />
      </div>
        {
    location.pathname === "/login" ? <LoginForm /> : location.pathname === "/register" ? <RegisterForm />  : <GuestForm />
}

       
        
        </Box>
      </Modal>
    </div>:''
    }
    </>
  )
}
