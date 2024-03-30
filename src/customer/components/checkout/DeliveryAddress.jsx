import { Box, Button, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Addresscard from '../addresscard/Addresscard'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../state/order/orderSlice';
import { getUserDetail } from '../../state/Auth/registerSlice';

export default function DeliveryAddress() {
  const dispatch = useDispatch();
  useEffect(()=>{
dispatch(getUserDetail())
  },[])
const navigate = useNavigate()
  const handlesubmit =(e)=>{
    e.preventDefault();
    const data = new FormData(e.currentTarget);
     const address = {
      firstName:data.get("firstname"),
       lastName:data.get("lastname"),
       streetAddress:data.get("address"),
       city:data.get("city"),
       zipCode:data.get("pincode"),
     state:data.get("state"),
   }
   // console.log("submit", address);
    const orderData = {address,navigate};
    dispatch(createOrder(orderData));
   window.location.reload()
  };
  const {user} = useSelector(store => store.user);
const deliver=()=>{
  const address =  user?.addresses[user?.addresses?.length-1];
  const orderData = {address,navigate};
  dispatch(createOrder(orderData));
}

  return (
   <>
  <Grid container spacing={4}>
    <Grid   xs={12} lg={5} className='border rounded-md shadow-md h-[30.4rem] overflow-y-scroll'>
   <div className='p-6'>
   <Addresscard />
      <Button  type='submit' sx={{mt:"2rem",bgcolor:"black",color:"#fff",}}   className='shadow-lg' onClick={deliver} >
Deliver Here
      </Button  >
   </div>

    </Grid>
<Grid item xs={12} lg={7} className='border shadow-md p-3 cursor-pointer'>
  <Box>
<form onSubmit={handlesubmit} encType="multipart/form-data">
<Grid container spacing={3}>
  <Grid item xs={12} lg={6}>
    <TextField
    required
    id='firstname'
    name='firstname'
    label='firstname'
    fullWidth
    autoComplete='given-name'
    />

  </Grid>
  <Grid item xs={12} lg={6}>
    <TextField
    required
    id='lastname'
    name='lastname'
    label='Lastname'
    fullWidth
  
    />

  </Grid>
  <Grid item xs={12} >
    <TextField
    required
    id='address'
    name='address'
    label='Address'
    fullWidth
    multiline
    rows={4}
    />
  </Grid>
  <Grid item xs={12} lg={6}>
    <TextField
    required
    id='city'
    name='city'
    label='City'
    fullWidth
    autoComplete='city'
    />

  </Grid>
  <Grid item xs={12} lg={6}>
    <TextField
    required
    id='pincode'
    name='pincode'
    label='zip code/ pin code'
    fullWidth
    
    />

  </Grid>
  <Grid item xs={12} lg={6}>
    <TextField
    required
    id='state'
    name='state'
    label='State/Region'
    fullWidth
    autoComplete='given-state'
    />

  </Grid>
  {/* <Grid item xs={12} lg={6}>
    <TextField
    required
    id='number'
    name='number'
    label='Number'
    fullWidth
    autoComplete='given-number'
    />

  </Grid> */}
</Grid>
<Button sx={{mt:"2rem",bgcolor:"black",color:"#fff",}}   className='shadow-lg' type='submit' >
save Address
      </Button>
</form>

  </Box>


</Grid>

  </Grid>
   </>
  )
}
