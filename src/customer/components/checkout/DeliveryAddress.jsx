import { Box, Button, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Addresscard from '../addresscard/Addresscard'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../state/order/orderSlice';
import { getUserDetail } from '../../state/Auth/registerSlice';
import Loader from '../../Loader';
import { getCart } from '../../state/cart/cartSlice';
import { getAllProducts } from '../../state/product/productSlice';
import { CheckBox } from '@mui/icons-material';
import { API_BASE_URL } from '../../../config/apiConfig';

export default function DeliveryAddress() {
  const dispatch = useDispatch();
  const [loading, SetLoading] = useState(false);
  const [checked, SetChecked] = useState(false);

  const { user } = useSelector(store => store.user);
  const { order } = useSelector(store => store.order);

  useEffect(() => {
    dispatch(getUserDetail())
    dispatch(getCart());
    dispatch(getAllProducts());
  }, [loading, dispatch])
  const navigate = useNavigate()
  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let billing;
    if (checked) {
      billing = {
        firstName: data.get("firstname"),
        lastName: data.get("lastname"),
        streetAddress: data.get("address"),
        city: data.get("city"),
        zipCode: data.get("pincode"),
        state: data.get("state"),
        mobile: data.get("number"),
        email: data.get("email"),
        country: data.get("country"),

      }
    } else {
      billing = {
        firstName: data.get("billing_firstname"),
        lastName: data.get("billing_lastname"),
        streetAddress: data.get("billing_address"),
        city: data.get("billing_city"),
        zipCode: data.get("billing_pincode"),
        state: data.get("billing_state"),
        mobile: data.get("billing_number"),
        email: data.get("billing_email"),
        country: data.get("billing_country"),
      }
    }
    const address = {
      firstName: data.get("firstname"),
      lastName: data.get("lastname"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      zipCode: data.get("pincode"),
      state: data.get("state"),
      mobile: data.get("number"),
      email: data.get("email"),
      country: data.get("country"),
      note: data.get("note"),
      billing: billing
    }
    //console.log("submit", address);
    try {
      const orderData = { address, navigate }
      await dispatch(createOrder(orderData));
      // createorders(orderData)
      //  deliver()
      // window.location.reload();
    } catch (error) {
      alert("something is wrong")
      console.error('Error creating order:', error);
      // Handle error here (e.g., display error message to the user)
    }
    //navigate({ search: `step=3&order_id=${createdOrder.payload._id}` }); 
  }

  const deliver = () => {

    const address = user;
    //console.log('add',address);
    const orderData = { address, navigate }
    dispatch(createOrder(orderData));


  }

  const createorders = async (orderData) => {
    const token = localStorage.getItem('jwt');
    const { address, navigate } = orderData;
    const cleanAddress = JSON.parse(JSON.stringify(address));
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(cleanAddress)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log(`Failed to create order: ${errorText}`);
      }

      const order = await response.json();
      //console.log("kddddddddddddd",order);
      navigate({ search: `step=3&order_id=${order._id}` });


      return order;
    } catch (error) {
      // Handle different types of errors appropriately
      console.log(error.message);
    }
  }
  return (
    <>
      {!loading ? <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center',alignItems:'center' }} >

        <Grid item xs={12} lg={7} className='border shadow-md p-3 cursor-pointer'>
          <h1 style={{ fontFamily: 'inherit', fontWeight: '400', fontSize: '1.7rem', marginBottom: '10px' }}>Enter  delivery address</h1>
          <Box>
            <form onSubmit={handlesubmit} encType="multipart/form-data">
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                  <TextField
                    required
                    id='email'
                    name='email'
                    label='Email'
                    fullWidth
                    autoComplete='given-email'
                  />

                </Grid>

                <Grid item xs={12} lg={6}>
                  <TextField
                    required
                    id='firstname'
                    name='firstname'
                    label='Firstname'
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
                <Grid item xs={12} lg={6}>
                  <TextField
                    required
                    id='country'
                    name='country'
                    label='Country code (2 latter)'
                    fullWidth
                    autoComplete='given-country'
                  />

                </Grid>
                <Grid item xs={12} >
                  <TextField
                    required
                    id='address'
                    name='address'
                    label='Address'
                    fullWidth

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
                    label='Zip code/ Post Code'
                    fullWidth

                  />

                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    required
                    id='state'
                    name='state'
                    label='State Provisional code (2 latter)'
                    fullWidth
                    autoComplete='given-state'
                  />

                </Grid>

                <Grid item xs={12} lg={6}>
                  <TextField
                    required
                    id='number'
                    name='number'
                    label='Phone'
                    fullWidth
                    autoComplete='given-number'
                  />

                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    id='note'
                    name='note'
                    label='Note for Seller (Optional)'
                    fullWidth
                    autoComplete='given-number'
                  />

                </Grid>
              </Grid>
              <h1 style={{ fontFamily: 'inherit', fontWeight: '400', fontSize: '1.7rem', marginBottom: '10px' }}>Enter  billing address</h1>

              <h1 style={{ fontFamily: 'inherit', fontWeight: '400', fontSize: '1.3rem', marginBottom: '10px' }}>Same as delivery address <span><input type="checkbox" width={30} height={30} onClick={() => SetChecked(!checked)} style={{ padding: '.6rem' }} /></span></h1>
              {!checked ? <Grid container spacing={3}>

                <Grid item xs={12} lg={12}>
                  <TextField
                    required
                    id='billing_email'
                    name='billing_email'
                    label='Email'
                    fullWidth
                    autoComplete='given-email'
                  />

                </Grid>

                <Grid item xs={12} lg={6}>
                  <TextField
                    required
                    id='billing_firstname'
                    name='billing_firstname'
                    label='Firstname'
                    fullWidth
                    autoComplete='given-name'
                  />

                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    required
                    id='billing_lastname'
                    name='billing_lastname'
                    label='Lastname'
                    fullWidth

                  />

                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    required
                    id='billing_country'
                    name='billing_country'
                    label='Country Code'
                    placeholder='eg: US,FR'
                    fullWidth
                    autoComplete='given-country'
                  />

                </Grid>
                <Grid item xs={12} >
                  <TextField
                    required
                    id='billing_address'
                    name='billing_address'
                    label='Address'
                    fullWidth

                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    required
                    id='billing_city'
                    name='billing_city'
                    label='City'
                    fullWidth
                    autoComplete='city'
                  />

                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    required
                    id='billing_pincode'
                    name='billing_pincode'
                    label='Zip code/ Post Code'
                    fullWidth

                  />

                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    required
                    id='billing_state'
                    name='billing_state'
                    label='State/Region'
                    fullWidth
                    placeholder='eg: CA,NY'
                    autoComplete='given-state'
                  />

                </Grid>

                {<Grid item xs={12} lg={6}>
                  <TextField
                    required
                    id='billing_number'
                    name='billing_number'
                    label='Phone'
                    fullWidth
                    autoComplete='given-number'
                  />

                </Grid>}
              </Grid> : ''}
              <Button sx={{ mt: "2rem", bgcolor: "black", color: "#fff", width: '100%', borderRadius: '20px' }} className='shadow-lg' type='submit' >
                Continue to payment
              </Button>
            </form>

          </Box>


        </Grid>
        {/* <Grid   xs={12} lg={7} className='border rounded-md shadow-md h-[30.4rem] overflow-y-scroll'>
   <div className='p-6'>
   <Addresscard />
      <Button  type='submit' sx={{mt:"2rem",bgcolor:"black",color:"#fff",}}   className='shadow-lg' onClick={deliver} >
     Deliver Here
      </Button  >
   </div>

    </Grid> */}
      </Grid> : <Loader />}
    </>
  )
}
