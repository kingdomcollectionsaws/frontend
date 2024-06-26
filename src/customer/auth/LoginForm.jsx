import React, { useEffect, useRef, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserDetail, loginUser } from '../state/Auth/registerSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addItemInCart, getCart } from '../state/cart/cartSlice';
export default function LoginForm() {
  const { user, jwt } = useSelector(store => store.user);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    if (user && user.role === 'GUEST') {
      let itemIds = cart.cartItems.map((cartItem) =>( {id:cartItem.product._id,variation:cartItem.product.variations.filter((i)=> i.style ==cartItem.style )[0]}));
      localStorage.setItem('items', JSON.stringify(itemIds));
    dispatch(loginUser(userData)).then(()=>{
    
      if(user.role == 'GUEST'){
        notify("invalid email or password");
      }
      dispatch(getUserDetail());
      event.target.reset();
    } ).catch((err)=>{
      
      setTimeout(() => {
        notify("invalid email or password");
        event.target.reset();
      }, 2000);
    })}else{
      dispatch(loginUser(userData)).then(()=>{
    
        if(user.role == 'GUEST'){
          notify("invalid email or password");
        }
        dispatch(getUserDetail());;
      } ).catch((err)=>{
        
        setTimeout(() => {
          notify("invalid email or password");
          event.target.reset();
        }, 2000);
      })
    }

    // Reset form fields
   
  
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
            onClick={()=>navigate('/forgotpassword')}
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
