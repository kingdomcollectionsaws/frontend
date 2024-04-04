import { Button, Grid, TextField, dialogActionsClasses } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { createUser } from '../state/Auth/registerSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function RegisterForm() {
  const  {user,error} = useSelector(store => store.user)
 const dispatch = useDispatch(); 

 const notify = (msg) => toast(msg, {
  position: "bottom-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,});
  const handleSubmit = (event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
const userData = {
  firstName:data.get("firstname"),
  lastName:data.get("lastname"),
  email:data.get("email"),
  password:data.get("password"),
  mobile:data.get("mobile"),
}

dispatch(createUser(userData))

if (error!=null) {
  notify("smothing is wrong or email already used");
}
  }
  const navigate = useNavigate()
  return (
    <>
    <ToastContainer/>
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
            required
            id='fisrtname'
            name='firstname'
            label='First Name'
            fullWidth
            autoComplete='given-name'
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
                sx={{background:"black"}}
                >
                  Register
                </Button>
                 </Grid>        
        </Grid>
      </form>
      <div>
        <div>
          <p>if you have already account? <span>  <Button
                className='px-0 py-3'
                sx={{background:"none"}}
                onClick={()=>navigate(-1)}
                >
                 Login
                </Button></span></p>
        
        </div>
      </div>
    </div>
    </>
  )
}
