import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import style from '../../components/custom/styles.module.css'
import { useNavigate } from 'react-router-dom';
export default function Carousel({data}) {
const navigate = useNavigate()
    const responsive = {
    
        1024: { items: 1 },
    };
    
const items = data.map((i)=> <div  style={{ borderRadius:'0',border:'none',display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',marginRight:'.8rem'}} onClick={()=>navigate(`/product/${i.slug}/${i._id}`)} >
   <img src={i?.imageUrl[0]}   alt='img' style={{width:'95vw',height:'25rem'}}/>
 
   <h1 className={style.text} style={{fontWeight:'700',width:'90%',fontSize:'1rem',display:'flex',alignSelf: "flex-start" ,}}>{i?.title.substring(0, 20)}...</h1>
   <h1 className={style.text} style={{ fontWeight: '500', width: '90%', fontSize: '1rem', display: 'flex', alignSelf: "flex-start" }}> <span><p className=' tracking-tight text-gray-600  line-through px-2 '>${i.price}</p></span> $ {i.discountedPrice}</h1>
  
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
  
const items = data.map((i)=> <div  style={{ borderRadius:'0',border:'none',display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}} onClick={()=>navigate(`/product/${i.slug}/${i._id}`)} >
 <img src={i?.imageUrl[0]}   alt='img' style={{width:'95vw',height:'25rem',}}/>

 <h1 className={style.text} style={{fontWeight:'700',width:'90%',fontSize:'1rem',display:'flex',alignSelf: "flex-start" , paddingLeft:'1rem'}}>{i?.title.substring(0, 20)}...</h1>
 <h1 className={style.text} style={{ fontWeight: '500', width: '90%', fontSize: '1rem', display: 'flex', alignSelf: "flex-start" }}> <span><p className=' tracking-tight text-gray-600  line-through px-2 '>${i.price}</p></span> $ {i.discountedPrice}</h1>


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
