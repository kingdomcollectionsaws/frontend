import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {carouseldata } from './carouseldata';
import style from '../../components/custom/styles.module.css'
import { useNavigate } from 'react-router-dom';
export default function Carousel({data}) {
const navigate = useNavigate()
    const responsive = {
    
        1024: { items: 1 },
    };
    
const items = data.map((i)=> <div  style={{padding:'0',border:'.1px solid gray', borderRadius:'0',border:'none',}} onClick={()=>navigate(`/product/${i._id}`)} >
   <img src={i?.imageUrl[0]}   alt='img' style={{width:'23rem',height:'25rem'}}/>
 
   <h1 className={style.text} style={{fontWeight:'700',width:'90%',fontSize:'1rem',display:'flex',alignSelf: "flex-start" ,}}>{i?.title.substring(0, 20)}...</h1>
   <h1 className={style.text} style={{fontWeight:'500',width:'90%',fontSize:'1rem',display:'flex',alignSelf: "flex-start"}}>£ {i?.price}</h1>
  
  
   </div>,)
  return (
    <>
    <div className='h-[30rem] relative z-10 '>
     <AliceCarousel
        mouseTracking
        items={items}
        responsive={responsive}
        controlsStrategy="alternate"
        disableButtonsControls
        autoPlay
        autoPlayInterval={1000}
        infinite
    /> 
    </div>
    </>
  )
}
export  function Carousel2({data}) {
  const navigate = useNavigate()
  const responsive = {
  
      1024: { items: 1 },
  };
  
const items = data.map((i)=> <div  style={{padding:'0',border:'.1px solid gray', borderRadius:'0',border:'none',marginLeft:'.7rem'}} onClick={()=>navigate(`/product/${i._id}`)} >
 <img src={i?.imageUrl[0]}   alt='img' style={{width:'23rem',height:'25rem'}}/>

 <h1 className={style.text} style={{fontWeight:'700',width:'90%',fontSize:'1rem',display:'flex',alignSelf: "flex-start" ,}}>{i?.title.substring(0, 20)}...</h1>
 <h1 className={style.text} style={{fontWeight:'500',width:'90%',fontSize:'1rem',display:'flex',alignSelf: "flex-start"}}>£ {i?.price}</h1>


 </div>,)
return (
  <>
  <div className='h-[30rem] relative z-10 '>
   <AliceCarousel
      mouseTracking
      items={items}
      responsive={responsive}
      controlsStrategy="alternate"
      disableButtonsControls
      autoPlay
      autoPlayInterval={1500}
      infinite
  /> 
  </div>
  </>
)
}
