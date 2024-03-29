import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import OrderCard from './OrderCard'
import { useDispatch, useSelector } from 'react-redux'
import { API_BASE_URL } from '../../../config/apiConfig'

export default function Order() {
const [orderitem,setOrderitem] = useState()
 useEffect(()=>{
 
orders()
}
 ,[])
 const orders = ()=>{
  const token = localStorage.getItem('jwt');
  const requestOptions = {
    method: 'GET',
    headers:{
      authorization: token
    }
  }
fetch(`${API_BASE_URL}/api/orders/user`, requestOptions)
.then(response => {
if (!response.ok) {
  throw new Error('Network response was not ok');
}
return response.json();
})
.then(products => {
  setOrderitem(products)
})
.catch(error => {
console.error('There was a problem with the fetch request:', error);
});
 }
  return (
    <>
    <Grid container sx={{justifyContent:"space-between"}} className='sm:justify-center'>
        <Grid item lg={2.5}  xs={12} className='sticky top-1 bg-white' >
        {/* <h1 className='flex align-center justify-center mt-2 font-bold'>Fliters</h1>     */}
           {/* <div className='h-auto shadow-lg p-5 static top-3'>
            <p>Order Status</p>
            
           {
            orderfliters.map((option)=>(
                <div className='space-x-3 font-semibold'>
                
                <input type="checkbox" className='cursor-pointer' defaultValue={option.value} />
                <label htmlFor={option.value} className='ml-3 text-sm text-gray-600'>
                    {option.label}

                </label>

            </div>
            ))
           }
           </div>
            */}
        </Grid>
        <Grid item xs={12} lg={9} className='cursor-pointer '>
         
        { orderitem ?<OrderCard data ={orderitem}/>:<h1>No order</h1>}
        </Grid>

    </Grid>
    </>
  )
}
