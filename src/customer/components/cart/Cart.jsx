import React from 'react'
import Cartitem from './Cartitem'
import { Button, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function Cart() {
  const navigate = useNavigate();
  const {cartItems } = useSelector(store => store.cart);
  console.log(cartItems);
  const handlecheckout =()=>{
    navigate("/checkout?step=2")
  }
  return (
    <div className='lg:grid grid-cols-3 relative space-x-3  '>

       <div className='col-span-2'>
       <Cartitem data ={cartItems}/>
      
       </div>
       <Grid className='sticky top-5 space-y-3 mt-7 '>
        <div className='border '>
          <h1 className=' flex justify-center align-center font-bold'>Price Details</h1>
        <div className=' flex justify-around w-full  font-semibold pt-3'>
          <span>price</span>
          <span>$1000</span>
        </div>
          <div className=' flex justify-around w-full  font-mono pt-3'>
          <span>discount</span>
          <span className='text-green-500'>-$1000</span>
        </div>
          <div className=' flex justify-around w-full  font-mono pt-3'>
          <span>delivery charges</span>
          <span className='text-green-500'>free</span>
        </div>
          <div className=' flex justify-around w-full  font-mono pt-3'>
          <span>total amount</span>
          <span className='text-green-500'>$10000</span>
        </div>
        </div>
        <Button 
        onClick={handlecheckout}
                variant="container" className="w-full font-bold" sx={{bgcolor:"#9155fd",color:"#fff"}}
              >
               Chectout
              </Button>
       </Grid>
       
    </div>
  )
}
