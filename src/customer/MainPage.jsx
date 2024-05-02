
import React, { useEffect, useState,lazy } from 'react'

import c1 from "../../public/c1.png"
import c2 from "../../public/c2.png"
import c3 from "../../public/c3.png"
import c4 from "../../public/c4.png"
import c5 from "../../public/c5.png"
import c6 from "../../public/c6.png"
import { GoArrowRight } from "react-icons/go";
import {  useNavigate } from "react-router-dom";
import Loader from './Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from './state/product/productSlice'
import Footer, { Mobilefooter } from './Footer'
import Carousel, { Carousel2 } from './components/homecarousel/Carousel'
import { getCart } from './state/cart/cartSlice'
import { getUserDetail } from './state/Auth/registerSlice'
import { API_BASE_URL } from '../config/apiConfig'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const carousel = lazy(() => import('./components/homecarousel/Carousel'));
import style from '../customer/components/custom/styles.module.css'
export default function MainPage() {
  const {cart} = useSelector(store=>store.cart);
  const {user} = useSelector(store=>store.user);
  
  //   {
  //     title: '9 Comfy Throws for Cosy Autumn Vibes',
  //     tag: 'Shopping Guides',
  //     img: b1,
  //     des: "Embrace the snuggling season with stylish throws that will warm your hearts."
  //   },
  //   {
  //     title: '14 Beautiful Bags That Express Your Unique Style',
  //     tag: 'Shopping Guides',
  //     img: b2,
  //     des: "Amp up your fashion game with bags that perfectly match your aesthetic."
  //   },
  //   {
  //     title: 'The Best Gift Ideas for Kids of All Ages',
  //     tag: 'Gifts Guides',
  //     img: b3,
  //     des: "Shop the sweetest surprises for all little ones in your family–these gifts for kids will definitely earn you some brownie points."
  //   },
  // ]
  const [allproduct, setAllproduct] = useState([])
  const [isMobile, setIsMobile] = useState(false);
  const cartnotify = (msg) => toast(<div style={{display:'flex',alignItems:'center',flexDirection:'column'}}><h1 style={{color:'tomato'}}>Limit stocks avaiable!</h1>
  <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row',gap:'20px',flexWrap:'wrap'}}>
    {cart?.cartItems.map((i)=>(
   <img src={i.product?.imageUrl[0]} alt="img"  style={{width:'3rem',height:'3rem'}}/>
    ))}
  </div>
 <button style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'4px',borderRadius:'12px',backgroundColor:'black',color:'#fff'}} onClick={()=>navigate('/cart')}>
  View cart & check out
  </button>
  <div>
  </div>
  </div>, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    delay:10000,
  });
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
  const [notificationShown, setNotificationShown] = useState(false)
  useEffect(() => {
    dispatch(getUserDetail())
    if (cart && cart.cartItems.length > 0 && !notificationShown) {
      // Notify when cart is updated
      cartnotify();
     
      setNotificationShown(true);
    }
   
  }, [cart,notificationShown]);
  const dispatch = useDispatch();
  const { products, loading } = useSelector(store => store.allproducts);
  //dispatch(getAllProducts())
  useEffect(() => {
    if (products.length > 0) {
      setAllproduct(products);
    }
  }, [products]);
  const CategoryList = [{
    slug:"gladiator-costume",
    name:"Gladiator Costume",
    image:c1
  },
  {
    slug:"mf-doom-mask",
    name:"Mf doom mask",
    image:c2
  },
  {
    slug:"nazgul-costume",
    name:"Nazgul costume",
    image:c3
  },
  {
    slug:"roman-costume",
    name:"Roman costume",
    image:c4
  },
  {
    slug:"spartan-costume",
    name:"Spartan costume",
    image:c5
  },
  {
    slug:"templar-costume",
    name:"Templar costume",
    image:c6
  }
]
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([]);
 
  
  const getblogs = async () => {
    try {
      const requestOptions = {
        method: 'GET',

      };
      const response = await fetch(`${API_BASE_URL}/api/blog/allblogs`, requestOptions);

      const data = await response.json();
  
      setBlogs(data)
     
    } catch (error) {
      console.error('There was a problem with the fetch request:', error);
    }
  }
  const [showoffer,setShowoffer] = useState(true)
  useEffect(()=>{
    getblogs()

  setTimeout(()=>{
    setShowoffer(false)
  },[5000])
  },[])
  return (   
 !loading ?
    <>
      <ToastContainer />
    {/* { showoffer ?<div style={{position:'absolute',width:'100%',height:'100%',backgroundColor:'black',opacity:'0.5',display:'flex',alignItems:'center',justifyContent:'center',}}>

      <div style={{width:'50%',height:'50%',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',backgroundColor:'#fff',position:'relative',zIndex:'10000',opacity:'1'}}>
        <h1>Sign up & get %50 </h1>
        <h1>Free</h1>
        <button>Sign up now</button>
      </div>
      </div>:''} */}
    { user?.role == 'GUEST' || !user ?  <h1 style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'center',}}> <span style={{color:'green',paddingRight:'1rem',cursor:'pointer'}} onClick={()=>navigate('/register')}>Sign up </span> & get $50 free!</h1>:''}
      <div style={{ overflowX: 'hidden', boxSizing: 'border-box', paddingLeft: '0', paddingRight: '0',marginTop:'3rem' }} className={style.mainPage}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          
          <h1 className={style.text} style={{ fontSize: '24px', color: '#222222', marginBottom: '-.5rem' }} >Shop by Category</h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: '15px' }} className={style.cate}>


            {
              CategoryList ?.slice(0, 6).map((i) => (
            
                  <div className={style.categoryProduct} onClick={()=>navigate(`/products/${i.slug}`)}>
                    <img src={i.image} style={{ borderRadius: '50%', width: "8rem", height: '8rem' }} alt='img' />
                    <p style={{ fontWeight: '600' ,width:'110%'}} >{i.name}</p>
                  </div>
               
              ))
            }
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: '.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', justifyContent: 'center' }}> <h1 className={style.text} style={{ fontSize: '24px', color: '#222222', marginBottom: '1rem' }}>Trending Items</h1>

          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }} className={style.cateHeading}>
            <div className={style.categoryHead}>All</div>
            <div className={style.categoryHead}>SALE</div>
            <div className={style.categoryHead}>FRESH</div>
            <div className={style.categoryHead}>GAUNTLETS</div>

          </div>
          {
            isMobile ? <Carousel2 data={allproduct.slice(4, 8)} /> : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: '15px' }}>
              {
                allproduct?.slice(4, 8).map((i) => (

                  <div className={style.gitfProduct} style={{ padding: '0', border: '.1px solid gray', borderRadius: '0', border: 'none' }} onClick={() => navigate(`/product/${i.slug}/${i._id}`)} >
                    <img src={i.imageUrl[0]} width={250} height={190} alt='img' />

                    <h1 className={style.text} style={{ fontWeight: '700', width: '90%', fontSize: '1rem', display: 'flex', alignSelf: "flex-start",cursor:'pointer' }} onClick={() => navigate(`/product/${i._id}`)}>{i.title.substring(0, 20)}...</h1>
                    <h1 className={style.text} style={{ fontWeight: '500', width: '90%', fontSize: '1rem', display: 'flex', alignSelf: "flex-start" }}> <span><p className=' tracking-tight text-gray-600  line-through px-2 '>${i.price}</p></span> $ {i.discountedPrice}</h1>


                  </div>
                ))
              }
            </div>
          }
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginLeft: '1rem', marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', justifyContent: 'center' }}> <h1 className={style.text} style={{ fontSize: '24px', color: '#222222', marginBottom: '1rem' }}> Our Bestsellers </h1>
          </div>
          {isMobile ? <div >
            <Carousel data={allproduct.slice(1, 5)} />
          </div> :
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: '20px' }}>
              {
                allproduct?.slice(1, 5).map((i) => (
                  <div className={style.gitfProduct} style={{ padding: '0', border: '.1px solid gray', borderRadius: '0', border: 'none' }} onClick={() => navigate(`/product/${i.slug}/${i._id}`)} >
                    <img src={i.imageUrl[0]} alt='img' style={{ width: '15rem', height: '15rem' }} />
                    <h1 className={style.text} style={{ fontWeight: '700', width: '90%', fontSize: '1rem', display: 'flex', alignSelf: "flex-start", cursor:'pointer' }} onClick={() => navigate(`/product/${i._id}`)}>{i.title.substring(0, 20)}...</h1>
                    <h1 className={style.text} style={{ fontWeight: '500', width: '90%', fontSize: '1rem', display: 'flex', alignSelf: "flex-start" }}> <span><p className=' tracking-tight text-gray-600  line-through px-2 '>${i.price}</p></span> $ {i.discountedPrice}</h1>
                  </div>
                ))}
            </div>
          }
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: '2rem' }}>
          <h1 className={style.text} style={{ fontSize: '24px', color: '#222222', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> Fresh from the blog <GoArrowRight /></h1>
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: '15px' }}>
            {
              blogs.slice(0,3).map((i, index) => (
                <div key={index} className={style.homeProduct} style={{ padding: '0', border: '.1px solid gray', alignItems: 'flex-start', gap: '10px', cursor:'pointer' }} onClick={()=>navigate(`/blog/${i.slug}`)} >
                  <img src={i?.image} height={250} style={{ borderRadius: '12px', width: '100%' }} alt='img' />
                  <div className={style.Blogtext}>Shopping Guides</div>
                  <div className={style.text} style={{ fontWeight: '600', paddingLeft: '2rem' }}>{i?.title}</div>
                  <div className={style.Blogtext} style={{ width: '20rem' }} >{i?.description.slice(0,100)}</div>
                </div>
              ))
            }
          </div>
          <div className={style.sub}>
            <p className={style.text} style={{ fontSize: '1rem' }}>Get unique gift ideas and so much more delivered right to your inbox.</p>
            <div className={style.emailinput}>
              <input placeholder='Enter your Email' className={style.input} style={{ width: '55%', border: 'none' }} />
              <div className={style.subBtn} >Subscribe</div>
            </div>
          </div>
        </div>
        {
          isMobile ? <Mobilefooter /> : <Footer />
        }
      </div></> : <Loader />
  )
}

