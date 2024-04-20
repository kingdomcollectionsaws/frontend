import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import OrderCard from './OrderCard'
import { API_BASE_URL } from '../../../config/apiConfig'

export default function Order() {
const [orderitem,setOrderitem] = useState()
 useEffect(()=>{
 
orders()
}
 ,[])
 const orders = ()=>{
  const token = localStorage.getItem('jwt');
  console.log(token);
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
  setOrderitem(products);
  ordersadd()
})
.catch(error => {
console.error('There was a problem with the fetch request:', error);
});
 }
 const [addressData,setAddressData] = useState([]);
 const ordersadd = ()=>{
  const token = localStorage.getItem('jwt');
  const requestOptions = {
    method: 'GET',
    headers:{
      authorization: token
    }
  }

fetch(`${API_BASE_URL}/api/admin/orders/alladdress`, requestOptions)
.then(response => {
if (!response.ok) {
  throw new Error('Network response was not ok');
}
return response.json();
})
.then(address => {
//  console.log('address:', address);
setAddressData(address)
})
.catch(error => {
console.error('There was a problem with the fetch request:', error);
});
 }
  return (
    <>
    {orderitem?.length < 1?<h1 className='my-20 flex justify-center'>No Orders yet</h1>:''}
    {
 orderitem?.map((item)=>(
      <div  className='flex align-center justify-around border shadow-lg mt-8 hover:scale-105 flex-warp flex-col sm:m-20 m-2 p-5' style={{border:'1px solid black',marginTop:'4rem'}}>
      {item.orderItems.map((i)=><div >
     <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
    <div style={{width:'60%'}}>
    <div className=' rounded-sm sm:w-[5rem] sm:h-[5rem] h-[5rem] w-[5rem]  '>
    <img className='object-cover border rounded-lg' src={i.product.imageUrl[0]} alt="img" />
      </div> 
    <div className='flex flex-col '>
      <p className='font-bold mb-2'></p>
      <p>Price: {i.price}</p>
      <p>Name: {i.product.title}</p>
      <p>Style: {i.sizes[0]}</p>
      <p className=' mb-2'>Quantity: {i.quantity}</p>
      <p className=' mb-2'>Order date: {item.createdAt.slice(0,10)}</p>
      
      <p>{i.title}</p>
    </div>
   
    </div>
    
   
     </div></div>
    )} 
    <h1 style={{fontWeight:'bold'}}> Order Address</h1>
     <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
    
  <div>
  {addressData.map((address,index)=>{
      
      if (address._id== item. shippingAddress) {
        return (
          <div className='flex flex-col' key={address.user}>
            <p className='font-bold mb-2'></p>
            <p>name: {address.firstName}</p>
            <p>mobile: {address.mobile}</p>
            <p>email: {address.email}</p>
            <p>country: {address.country}</p>
            <p>state: {address.state}</p>
            <p>city: {address.city}</p>
            <p>Address: {address.streetAddress}</p>
            <p>Zipcode: {address.zipCode}</p>
            <p>Note: {item.note}</p>
          </div>
        );
      }
      return null;
}) }
  </div>
  <div>
  <h1 style={{fontWeight:'bold'}}> Billing Address</h1>
  {addressData.map((address,index)=>{
      
      if (address._id== item. shippingAddress) {
        return (
          <div className='flex flex-col' key={address.user}>
            <p className='font-bold mb-2'></p>
            <p>name: {address.billing.firstName}</p>
            <p>mobile: {address.billing.mobile}</p>
            <p>email: {address.billing.email}</p>
            <p>country: {address.billing.country}</p>
            <p>state: {address.billing.state}</p>
            <p>city: {address.billing.city}</p>
            <p>address: {address.billing.streetAddress}</p>
            <p>Zipcode: {address.billing.zipCode}</p>
          </div>
        );
      }
      return null;
}) }
  </div>
    </div>
  
    <p className='font-semibold mb-2'>Status: {item.orderStatus}</p>
  
    <div>
      
    </div>
    </div>
   
    ))
   
   }
    </>
  )
}
