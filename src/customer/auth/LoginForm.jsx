import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../state/Auth/registerSlice';
export default function LoginForm() {
  const { user,error} = useSelector(store => store.user)
  const dispatch = useDispatch();
  const handleSubmit = (event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
const userData = {
  email:data.get("email"),
  password:data.get("password"),
}
      dispatch(loginUser(userData));


  }

  useEffect(()=>{
  
   if(error){
    console.log(error);
   }
  
},[error,user])
  const navigate = useNavigate()
  return (
    <>
    <div>
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
                sx={{background:"#9155FD"}}
                >
              Login
                </Button>
                 </Grid>

        </Grid>
      </form>
      <div>
        <div>
          <p>if you don't have a account?<span>  <Button
                className='px-0 py-3'
                sx={{background:"none"}}
                onClick={()=>navigate("/register")}
                >Register
                </Button></span></p>
        
        </div>
      </div>
    </div>
    </>
  )
}
