import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../config/apiConfig';

export default function Orders() {
  const [loading,setLoading] = useState(true);
  const [ordersData,setOrdersData] = useState([]);
    useEffect(()=>{
        orders()
    },[])
    const orders = ()=>{
        const token = localStorage.getItem('jwt');
        const requestOptions = {
          method: 'GET',
          headers:{
            authorization: token
          }
        }
      fetch(`${API_BASE_URL}/api/admin/orders`, requestOptions)
      .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
      })
      .then(orders => {
      console.log('order:', orders);
      setOrdersData(orders)
      setLoading(false)
      })
      .catch(error => {
      console.error('There was a problem with the fetch request:', error);
      });
       }
  return (
  !loading? <div >
   {
  ordersData?.map((i)=>(
      <div  className='flex align-center justify-around border shadow-lg mt-8 hover:scale-105 flex-warp flex-col m-10 p-5 '>
      {i.orderItems.map((i)=><div >
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
      
      <p>{i.title}</p>
    </div>
   
    </div>
    
    <div style={{width:'40%'}}>
    {<div className='flex flex-col '>
      <p className='font-bold mb-2'></p>
      <p>name:</p>
      <p>address: </p>
      <p>mobile:</p>
      <p className=' mb-2'>city:</p>
      <p></p>
    </div>}
    </div>
     </div></div>
    )}
    <p></p>
    <p className='font-semibold mb-2'>Status: {i.orderStatus}</p>
   <button>Update status</button>
    <div>
      
    </div>
    </div>
   
    ))
   
   }
   </div>:<h1>..</h1>
  )
}
