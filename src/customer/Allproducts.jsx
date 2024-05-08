
import React, { useEffect, useState,lazy } from 'react'
import {  useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from './state/product/productSlice'

import { getCart } from './state/cart/cartSlice'
import { getUserDetail } from './state/Auth/registerSlice'

import 'react-toastify/dist/ReactToastify.css';

import style from '../customer/components/custom/styles.module.css'

export default function Allproducts() {
  const { products, loading } = useSelector(store => store.allproducts);
    const {cart} = useSelector(store=>store.cart);
    const [allproduct, setAllproduct] = useState([])
    const [isMobile, setIsMobile] = useState(false);
    const all = ()=>{
      setAllproduct(products)
    }
    const sale = ()=>{
      let discounarr = []
      products.forEach((i)=>{
       let value = i.price-i.discountedPrice
       discounarr.push(i)
      })
     
      const sortedObjects = [...discounarr].sort((a, b) => b.price - a.discountedPrice);
    setAllproduct(sortedObjects )
    }
    const fresh = ()=>{

  const newarr = [...products].reverse()
 setAllproduct(newarr)
    }
    useEffect(() => {
      dispatch(getAllProducts());
      dispatch(getCart())
  
      const handleResize = () => {
        setIsMobile(window.innerWidth < 800);
      };
  
      // Call handleResize on initial render
      handleResize();
  
      // Add event listener to listen for window resize
      window.addEventListener('resize', handleResize);
  
      // Cleanup the event listener
      return () => {
        window.removeEventListener('resize', handleResize);
      };
  
    }, []);
    useEffect(() => {
      dispatch(getUserDetail())
     
    }, [cart]);
    const dispatch = useDispatch();
   
    //dispatch(getAllProducts())
    useEffect(() => {
      if (products.length > 0) {
        setAllproduct(products);
      }
    }, [products]);
    const navigate = useNavigate()
  return (
    <div style={{marginTop:'2rem'}}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }} className={style.cateHeading}>
            <div className={style.categoryHead} onClick={all}>All</div>
            <div className={style.categoryHead} onClick={sale}>SALE</div>
            <div className={style.categoryHead} onClick={fresh}>FRESH</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: '10px',}}>
              {
                allproduct?.map((i,index) => (
                  <div className={style.gitfProduct} style={{ padding: '0', border: '.1px solid gray', borderRadius: '.5rem', border: 'none' ,}} onClick={() => navigate(`/product/${i.slug}/${i._id}`)} >
                  <img src={i.imageUrl[0]}  alt='img' className='lg:w-[15rem] lg:h-[15rem]'  style={{borderRadius: '.5rem',}}/>

                  <h1 className={style.text} style={{ fontWeight: '700', width: '90%', fontSize: '1rem', display: 'flex', alignSelf: "flex-start",cursor:'pointer' }} onClick={() => navigate(`/product/${i._id}`)}>{i.title.substring(0, 12)}...</h1>
                  <h1 className={style.text} style={{ fontWeight: '800', width: '90%', fontSize: '1rem', display: 'flex', alignItems:'center',color:'#16A34A', }}> ${i.discountedPrice}<span><p className=' tracking-tight text-gray-600  line-through px-2 ' style={{fontSize:'15px',fontWeight:'300',paddingTop:'1px'}}>${i.price}</p></span> </h1>


                </div>
                ))
              }
            </div>
       
    </div>
  )
}
