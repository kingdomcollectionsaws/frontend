import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../state/Auth/registerSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function GuestForm() {
  const { user,error,loading} = useSelector(store => store.user)
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
  
  email:data.get("email"),
  password:data.get("password"),
}
      dispatch(loginUser(userData));
      const token  = localStorage.getItem('jwt');
    if (error!=null&&  loading==false&&!token ) {
      notify("inavlid email or password");
    }
    
  
  }

  const navigate = useNavigate()
  return (
    <>
   
    <div>
      
    <ToastContainer/>
   
  <div style={{borderBottom:'1px solid #D4D4D4', padding:'1rem',width:'100%', marginTop:'-2rem'}}>
    <p style={{paddingBottom:'1rem'}}>Go to checkout</p>
  <button style={{display:'flex', width:'100%',height:'3rem',border:' 2px solid black', borderRadius:'20px' , alignItems:'center',justifyContent:'center', color:'black',marginBottom:'1rem'}} onClick={()=>navigate("/checkout?step=2")}>continue as a guest</button>
  </div>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',margin:'2rem'}}>
        <div style={{fontWeight:'bold'}}>
          Sign in
        </div>
        <div style={{display:'flex',border:'2px solid black',borderRadius:'15px',padding:'.3rem',width:'5rem',justifyContent:'center'}}>
          <button onClick={()=>navigate("/register")} >register</button>
        </div>

       </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
 
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
              Login
                </Button>
                 </Grid>

        </Grid>
      </form>
      <div>
      <div style={{marginTop:'1rem'}}>
            <Button
                className='px-0 py-10'
                sx={{background:"none",color:'black',fontSize:'.7rem'}}
                >Forgot your password?
                </Button>
        
        </div>
      </div>
    </div>
    </>
  )
}
