import React, { useEffect, useState } from 'react'
import Stepperorder from './Stepperorder'
import { API_BASE_URL } from '../../../config/apiConfig';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Grid, Button,TextField } from '@mui/material'
import ReactStars from "react-rating-stars-component";
export default function OderDetail() {
  const {order_id,payment_id} = useParams();
 // console.log(order_id,payment_id);
  const dispatch = useDispatch();
 const [orderItem,setOrderItem] = useState()
 const [reviewmodel,setReviewmodel]= useState(false)
  useEffect(()=>{
    getpaymentDetails();   
    notify("Payment successfulls");
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

    const [rating, setRating] = useState(1);

    const [reviewData, setReviewData] = useState({
    name: '',
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
   if (name == "name") {
     reviewData.name = value
   }
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
   return response.json();

   })
   .then(res=> {
   setReviewmodel(false);
   notify("Thanks for feedback")
   })
   }
  return (
    <>
    {reviewmodel? <div style={{position:'fixed', top:'1',display:'flex',alignItems:'center',justifyContent:'center',width:'99vw',height:'99vh',opacity:'1',color:'#fff',zIndex:999}}>
   <div style={{display:'flex',alignItems:'center',justifyContent:'center',margin:'3rem'}}>
   <div style={{margin:'3rem',backgroundColor:'#E8E8E8',position:'absolute',zIndex:999}} className='sm:w-[90vw] lg:w-[30vw]'>
                    <form>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    name='name'
                                    label='Name'
                                  onChange={handleInputChange}
                                    fullWidth
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
                            <div>  <ReactStars
                                            count={5}
                                            size={24}
                                            activeColor="black"
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
 <div>
 
    <div className='py-20'>
        <Stepperorder activeStep={2}/>
    </div>
    <div className='p-5'>
      {
        orderItem?.map((i)=>(
         <div className='flex align-center justify-around border shadow-lg mt-8 cursor-pointer flex-col '>
  <div className=' rounded-sm flex align-center sm:flex-col lg:flex-row  '>
<div className='w-[10rem] h-[10rem]'>
<img className='object-cover border rounded-lg' src={i.image} alt="img" />
</div>
<div className='mx-5'>
<p className='font-bold mb-2'>{i.product.title}</p>
  <p className='font-semibold mb-2'>${i.discountedPrice}</p>
  <p className='font-bold'>Shiped</p>
</div>
  </div>
 <div className='flex align-center justify-center pt-10 text-blue-500' onClick={()=>{setReviewmodel(true);setProductId(i.product._id)}}>
 <StarBorderIcon/><span>Rate & Reviews</span>
</div> 
</div>  
        ))
      }
   
    </div>
 </div>
    </>
  )
}
