import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserDetail, loginUser } from '../state/Auth/registerSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addItemInCart } from '../state/cart/cartSlice';

export default function LoginForm() {
  const { user,jwt } = useSelector(store => store.user);
  const [userdetails,setUserdetails] = useState(null)
  const { cart } = useSelector(store => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notify = (msg) => toast(msg, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
  });
//const jwt = localStorage.getItem('jwt');

const handleSubmit =  async(event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const userData = {
    email: data.get("email"),
    password: data.get("password"),
  };
 if(user && user.role == 'GUEST'){
  console.log(cart);
  let itemIds = [];
  for (let index = 0; index < cart.cartItems.length; index++) {
    // Get the ID of the current cartItem
    let itemId = cart.cartItems[index].product._id;
    
    // Push the ID into the array
    itemIds.push(itemId);
}

// Store the array of IDs in localStorage
localStorage.setItem('items', JSON.stringify(itemIds));
 await dispatch(loginUser(userData));
  if(user.role=='GUEST'){
    setTimeout(()=>{
     notify("invalid email or password")
     },[2000])
     dispatch(getUserDetail());
  }else{

  }
 
 }else{
   dispatch(loginUser(userData));
   if(jwt){
    
   }else{
    setTimeout(()=>{
      notify("invalid email or password")
     },[2000])
   }
 }
};

  useEffect(() => {
    dispatch(getUserDetail());
 
    
  }, []);


  return (
    <>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '2rem', marginTop: '-1rem' }}>
          <ToastContainer />
          <div style={{ fontWeight: 'bold' }}>
            Sign in
          </div>
          <div style={{ display: 'flex', border: '2px solid black', borderRadius: '15px', padding: '.3rem', width: '5rem', justifyContent: 'center' }}>
            <button onClick={() => navigate("/register")}>Register</button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <Button
                className=' w-full px-0 py-3'
                type='submit'
                variant='contained'
                sx={{ background: "black", borderRadius: '20px' }}
              >
                Sign in
              </Button>
            </Grid>
          </Grid>
        </form>
        <div>
          <div style={{ marginTop: '1rem' }}>
            <Button
              className='px-0 py-10'
              sx={{ background: "none", color: 'black', fontSize: '.7rem' }}
            >
              Forgot your password?
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
