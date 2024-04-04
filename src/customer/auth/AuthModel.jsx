import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import GuestForm from './GuestForm.jsx';
import { useLocation } from 'react-router-dom';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    outline:"none",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }

export default function AuthModel({ handleClose, open}) {
const location = useLocation()
  return (
    <>
     <div>
      <Modal
        open={open}
        onClose={handleClose}
       
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
         
       
        {
    location.pathname === "/login" ? <LoginForm /> : location.pathname === "/register" ? <RegisterForm /> : <GuestForm />
}

       
        
        </Box>
      </Modal>
    </div>
    </>
  )
}
