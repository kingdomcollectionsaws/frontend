import React, { useEffect, useState } from 'react'
import Addresscard from '../addresscard/Addresscard';
import Stepperorder from './Stepperorder'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { API_BASE_URL } from '../../../config/apiConfig';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getOrderById } from '../../state/order/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function OderDetail() {
  const {order_id,payment_id} = useParams();
 // console.log(order_id,payment_id);
  const dispatch = useDispatch();
 const [orderItem,setOrderItem] = useState()
  useEffect(()=>{
    getpaymentDetails();   
    notify("Payment successfull");
  },[])
  const getpaymentDetails = async()=>{
    
    const token = localStorage.getItem('jwt')
    const headers = { 
      'authorization': token,
      'Content-Type': 'application/json'

}
    const response = await fetch(`${API_BASE_URL}/api/payments/?order_id=${order_id}&payment_id=${payment_id}`,{
      method:'GET',
      headers:headers,
    })
    const result = await response.json();
    setOrderItem(result.order.order.orderItems);
   // console.log("ll",orderItem);
  }
  const notify = (msg) => toast(msg, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,});

  return (
    <>
    <ToastContainer/>
 <div>
 <div className='px-10'>
        <h1 className='font-bold text-lg mb-5'>Delivery Address</h1>
        <Addresscard/>
    </div>
    <div className='py-20'>
        <Stepperorder activeStep={2}/>
    </div>
    <div className='p-5'>
      {
        orderItem?.map((i)=>(
         <div className='flex align-center justify-around border shadow-lg mt-8 cursor-pointer '>
  <div className=' rounded-sm flex align-center justify-around  '>
<div className='w-[10rem] h-[10rem]'>
<img className='object-cover border rounded-lg' src={i.product.imageUrl[0]} alt="img" />
</div>
<div className='mx-5'>
<p className='font-bold mb-2'>{i.product.title}</p>
 
  <p className='font-semibold mb-2'>£{i.product.price}</p>
  <p className='font-bold'>delivery on may</p>
</div>
  </div>
<div className='flex align-center justify-center pt-10 text-blue-500'>
 <StarBorderIcon/><span>Rate & Review</span>
</div>
</div>  
        ))
      }
   
    </div>
 </div>
    </>
  )
}
