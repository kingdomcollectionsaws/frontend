import React, { useEffect, useState } from 'react'
import Cartitem from './Cartitem'
import { Button, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loader';
import { addItemInCart, getCart} from '../../state/cart/cartSlice';
import visa from '../../../../public/visa.png'
import american from '../../../../public/amarican.png'
import paypal from '../../../../public/paypal.png'
import master from '../../../../public/master.png'
import gpay from '../../../../public/googlepay.png'
import diners from '../../../../public/diners.jpg'
import AuthModel from '../../auth/AuthModel';
import { ToastContainer, toast } from 'react-toastify';
export default function Cart() {
  const {cart,loading} = useSelector(store => store.cart);
  const {user} = useSelector(store => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [localcart,setLocalcart] =useState();
  const getpastitems = async()=>{
    const items = localStorage.getItem('items');
   if (items) {
     const localcart = JSON.parse(items);
     for (let index = 0; index < localcart.length; index++) {
       let data = { productId: localcart[index] };
      await dispatch(addItemInCart(data));
     }
     localStorage.removeItem('items');
     dispatch(getCart());
     navigate('/cart')
   }
  }
  useEffect(() => {
    dispatch(getCart());
    getpastitems();
    console.log(cart);
  }, [user?.role]);
  const [handleOpenAuth,setHandleOpeneAuth]= useState(false);
  
  const handleClose = ()=>{
    setHandleOpeneAuth(false)
    navigate("/")
  }
  const handlecheckout =()=>{
    if(user.role == "GUEST"){
      setHandleOpeneAuth(true)
      navigate('/Guest')

    }else{
         navigate("/checkout?step=2")
    }
 
  }
  return (
    !loading? 
    
      user?
      
       <div style={{margin:'1rem'}}>
         <AuthModel  handleClose={handleClose} open={handleOpenAuth}/>
    <div className='mt-20  sm:mt-0'>
      </div>
    <div className='lg:grid grid-cols-3 relative space-x-3'>
      
       <div className='col-span-2'>
       {cart?.cartItems.length > 0 || localcart ? <Cartitem/> :<h1 className='m-4'>Your cart is Empty</h1>}
       </div>
       <Grid className='sticky top-5 space-y-1 mt-1 '>
        <div className='border '>
          
          <h1 className=' flex  align-center font-bold p-4'>How you'll pay</h1>
          <div style={{display:'flex',alignItems:'center',flexWrap:'wrap',gap:'10px',paddingLeft:'1rem'}}>
      <img src={visa} alt="card" style={{width:'3rem',height:'2rem'}} />
      <img src={master} alt="card" style={{width:'3rem',height:'2rem'}} />
      <img src={american} alt="card" style={{width:'3rem',height:'2rem'}} />
      <img src={diners} alt="card" style={{width:'3rem',height:'2rem'}} />
      <img src={paypal} alt="card" style={{width:'3rem',height:'2rem'}} />
      <img src={gpay} alt="card" style={{width:'3rem',height:'2rem',objectFit:'cover'}} />
          </div>
         <div className=' flex  w-full justify-between p-4 pt-3'>
          <span>Item(s) total</span>
          <span>${cart?.totalPrice}</span>
        </div> 
          {/* <div className=' flex  w-full justify-between p-4  pt-3'>
          <span>Total discount</span>
          <span >${cart?.discounte}</span>
        </div>  */}
          <div className=' flex  w-full justify-between p-4   pt-3'>
          <span>Shipping Charges</span>
          <span className='text-green-500'>FREE</span>
        </div>
        <div className=' flex  w-full justify-between p-4   pt-3'>
          <span>Total discount</span>
          <span className=''>${cart?.discounte}</span>
        </div>
          <div className=' flex justify-between p-4 w-full  font-bold pt-3 ' style={{borderTop:'1px solid gray'}}>
          <span>Total ({cart?.cartItems.length} item)</span>
          <span >${cart?.totalDiscountedPrice}</span>
        </div>
        </div>
        <Button 
        onClick={handlecheckout}
                variant="container" className="w-full font-bold " sx={{bgcolor:"black",color:"#fff",borderRadius:'20px'}}
              >
            Proceed to   Checkout
              </Button>
       </Grid>
       
    </div></div>
      :<div className='flex align-center justify-center my-40'>Your cart is Empty</div>
     :<Loader/>
  )
}