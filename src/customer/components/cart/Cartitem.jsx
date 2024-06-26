import { AddCircleOutlineOutlined, RemoveCircleOutlineOutlined } from '@mui/icons-material'
import { Button, IconButton} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../Loader'
import { getCart, removeItemInCart, updateItemInCart } from '../../state/cart/cartSlice'
import Edititem from '../custom/productId/Edititem'
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineModeEdit } from 'react-icons/md'
export default function Cartitem() {
  const dispatch = useDispatch()
  const { cart, loading } = useSelector(store => store.cart);
  const { user } = useSelector(store => store.user);
  const [quantity, setQuantity] = useState(0);
  const [itemIndex, setItemIndex] = useState(0)
  const [editmenu, setEditmenu] = useState(false)
  const [editproduct, setEditproduct] = useState(false)
  const updatequan = async(id,quan,variationId) => {
    const updatedata = { id: id, quantity: quan,variationId:variationId};
   await dispatch(updateItemInCart(updatedata));
    dispatch(getCart())
  }
  const reamoveitem = (id) => {
    dispatch(removeItemInCart(id))
    .then(() => {
      dispatch(getCart());
    })
      .catch(error => {
        // Handle error, if any
        console.error('Error removing item from cart:', error);
      });
  }
  // const [quantityarray,setQuantityarray] = useState([]);
  useEffect(()=>{
    dates()
    getCartItems();
   // console.log("k",a);
  },[])

  const [localcartItems,setLocalcartItems] = useState()
  function getCartItems() {
    // Get cart items from local storage
 const localcart = JSON.parse(localStorage.getItem('cart'));
 setLocalcartItems(localcart)
}
//console.log(localcartItems);

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
    !loading ? 
   <>
    { editmenu?
  
      <div style={{position:'fixed',right:'0%',backgroundColor:'#E8E8E8',zIndex:'1000',height:'90vh',padding:'1rem',}} className='sm:w-[40%] w-[100%]'>
   <div style={{position:'absolute',left:'1%',cursor:'pointer',top:'0%'}} onClick={()=>setEditmenu(false)}>
    <AiOutlineClose style={{fontSize:'1.5rem'}}/>
   </div>
              <Edititem data={editproduct} />
             
    </div>
    :''}
   {user? cart?.cartItems.map((data,index)=>(<div className='border mb-3 p-2' >
 
     <div style={{ display: 'flex', justifyContent: 'space-between',}} className='flex-col lg:flex-row '>
      <div style={{ width: '90%' }}>
        <div className='flex align-center mx-3 mt-5 flex-col lg:flex-row  space-x-5 '>
          <img className='max-w[15rem] max-h-[15rem] flex align-center mx-4' src={data?.image} alt="img" style={{width:'10rem',height:'10rem'}} />
          <div className='flex align-center justify-center flex-col gap-3' >
            <p>{data?.product?.title}</p>
             <p>quantity:{data?.quantity} </p> 
            <p > Style: <span className=' font-semibold tracking-tight   text-green-600'> {data?.style} </span> 
            <span>   <Button sx={{color:"black"}} onClick={()=>{setEditmenu(true);setEditproduct(data)}} >Edit <span><MdOutlineModeEdit/></span></Button></span></p>
            <div className='flex align-center justify-center mx-3  space-x-5'>

    <IconButton onClick={()=>{{quantity+data.quantity < 2 ?setQuantity(0):setQuantity(quantity-1)}{setItemIndex(index)}}}>
        <RemoveCircleOutlineOutlined sx={{color:"black"}}/>
    </IconButton>
    <span className='py-[5px] px-3 border rounded-sm]'>{itemIndex == index ? quantity+data.quantity:'1'}</span>
<IconButton onClick={()=>{{setQuantity(quantity+1)}{setItemIndex(index)}}}>
        <AddCircleOutlineOutlined sx={{color:"black"}}/>
    </IconButton>
    <div>
      {
         quantity !== data.quantity  >1? <Button sx={{color:"black"}} onClick={()=>updatequan(data._id,quantity+data.quantity,data.variationId)} >update</Button>:''
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
      <div style={{ width: '10%', display: 'flex', alignItems: 'center', marginTop: '1rem', flexDirection: 'column', }} className='mx-10 lg:mx-0 '>
        <p className=' font-bold tracking-tight   text-green-600' style={{fontSize:'1.5rem'}}>${data?.discountedPrice}</p>
        <p className='font-semibold tracking-tight text-gray-600  line-through '>${data?.price}</p>
      </div>
    </div>
    <div style={{display:'flex', borderTop:'1px solid gray',width:'100%',flexDirection:'column', fontWeight:'bold'}}> 
     <p style={{color:'#595959'}}>
     Estimated delivery: <span style={{ borderBottom: '1px dashed black' }}>{orderDate}</span> from UK
     </p>
    </div>
</div>)):<>
</>}
   </>
      : <h1>no item yet</h1>
  )
}