import { Button, Grid, TextField, dialogActionsClasses } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, getUserDetail, updateUser } from '../state/Auth/registerSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function RegisterForm() {
  const { user} = useSelector(store => store.user)
  const dispatch = useDispatch();

  const notify = (msg) => toast(msg, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
  });
  const handleSubmit = async(event) => {
    event.preventDefault();
    if (user && user.role == 'GUEST') {
      const data = new FormData(event.currentTarget);
      const userData = {
        firstName: data.get("firstname"),
        lastName: data.get("lastname"),
        email: data.get("email"),
        password: data.get("password"),
        mobile: data.get("mobile"),
        joiningBonus:50
      }
      console.log(userData);
    await  dispatch(updateUser(userData));
     navigate('/checkout?step=2')
//window.location.reload()

    } else {
      const data = new FormData(event.currentTarget);
      const userData = {
        firstName: data.get("firstname"),
        lastName: data.get("lastname"),
        email: data.get("email"),
        password: data.get("password"),
        mobile: data.get("mobile"),
      }

     await dispatch(createUser(userData))
     
      if (!user){
        notify("smothing is wrong or email already used");
      }else{
         navigate('/')
      }
     
    }
  }
 
  const navigate = useNavigate()
  return (
    <>
      <ToastContainer />
      <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',margin:'2rem',marginTop:'-1rem'}}>
        <div style={{fontWeight:'bold'}}>
          Sign up
        </div>
        <div style={{display:'flex',border:'2px solid black',borderRadius:'15px',padding:'.3rem',width:'5rem',justifyContent:'center'}}>
          <button onClick={()=>navigate("/login")} >Sign in</button>
        </div>

       </div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} >
              <TextField
                required
                id='fisrtname'
                name='firstname'
                label='First Name'
                fullWidth
                autoComplete='given-name'
                style={{borderRadius:'10px'}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='lastname'
                name='lastname'
                label='Last Name'
                fullWidth
                autoComplete='given-name'
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                required
                id='email'
                name='email'
                label='Email'
                type='email'
                fullWidth
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                required
                id='mobile'
                name='mobile'
                label='Mobile'
                type='number'
                fullWidth
                autoComplete='number'
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                required
                id='password'
                name='password'
                label='Password'
                type='password'
                fullWidth
                autoComplete='password'
              />
            </Grid>
            <Grid item xs={12} >
              <Button
                className=' w-full px-0 py-3'
                type='submit'
                variant='contained'
                sx={{ background: "black",borderRadius:'20px' }}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
        <div>
        </div>
      </div>
    </>
  )
}
