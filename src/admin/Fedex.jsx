import React, { useState } from 'react'
import { Button, Grid, InputLabel, MenuItem, Select, TextField, dialogActionsClasses } from '@mui/material'
import { API_BASE_URL } from '../config/apiConfig';
export default function Fedex({orderdata}) {
    const [shipingAddress,setShipingAddress] = useState({
        streetAddress:orderdata?.shippingAddress?.streetAddress,
        mobile:orderdata?.shippingAddress?.mobile,
        country:orderdata?.shippingAddress?.country,
        state:orderdata?.shippingAddress?.state,
        city:orderdata?.shippingAddress?.city,
        zipCode:orderdata?.shippingAddress?.zipCode,
        name:orderdata?.shippingAddress?.firstName+orderdata?.shippingAddress?.lastName
    })
    const [shiperAddress,setShiperAddress] = useState({
        streetAddress:'1550 Union Blvd,Suite 302',
        mobile:'1234567890',
        country:'US',
        state:'CA',
        city:'Beverly Hills',
        zipCode:'90210',
        name:'tawfeeq'
    })
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name == "streetAddress") {
        shipingAddress.streetAddress = value
    }
    if (name == "phone") {
        shipingAddress.mobile = value
    }
    if (name == "country") {
        shipingAddress.country= value
    }
    if (name == "city") {
        shipingAddress.city= value
    }
    if (name == "state") {
        shipingAddress.state = value
    }
    if (name == "zipCode") {
        shipingAddress.zipCode = value
    }
    if (name == "name") {
        shipingAddress.name = value
    }
};
const handleInputshiper = (e) => {
    const { name, value } = e.target;
    if (name == "streetAddress") {
        shiperAddress.streetAddress = value
    }
    if (name == "phone") {
        shiperAddress.mobile = value
    }
    if (name == "country") {
        shiperAddress.country= value
    }
    if (name == "city") {
        shiperAddress.city= value
    }
    if (name == "state") {
        shiperAddress.state = value
    }
    if (name == "zipCode") {
        shiperAddress.zipCode = value
    }
    if (name == "name") {
        shiperAddress.name = value
    }
};
const postfedex = async()=>{
    const token = localStorage.getItem('jwt');
    const data = {shipingAddress,shiperAddress,orderdata}; // Assuming shiperAddress is defined somewhere
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify(data)
        };
        const response = await fetch(`${API_BASE_URL}/api/admin/orders/fedex/shiping`, requestOptions);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const msg = await response.json();
        console.log(msg);
    } catch (error) {
        console.error('There was a problem with the fetch request:', error);
    }
}
function handlePhoneValidation(event) {
    const phoneValue = event.target.value;
    const isValidPhone = /^\d{10}$/.test(phoneValue);

    if (!isValidPhone) {
        alert('Please enter a 10-digit phone number.');
        // Optionally, you can clear the input field or show an error message
        // event.target.value = ''; // Uncomment this line to clear the input field on invalid input
    }
}
  return (
    <div>
            <h1 style={{margin:'2rem'}}> Shiping Address</h1>
        <form>
    
                        <Grid container spacing={3}>
                            <Grid item xs={6} sm={6}>
                            
                                <Grid>{shipingAddress?.streetAddress}</Grid>
                                <TextField
                                    required
                                    name='streetAddress'
                                    label='StreetAddress'
                                    onChange={handleInputChange}
                                   
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6} sm={6}>
                            <Grid>{shipingAddress?.city}</Grid>
                                <TextField
                                    required
                                    name='city'
                                    label='City'
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6} sm={6}  >
                            <Grid>{shipingAddress?.country}</Grid>
                                <TextField
                                    required
                                    name='country'
                                    label='Country'
                                    fullWidth
                                    onChange={handleInputChange}
                                    style={{paddingBottom:'10px'}}
                                />
                                
                            </Grid>
                            <Grid  item xs={6} sm={6}>
                            <Grid>{shipingAddress?.state}</Grid>
                            <TextField
                                    required
                                    name='state'
                                    label='State'
                                    fullWidth
                                    onChange={handleInputChange}
                                    style={{paddingBottom:'10px'}}
                                /></Grid>
                                  <Grid  item xs={6} sm={6}>
                                  <Grid>{shipingAddress?.zipCode}</Grid>
                            <TextField
                                    required
                                    name='zipCode'
                                    label='Zip/postal code'
                                    fullWidth
                                    onChange={handleInputChange}
                                    style={{paddingBottom:'10px'}}
                                /></Grid>
                                <Grid  item xs={6} sm={6}>
                                <Grid>{shipingAddress?.name}</Grid>
                            <TextField
                                    required
                                    name='name'
                                    label='Full name'
                                    fullWidth
                                    onChange={handleInputChange}
                                    style={{paddingBottom:'10px'}}
                                /></Grid>
                                <Grid  item xs={6} sm={6}>
                                <Grid>{shipingAddress?.mobile}</Grid>
                            <TextField
                                    required
                                    name='phone'
                                    label='Phone'
                                    fullWidth
                                    type='Number'
                                  
                                    onChange={handleInputChange}
                                    style={{paddingBottom:'10px'}}
                                /></Grid>
                        </Grid>
                    </form>
                    <h1 style={{margin:'2rem'}}> Shiper Address</h1>
        <form >
    
                        <Grid container spacing={3}>
                            <Grid item xs={6} sm={6}>
                                <TextField
                                    required
                                    name='streetAddress'
                                    label='StreetAddress'
                                    onChange={handleInputshiper}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <TextField
                                    required
                                    name='city'
                                    label='City'
                                    onChange={handleInputshiper}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6} sm={6}  >

                                <TextField
                                    required
                                    name='country'
                                    label='Country'
                                    fullWidth
                                    onChange={handleInputshiper}
                                    style={{paddingBottom:'10px'}}
                                />
                                
                            </Grid>
                            <Grid  item xs={6} sm={6}>
                            <TextField
                                    required
                                    name='state'
                                    label='State'
                                    fullWidth
                                    onChange={handleInputshiper}
                                    style={{paddingBottom:'10px'}}
                                /></Grid>
                                  <Grid  item xs={6} sm={6}>
                            <TextField
                                    required
                                    name='zipCode'
                                    label='Zip/postal code'
                                    fullWidth
                                    onChange={handleInputshiper}
                                    style={{paddingBottom:'10px'}}
                                /></Grid>
                                <Grid  item xs={6} sm={6}>
                            <TextField
                                    required
                                    name='name'
                                    label='Full name'
                                    fullWidth
                                    onChange={handleInputshiper}
                                    style={{paddingBottom:'10px'}}
                                /></Grid>
                                <Grid  item xs={6} sm={6}>
                            <TextField
                                    required
                                    name='phone'
                                    label='Phone'
                                    fullWidth
                                    type='Number'
                                    onChange={handleInputshiper}
                                    style={{paddingBottom:'10px'}}
                                /></Grid>
                           
                        </Grid>
                    </form>     
                    <Grid item xs={12} sm={6} >
                                <Button
                                    className=' w-full px-0 py-3'
                                    variant='contained'
                                    sx={{ background: "#9155FD" }}
                                    onClick={postfedex}
                                >
                                    Post
                                </Button>
                            </Grid>
    </div>
  )
}
