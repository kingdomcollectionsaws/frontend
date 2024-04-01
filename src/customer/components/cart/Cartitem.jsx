import { AddCircleOutlineOutlined, RemoveCircleOutlineOutlined } from '@mui/icons-material'
import { Button, IconButton, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../Loader'
import { getCart, removeItemInCart, updateItemInCart } from '../../state/cart/cartSlice'

export default function Cartitem({ data }) {
  console.log(data);
  const dispatch = useDispatch()
  const { cart, loading } = useSelector(store => store.cart);
  const [quantity, setQuantity] = useState(1);
  const updatequan = (id) => {
    const updatedata = { id: id, quantity: quantity };
    dispatch(updateItemInCart(updatedata));
    window.location.reload()
  }
  const handleChange = (e) => {
    setQuantity(e.target.value);
  }

  const reamoveitem = (id) => {
    dispatch(removeItemInCart(id)).then(() => {
      // After removing the item, fetch the updated cart data
      dispatch(getCart());
    })
      .catch(error => {
        // Handle error, if any
        console.error('Error removing item from cart:', error);
      });
  }
  // const [quantityarray,setQuantityarray] = useState([]);
  let quantityarray = Array.from({ length: 200 }, (_, index) => index + 1);
  useEffect(()=>{
    dates()
  },[])
  const [orderDate,setOrderDate] = useState();
const dates = ()=>{
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const today = new Date();
  const startDate = today.getDate();
  const futureDate = new Date(today);
futureDate.setDate(futureDate.getDate() + 3);
const formattedDateRange = `${futureDate.getDate()}-${months[futureDate.getMonth()]}`;
setOrderDate(formattedDateRange)

}
  return (
    !loading ?<div className='border mb-3 p-2 ' >
     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '90%' }}>
        <div className='flex align-center mx-3 mt-10  space-x-5 '>
          <img className='max-w[10rem] max-h-[10rem] flex align-center mx-4' src={data?.product.imageUrl[0]} alt="img" />
          <div className='flex align-center justify-center flex-col gap-3' >
            <p>{data?.product.title}</p>
            <p style={{color:'#595959'}}>{data?.product.description}</p>
            {/* <p>quantity:{data?.quantity}</p> */}
            <p > Style: <span className=' font-semibold tracking-tight   text-green-600'> {data?.sizes[0]} </span> </p>
            <div className="flex align-center justify-start m-y-1 space-x-2">
              <div>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={handleChange}
                  style={{ width: '4rem', marginBottom: '1rem' }}
                  defaultValue={1}
                >
                  {

                    quantityarray.map((item, index) => (

                      <MenuItem value={item} key={index}>
                        {item}
                      </MenuItem>

                    ))

                  }

                </Select>
                {
                  quantity > 1 ? <Button sx={{ color: "black" }} onClick={() => updatequan(data._id)} >update</Button> : ''
                }

              </div>    
             
            </div>
            <Button sx={{ color: "black" }} onClick={() => reamoveitem(data._id)} >remove</Button>
          
          </div>
         
          <div>
          </div>

        </div>
        <div className='flex   space-x-5'>

        </div>
      </div>
      <div style={{ width: '10%', display: 'flex', alignItems: 'center', marginTop: '3rem', flexDirection: 'column', }}>
        <p className=' font-bold tracking-tight   text-green-600' style={{fontSize:'1.5rem'}}>£{data?.product.discountedPrice}</p>
        <p className='font-semibold tracking-tight text-gray-600  line-through '>£{data?.product.price}</p>
      </div>
    </div>
    <div style={{display:'flex', borderTop:'1px solid gray',width:'100%',flexDirection:'column',}}> 
     <p style={{fontWeight:'500'}}>
     Delivery:Free
     </p>
     <p style={{color:'#595959'}}>
     Estimated delivery: <span style={{ borderBottom: '1px dashed black' }}>{orderDate}</span> from United States
     </p>
    </div>
    
</div>
      : <h1>no item yet</h1>
  )
}
