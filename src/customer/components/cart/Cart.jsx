import React, { useEffect } from 'react'
import Cartitem from './Cartitem'
import { Button, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loader';
import { getCart, updateItemInCart } from '../../state/cart/cartSlice';
import { data } from 'autoprefixer';

export default function Cart() {
  const {cart,loading} = useSelector(store => store.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
   
  }, []);
  const sizesValue = localStorage.getItem('value');
  useEffect(()=>{
    if(cart?.cartItems.length > 0){
      
      let findId = cart?.cartItems.length -1;
      const gotid =cart?.cartItems[findId]._id;
      if(cart?.cartItems[findId].sizes.length < 1){
      let sizes = []
      sizes.push( sizesValue)
      const data = {id:gotid,sizes:sizes,quantity:1}
      dispatch(updateItemInCart(data))}else{
      }
    }
  },[cart])
  // console.log(cart);
  const handlecheckout =()=>{
    navigate("/checkout?step=2")
  }
  return (
    !loading? <div className='lg:grid grid-cols-3 relative space-x-3  '>

       <div className='col-span-2'>
       {cart?.cartItems.map((i)=><Cartitem data={i}/>)}
       </div>
       <Grid className='sticky top-5 space-y-3 mt-7 '>
        <div className='border '>
          <h1 className=' flex justify-center align-center font-bold'>Price Details</h1>
        {/* <div className=' flex justify-around w-full  font-semibold pt-3'>
          <span>price</span>
          <span>$1000</span>
        </div> */}
          {/* <div className=' flex justify-around w-full  font-mono pt-3'>
          <span>discount</span>
          <span className='text-green-500'>-$1000</span>
        </div> */}
          <div className=' flex justify-around w-full  font-mono pt-3'>
          <span>delivery charges</span>
          <span className='text-green-500'>free</span>
        </div>
          <div className=' flex justify-around w-full  font-mono pt-3'>
          <span>total amount</span>
          <span className='text-green-500'>{cart?.totalPrice}</span>
        </div>
        </div>
        <Button 
        onClick={handlecheckout}
                variant="container" className="w-full font-bold" sx={{bgcolor:"#9155fd",color:"#fff"}}
              >
               Chectout
              </Button>
       </Grid>
       
    </div>:<Loader/>
  )
}
