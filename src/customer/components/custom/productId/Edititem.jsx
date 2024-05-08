import React from 'react'

import ProductSlider, { EProductSlider } from "../ProductSlider";
import style from '../styles.module.css'
import { IoMdStar } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { useState, useEffect, Fragment, useRef, } from "react";

import 'react-responsive-pagination/themes/classic.css';
;
import { InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { API_BASE_URL } from "../../../../config/apiConfig";
import "react-responsive-carousel/lib/styles/carousel.min.css";
//require("bootstrap/less/bootstrap.less");
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { center } from '@cloudinary/url-gen/qualifiers/textAlignment';
import { useDispatch } from 'react-redux';
import { addItemInCart, getCart, removeItemInCart } from '../../../state/cart/cartSlice';
import axios from 'axios';
export default function Edititem({data}) {
  const [productDetails,setProductDetails] = useState(data?.product);
  const [mainProductId,setMainProductId] = useState(data?._id);
  const handleChange = (event) => {
    
    // Update the selected value state
    fetch(`${API_BASE_URL}/api/products/?category=${productDetails.category}&brand=${event.target.value}`, {
      method: 'GET'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(selectedProducts => {
      //  console.log("hello", selectedProducts);

        for (let i = selectedProducts.length - 1; i >= 0; i--) {
          if (selectedProducts[i].brand == event.target.value) {
            let lastMatchingProduct = selectedProducts[i];
            setProductDetails(lastMatchingProduct);    
            break; // Exit loop once the last matching product is found
          }
        }

      })
      .catch(error => {
        console.error('There was a problem with the fetch request:', error);
      });
  };
  const dispatch = useDispatch()
  const removeItem = async (id) => {
    const data = { productId: id }
   dispatch(addItemInCart(data)).then(()=>dispatch(getCart())).catch((error)=>console.log(error))
   dispatch(removeItemInCart(mainProductId))
   .then(() => {
     dispatch(getCart());
   })
     .catch(error => {
       // Handle error, if any
       console.error('Error removing item from cart:', error);
     });
}

useEffect(()=>{
getCart()
},[dispatch])
  return (
      <div style={{zIndex:'1000',display:'flex',alignItems:'center' ,height:'auto',marginTop:'-.7rem'}}>
         <div className={style.carousel} style={{ width: '100%', height: '10rem' ,justifyContent:'center'}}> 
                <div  style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%',}}>
                <EProductSlider imagesdata={productDetails?.imageUrl}  />
                </div>
                <div className={style.info} style={{ width: '100%', marginLeft: '2px',marginTop:'1px' }}>
                  <div className={style.price} style={{display:'flex',flexDirection:'row'}}> <span><p className=' tracking-tight text-gray-600  line-through px-2 '>${productDetails?.price}</p></span>${productDetails?.discountedPrice}</div>
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

                    >
                      {productDetails?.sizes.map((item, index) => (

                        <MenuItem value={item} key={index}>
                          {item}
                        </MenuItem>

                      ))
                      }

                    </Select>
                  </div>
                  <div>
                    <button className={style.cartBtn}style={{ marginLeft: '1rem', width: '90%' }} onClick={() => removeItem(productDetails?._id)}>
                      Save
                    </button>
               
              

             

                </div>
              
            
              
                
              </div>
    </div>
      </div>
  )
}
