import React, { useEffect, useState } from 'react'
import Addresscard from '../addresscard/Addresscard'
import { Button, Grid,  } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../state/order/orderSlice';
import {loadStripe} from '@stripe/stripe-js';
import { API_BASE_URL } from '../../../config/apiConfig';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { MdLock } from 'react-icons/md';

export default function Ordersummary() {
  let currentUrl = window.location.href;
  const  id = currentUrl.slice(currentUrl.length-24,currentUrl.length)
  const dispatch = useDispatch();
  const {order,loading} = useSelector(store=>store.order);
  const [orderData ,setOrderData] = useState(order)
  useEffect (()=>{
    gedorderbyid(id)
console.log(order);
  },[order])
const gedorderbyid = async(id)=>{
  const token = localStorage.getItem('jwt');
 
  try {
    const order = await fetch(`${API_BASE_URL}/api/orders/${id}`,{
      headers:{
        authorization: token
      }
    })
    const res = await order.json();
    setOrderData(res)
    console.log('res',res);
  } catch (error) {
    console.log(error)
  }
}

  const makePayment = async(id)=>{
    const stripe = await loadStripe('pk_test_51OzLLPSJiFVUl1Nr8Ksa2nxAsCTEdJzaWhr8lJD5Tpuafsm2GeZNjsI6kMQR2jWrTiPrvPiKd2yj8du92oGCUQvk00Lpip6MXm');
const token = localStorage.getItem('jwt')
    const headers = { 
      'authorization': token,
      'Content-Type': 'application/json'

}
    const response = await fetch(`${API_BASE_URL}/api/payments/${id}`,{
      method:'POST',
      headers:headers,
    });
    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id
    });
//console.log(result);
    if(result.error){
      console.log(error);
    }

  }
  return (
   <>
   <div className=''>
<div className='shadow-lg my-4 pl-5'>
<Addresscard/>   
  </div> 
<div className='lg:grid grid-cols-3 relative   '>

<div className='col-span-2 lg:w-[55vw] sm:w-[80vw]'>
{orderData?.orderItems.map((i)=><div className='flex align-center mx-3 mt-10  space-x-5 lg:flex-row  flex-col' key={i._id}>
        <img className='max-w[10rem] max-h-[10rem] flex align-center mx-4'  src={i?.image} alt="img" style={{width:'10rem',height:'10rem'}} />
       <div className='flex align-center justify-center flex-col' >
<p>{i?.product.title}</p>
<p>${i?.discountedPrice}</p>
  <p>quantity:{i?.quantity}</p>
<p className=' font-semibold tracking-tight   text-green-600'>style:{i?.style}</p>
<div className="flex align-center justify-start m-y-1 space-x-2">
          </div>
       </div>
       <div>
       </div>
     
    </div>)}

</div>
<Grid className='sticky space-y-3 mt-7'>
 <div className='border '>
   <h1 className=' flex justify-center align-center font-bold'>Price Details</h1>
 {/* <div className=' flex justify-around w-full  font-semibold pt-3'>
   <span>price</span>
   <span>${order?.totalPrice}</span>
 </div> */}
    <div className=' flex justify-between  w-full   pt-3 justify-center p-4 ' style={{alignItems:'flex-start',alignSelf:'flex-start'}}>
   <span>Total amount</span>
   <span className='text-green-500'>${orderData?.totalDiscountedPrice}</span>
 </div>
   <div className=' flex justify-between  w-full   pt-3 p-4' style={{alignItems:'flex-start',alignSelf:'flex-start'}}>
   <span>Shipping Charges</span>
   <span className='text-green-500'>Free</span>
 </div>

 </div>
 <p style={{display:'flex',alignItems:'center',gap:'4px'}}>Your data is encrypted and fully secure <span><RiSecurePaymentFill /></span></p>
 <p style={{display:'flex',alignItems:'center',gap:'4px'}}>Your data remains safe and secure <span><MdLock /></span></p>
 <Button
         variant="container" className="w-full font-bold" sx={{bgcolor:"black",color:"#fff"}}
         onClick={()=>makePayment(orderData._id)}
       >
        Pay Now
       </Button>
</Grid>

</div>
   </div>
   </>
  )
}
