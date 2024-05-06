import React, { useEffect } from 'react'
import Addresscard from '../addresscard/Addresscard'
import { Button, Grid,  } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../state/order/orderSlice';
import {loadStripe} from '@stripe/stripe-js';
import { API_BASE_URL } from '../../../config/apiConfig';

export default function Ordersummary() {
  let {id} = useParams()
  const dispatch = useDispatch();
  const {order,loading} = useSelector(store=>store.order);
  useEffect (()=>{
dispatch(getOrderById(id));
console.log(order);
  },[order])

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
{order?.orderItems.map((i)=><div className='flex align-center mx-3 mt-10  space-x-5 lg:flex-row  flex-col' key={i._id}>
        <img className='max-w[10rem] max-h-[10rem] flex align-center mx-4'  src={i.product.imageUrl[0]} alt="img" />
       <div className='flex align-center justify-center flex-col' >
<p>{i?.product.title}</p>
<p>${i?.product.discountedPrice}</p>
  <p>quantity:{i?.quantity}</p>
<p className=' font-semibold tracking-tight   text-green-600'>{i?.product.sizes[0]}</p>
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
   <span className='text-green-500'>${order?.totalDiscountedPrice}</span>
 </div>
   <div className=' flex justify-between  w-full   pt-3 p-4' style={{alignItems:'flex-start',alignSelf:'flex-start'}}>
   <span>Shipping Charges</span>
   <span className='text-green-500'>Free</span>
 </div>

 </div>
 <Button
         variant="container" className="w-full font-bold" sx={{bgcolor:"black",color:"#fff"}}
         onClick={()=>makePayment(order._id)}
       >
        Pay Now
       </Button>
</Grid>

</div>
   </div>
   </>
  )
}
