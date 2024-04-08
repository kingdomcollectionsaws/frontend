import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../state/Auth/registerSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function LoginForm() {
  const { user,error,loading} = useSelector(store => store.user)
  const { cart} = useSelector(store => store.cart)
  const dispatch = useDispatch();
  const notify = (msg) => toast(msg, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,});
  
  const handleSubmit = async(event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
 const userData = {
 
  email:data.get("email"),
  password:data.get("password"),
}

try {
  if( user){
    if(user.role=='GUEST'){
      await dispatch(loginUser(userData));
      for (let index = 0; index < cart.cartItems.length; index++) {
        let data = {productId:cart.cartItems[index].product._id}
       await dispatch(addItemInCart(data)); }
  }
  navigate('/checkout?step=2')
    }else{
      await dispatch(loginUser(userData));
      navigate('/')
    }
} catch (err) {
  console.log(err);
}
  }
  
  const navigate = useNavigate()
  return (
    <>
   
    <div>
    <ToastContainer/>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',margin:'2rem',marginTop:'-1rem'}}>
        <div style={{fontWeight:'bold'}}>
          Sign in
        </div>
        <div style={{display:'flex',border:'2px solid black',borderRadius:'15px',padding:'.3rem',width:'5rem',justifyContent:'center'}}>
          <button onClick={()=>navigate("/register")} >Register</button>
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
                sx={{background:"black",borderRadius:'20px'}}
                >
              Sign in
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
