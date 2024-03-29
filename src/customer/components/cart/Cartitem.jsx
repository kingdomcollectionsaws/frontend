import { AddCircleOutlineOutlined,RemoveCircleOutlineOutlined } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../Loader'
import { getCart, removeItemInCart, updateItemInCart } from '../../state/cart/cartSlice'

export default function Cartitem({data}) {
  console.log(data);
  const dispatch = useDispatch()
  const {cart,loading} = useSelector(store => store.cart);
const [quantity,setQuantity] = useState(1);
const updatequan = (id)=>{
  const updatedata = {id:id,quantity:quantity};
  dispatch(updateItemInCart(updatedata));
  window.location.reload()
}

const reamoveitem = (id)=>{
 dispatch(removeItemInCart(id)).then(() => {
  // After removing the item, fetch the updated cart data
  dispatch(getCart());
})
.catch(error => {
  // Handle error, if any
  console.error('Error removing item from cart:', error);
});  
}

  return ( 
    !loading? <div className='border mb-3'>
    <div className='flex align-center mx-3 mt-10  space-x-5'>
        <img className='max-w[10rem] max-h-[10rem] flex align-center mx-4'  src={data?.product.imageUrl[0]} alt="img" />
       <div className='flex align-center justify-center flex-col' >
<p>{data?.product.title}</p>
<p>{data?.product.price}</p>
<p>quantity:{data?.quantity}</p>
<p className=' font-semibold tracking-tight   text-green-600'>{data?.sizes[0]}</p>
<div className="flex align-center justify-start m-y-1 space-x-2">
            {/* <p className='font-semibold tracking-tight text-gray-600  line-through '>$150</p>

            <p className=' font-semibold tracking-tight   text-green-600'>30% off</p> */}

          </div>
       </div>
       <div>
       </div>
     
    </div>
      <div className='flex align-center justify-center mx-3  space-x-5'>
    <IconButton onClick={()=>{quantity==1?setQuantity(1):setQuantity(quantity-1)}}>
        <RemoveCircleOutlineOutlined sx={{color:"RGB(145 85 253)"}}/>
    </IconButton>
    <span className='py-[5px] px-3 border rounded-sm ]'>{quantity}</span>
<IconButton onClick={()=>setQuantity(quantity+1)}>
        <AddCircleOutlineOutlined sx={{color:"RGB(145 85 253)"}}/>
    </IconButton>
    <div>
     
      {
         quantity >1? <Button sx={{color:"RGB(145 85 253)"}} onClick={()=>updatequan(data._id)} >update</Button>:''
      } 
      <Button sx={{color:"RGB(145 85 253)"}} onClick={()=>reamoveitem(data._id)} >remove</Button>
    </div>
      </div>
    </div>:<h1>no item yet</h1>
  )
}
