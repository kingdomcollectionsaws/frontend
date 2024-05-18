import { Grid, Button,TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../../config/apiConfig'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ReactStars from "react-rating-stars-component";
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader'
import { useSelector } from 'react-redux';
export default function Order() {
  const { user} = useSelector(store => store.user);
const [orderitem,setOrderitem] = useState()
 useEffect(()=>{
orders()
}
 ,[])
 const orders = ()=>{
  const token = localStorage.getItem('jwt');
  console.log(token);
  const requestOptions = {
    method: 'GET',
    headers:{
      authorization: token
    }
  }
fetch(`${API_BASE_URL}/api/orders/user`, requestOptions)
.then(response => {
if (!response.ok) {
  throw new Error('Network response was not ok');
}
return response.json();
})
.then(products => {
  setOrderitem(products);
})
.catch(error => {
console.error('There was a problem with the fetch request:', error);
});
 }
 const [addressData,setAddressData] = useState([]);
 const [reviewmodel,setReviewmodel]= useState(false)
 const navigate = useNavigate()
 const [rating, setRating] = useState(1);

 const [reviewData, setReviewData] = useState({
 name: user?.firstName,
  review: '',
  image: '',
  ratings:rating,
  productId:''
});
const handelfileupload = async (event) => {
  const files = event.target.files;

  if (!files) {
      console.error('No file selected');
      return;
  }

  // Get the first file
  const file = files[0];

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'pnegpfre');

  try {
      const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/dujcstewk/image/upload`, {
          method: 'POST',
          body: formData,
      });

      if (!uploadResponse.ok) {
          throw new Error('Failed to upload file');
      }

      const responseData = await uploadResponse.json();

      setReviewData(prevState => ({
          ...prevState,
          image: responseData.secure_url
      }));

  } catch (error) {
      console.error('Error uploading file:', error.message);
  }

 
};
 const handleInputChange = (e)=>{
  const { name, value } = e.target;
if (name == "review") {
  reviewData.review = value
}
}
 const handleRatingChange = (newRating) => {
  // Update the state with the new rating value
  reviewData.ratings = newRating
 // setRating(newRating);
  
}
const [productId,setProductId] = useState()
const postReview = ()=>{

  reviewData.productId = productId;
  console.log(reviewData);
  const token = localStorage.getItem('jwt');
  const requestOptions = {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      authorization: token
    },
    body: JSON.stringify( reviewData)
  }

fetch(`${API_BASE_URL}/api/reviews/create`, requestOptions)
.then(response => {
// if (!response.ok) {
//   throw new Error('Network response was not ok');
// }
setReviewmodel(false)
return response.json();
})
.then(res=> {
console.log(res);
})
}

  return (
    <>
    {orderitem?<>
       {reviewmodel? <div style={{position:'fixed', top:'1',display:'flex',alignItems:'center',justifyContent:'center',width:'99vw',height:'99vh',opacity:'1',color:'#fff',zIndex:999}}>
   <div style={{display:'flex',alignItems:'center',justifyContent:'center',margin:'3rem'}}>
   <div style={{margin:'3rem',backgroundColor:'#E8E8E8',width:'30vw',position:'absolute',zIndex:999}}>
                    <form>
                        <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} style={{margin:'4px',marginTop:'3rem',cursor:'pointer'}}>
                                <input
                                    style={{backgroundColor:'black',color:'#fff'}}
                                    required
                                    name='images'
                                    label='Images'
                                    type='file'
                                    fullWidth
                                    onChange={handelfileupload}
                                />

                            </Grid>     
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    name='review'
                                    label='Review'
                                   onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                           
                          
                            <Grid item xs={12} sm={12}>
                            <div>  <ReactStars
                                            count={5}
                                            size={40}
                                            activeColor="#ffa534"
                                            value={rating}
                                            color='#fff'
                                            onChange={handleRatingChange}
                                          /></div>
                              </Grid>                  
                            
                            <Grid item xs={12} sm={6} >
                                <Button
                                    className=' w-full px-0 py-3'
                                    variant='contained'
                                    sx={{ background: "black" }}
                                  onClick={postReview}
                                    >
                                    Post
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <Button
                                    className='w-full px-0 py-3'
                                    variant='contained'
                                    sx={{ background: "red" }}
                                 onClick={()=>setReviewmodel(false)}
                                >
                                    Cancle
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div> 
   </div>
    </div>:''}
    {orderitem?.length < 1?<h1 className='my-20 flex justify-center'>No Orders yet</h1>:''}

    {
 orderitem?.map((item)=>(

      <div  className='relative zIndex-10 flex align-center justify-around border shadow-lg mt-8 hover:scale-105 flex-warp flex-col sm:m-20 m-2 p-5' style={{border:'1px solid black',marginTop:'4rem'}}>
         <div style={{margin:'.3rem'}}>
   {
    item?.orderStatus == 'PENDING' ?   <button onClick={()=>navigate(`/checkout?step=3?order_id=${item?._id}`)} ><span style={{color:'#ff4000'}}>Pay now</span> your payment is pending</button>:<h1>Tracking ID: <span style={{color:'#ff4000'}}>{item.trackingId?item.trackingId:'Processing'}</span> {item.trackingId?<span style={{cursor:'pointer',backgroundColor:'gray',color:'#fff'}} onClick={()=>{navigator.clipboard.writeText(item.trackingId);alert(" Tracking id copied")}}>Copy</span>:''}</h1>
    
   }
      <h1>Total Amount: ${item?.totalPrice}</h1>
      <h1>Order Date: {item?.orderDate.slice(5,7)}/{item?.orderDate.slice(8,10)}/{item?.orderDate.slice(0,4)}</h1>
      {item.trackingId?<h1 > <a href={item.trackingUrl?`${item.trackingUrl}=${item.trackingId}`:`https://www.fedex.com/fedextrack/?trknbr=${item.trackingId}`} target="_blank" rel="noopener noreferrer"  style={{color:'blue'}}>Click here </a>to track your order</h1>:''}
    </div>
      {item.orderItems.map((i)=><div >
     <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
    <div style={{width:'60%'}}>
    <div className=' rounded-sm sm:w-[5rem] sm:h-[5rem] h-[5rem] w-[5rem]'>
    <img className='object-cover border rounded-lg' src={i?.image} alt="img" style={{height:'5rem',width:'5rem'}} />
      </div> 
      
    <div className='flex flex-col '>
      
      <p className='font-bold mb-2'></p>
      <p>Price: ${i?.discountedPrice}</p>
      <p>Name: {i?.product.title}</p>
      <p>Style: {i?.style}</p>
      <p className=' mb-2'>Quantity: {i.quantity}</p>
      {item?.orderStatus == 'PENDING' || item?.orderStatus == 'CANCEL'?null:<div className='flex align-center  p-5 text-black cursor-pointer' onClick={()=>{setReviewmodel(true);setProductId(i.product._id)}}>
 <StarBorderIcon/><span>Rate & Review</span>
</div>}
    </div>
   
    </div>
  
   
     </div></div>
    )} 
    <h1 style={{fontWeight:'bold'}}> Order Address</h1>
     <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
    
  <div>
  <div className='flex flex-col' >
            <p className='font-bold mb-2'></p>
            <p>Name: {item.shippingAddress?.firstName}</p>
            <p>Mobile: {item.shippingAddress?.mobile}</p>
            <p>Email: {item.shippingAddress?.email}</p>
            <p>Country: {item.shippingAddress?.country}</p>
            <p>State: {item.shippingAddress?.state}</p>
            <p>City: {item.shippingAddress?.city}</p>
            <p>Address: {item.shippingAddress?.streetAddress}</p>
            <p>Zipcode: {item.shippingAddress?.zipCode}</p>
            <p>Note: {item.shippingAddress?.note}</p>
          </div>
  </div>
  <div>
  <h1 style={{fontWeight:'bold'}}> Billing Address</h1>
  <div className='flex flex-col'>
            <p className='font-bold mb-2'></p>
            <p>Name: {item.shippingAddress?.billing.firstName}</p>
            <p>Mobile: {item.shippingAddress?.billing.mobile}</p>
            <p>Email: {item.shippingAddress?.billing.email}</p>
            <p>Country: {item.shippingAddress?.billing.country}</p>
            <p>State: {item.shippingAddress?.billing.state}</p>
            <p>City: {item.shippingAddress?.billing.city}</p>
            <p>Address: {item.shippingAddress?.billing.streetAddress}</p>
            <p>Zipcode: {item.shippingAddress?.billing.zipCode}</p>
          </div>
  </div>
    </div>
  
    <p className='font-semibold mb-2'> Order Status: {item.orderStatus}</p>
  
    <div>
      
    </div>
    </div>
   
    ))
   
   }
   </>:<Loader/>} </>
  )
}
