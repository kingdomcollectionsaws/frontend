import React, { useRef } from 'react'
import  { EProductSlider } from "../ProductSlider";
import style from '../styles.module.css'
import { IoMdStar } from "react-icons/io";
import { useState, useEffect } from "react";
import 'react-responsive-pagination/themes/classic.css';
import { MenuItem,Select } from "@mui/material";
import { API_BASE_URL } from "../../../../config/apiConfig";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { getCart, updateItemInCart} from '../../../state/cart/cartSlice';
import axios from 'axios';
export default function Edititem({data}) {
  const dispatch = useDispatch();

  const inputRef = useRef(null);
  const [productDetails,setProductDetails] = useState(data?.product);
  const [productVariation,setProductVariation] = useState(data?.product.variations[0])
  const [showindex,setShowindex] = useState()
  const [allImagesUrls, setAllImagesUrls] = useState([]);
 const [selectedValue, setSelectedValue] = useState('');
 useEffect(() => {
   if (productDetails ) {
     const imageUrls = productDetails.variations.flatMap(variation => variation.images);
     setAllImagesUrls(imageUrls);
   }
 }, [productDetails]);

 const handleChange = (event) => {

   if (event.target.value) {
     inputRef.current.style.borderWidth = ''
     inputRef.current.style.borderColor = '';
   }
   setSelectedValue(event.target.value);
   localStorage.setItem('value', event.target.value);
   
for (let index = 0; index < productDetails?.variations.length; index++) {
  console.log();
 if(productDetails.variations[index].style == event.target.value.style ){
   setProductVariation(productDetails?.variations[index]);
   
  break;
 }

}

 };

   useEffect(() => {
  
    setShowindex(productVariation?.images[0])
  }, [productVariation,selectedValue]);
  useEffect(()=>{

  },[showindex])
useEffect(()=>{
getCart();
},[])
const updateitem = async(productVariation)=>{
const updatedata =   { id: data._id, style:productVariation.style,
  price:productVariation.price,
  discountedPrice:productVariation.discountedPrice,
  quantity:data.quantity,image:productVariation.images[0]};
console.log(updatedata);
   await dispatch(updateItemInCart(updatedata));
   dispatch(getCart())
 
}
  return (
      <div style={{zIndex:'1000',display:'flex',alignItems:'center' ,height:'auto',marginTop:'-.7rem'}}>
         <div className={style.carousel} style={{ width: '100%', height: '10rem' ,justifyContent:'center'}}> 
                <div  style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%',}}>
                <EProductSlider imagesdata={allImagesUrls} showindex={showindex}/>
                </div>
                <div className={style.info} style={{ width: '100%', marginLeft: '2px',marginTop:'1px' }}>
                  <div className={style.price} style={{display:'flex',flexDirection:'row'}}> <span><p className=' tracking-tight text-gray-600  line-through px-2 '>${productVariation?.price}</p></span>${productVariation?.discountedPrice}</div>
                  <div className={style.des}>{productDetails?.title}</div>
                  <div>
                    <p style={{ display: 'flex', alignItems: 'center', paddingLeft: '1rem' }}>Style<sup style={{ color: '#A61A2E', fontSize: '10px', }}> <IoMdStar /></sup></p>
                  </div>
                  <div style={{ marginLeft: '1rem', width: '95%' }}>

                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                     onChange={handleChange}
                      style={{ width: '95%', marginBottom: '1rem' }}
                      ref={inputRef}
                    >
                      {productDetails?.variations.map((item, index) => (

                        <MenuItem value={item} key={index}>
                          {item.style}
                        </MenuItem>

                      ))
                      }

                    </Select>
                  </div>
                  <div>
                    <button className={style.cartBtn}style={{ marginLeft: '1rem', width: '90%' }} onClick={() => updateitem(productVariation)}>
                      Save
                    </button>
               
              

             

                </div>
              
            
              
                
              </div>
    </div>
      </div>
  )
}
