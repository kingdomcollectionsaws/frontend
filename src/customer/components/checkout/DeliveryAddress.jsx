import { Box, Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import Addresscard from '../addresscard/Addresscard'

export default function DeliveryAddress() {
  const handlesubmit =(e)=>{
    e.preventDefault();
    const data = new FormData(e.currentTarget);
     const addressData = {
      firstname:data.get("firstname"),
       lasttname:data.get("lasttname"),
       address:data.get("address"),
       city:data.get("city"),
       pincode:data.get("pincode"),
     state:data.get("state"),
       number:data.get("number")
   }
    console.log("submit", addressData);
  };

  return (
   <>
  <Grid container spacing={4}>
    <Grid   xs={12} lg={5} className='border rounded-md shadow-md h-[30.4rem] overflow-y-scroll'>
   <div className='p-6'>
   <Addresscard/>
      <Button  type='submit' sx={{mt:"2rem",bgcolor:"RGB(145 85 253)",color:"black",}}   className='shadow-lg' >
Deliver Here
      </Button>
   </div>

    </Grid>
<Grid item xs={12} lg={7} className='border shadow-md p-3 cursor-pointer'>
  <Box>
<form onSubmit={handlesubmit} enctype="multipart/form-data">
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
  <Grid item xs={12} lg={6}>
    <TextField
    required
    id='number'
    name='number'
    label='Number'
    fullWidth
    autoComplete='given-number'
    />

  </Grid>
</Grid>
<Button sx={{mt:"2rem",bgcolor:"RGB(145 85 253)",color:"black",}}   className='shadow-lg' type='submit' >
Deliver Here
      </Button>
</form>

  </Box>


</Grid>

  </Grid>
   </>
  )
}
