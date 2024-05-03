
import React, {  useEffect, useState } from 'react'
import logo from '../../public/kc-logo.png'
import style from '../../src/customer/components/custom/styles.module.css'
import { IoSearch, IoPerson } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useLocation, useNavigate } from 'react-router-dom';
import AuthModel from './auth/AuthModel';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetail } from './state/Auth/registerSlice';
import 'react-toastify/dist/ReactToastify.css';
import { getCart } from './state/cart/cartSlice';
import { BsHandbag } from "react-icons/bs";
import HeaderCategory from './HeaderCategory';
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';
export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation()
  const [handleOpenAuth, setHandleOpeneAuth] = useState(false);
  const { user, error } = useSelector(store => store.user);
  const { cart } = useSelector(store => store.cart);
  const { products } = useSelector(store => store.allproducts);
  const [SearchValue, setSearchValue] = useState()
  const jwt = localStorage.getItem('jwt');
  const [isMobile, setIsMobile] = useState(false);
  const [suggestion,setSuggestion] = useState(false)
  const [suggestionvalue,setSuggestionvalue] = useState([])
  useEffect(() => {
    dispatch(getUserDetail())
    dispatch(getCart())
      ;
    if (location.pathname === "/login") {
      setHandleOpeneAuth(true)
    }
    if (location.pathname === "/register") {
      setHandleOpeneAuth(true)
    }
    if (location.pathname === "/checkout") {
      setHandleOpeneAuth(false);
    }
    if (location.pathname === "/Guest") {
      setHandleOpeneAuth(true)
    }
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
  }, [dispatch, jwt, location,cart?.cartItems.length])

  const handleClose = () => {
    setHandleOpeneAuth(false)
   
  }
  const handleOpen = () => {
    navigate("/login")
    setHandleOpeneAuth(true)
  }
  const gocart = () => {
    navigate('/cart')
  }
  const searchvalue = (e) => {
   
    setSearchValue(e.target.value);
    if(e.target.value.trim() == ''){
      setSuggestion(false);
    }else{
      const matchingProducts = products.filter(product => product.title.toLowerCase().includes(e.target.value.toLowerCase()));
        const matchingTitles = matchingProducts.map(product => product.title.slice(0,30));
        console.log(matchingProducts,products,e);
        setSuggestionvalue(matchingTitles);
        setSuggestion(true);
        
    }
  }
  const en = (event) => {
    if (event.keyCode == 13) {
      navigate(`/searchproducts/${SearchValue}`)
    }
  }
  const closesearch = ()=>{
    setSearchValue(''); 
    setSuggestion(false);

  }  
  const [ userlocation,setUserlocation] = useState()
  const fetchIPInfo = async () => {
    try {
        const response = await fetch('https://ipinfo.io/json?token=b557ac5d05d643');
        if (!response.ok) {
            throw new Error(`Failed to fetch IP information. Status: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        setUserlocation(data.country)
    } catch (error) {
        console.log('Error fetching IP information:', error.message);
    }
};
  useEffect(()=>{
    fetchIPInfo()
  },[])
  return (
    <>
      {!isMobile?<>
        <div style={{width:'100%',top:'13%',position:'absolute',display:'flex',alignItems:'center',justifyContent:'center'}}>
          {
      suggestion? <div style={{position:'sticky',backgroundColor:'#fff',width:'40%',paddingLeft:'1rem',top:'7%',marginLeft:'1rem',boxShadow:'2px 2px 2px #BEBEBE',zIndex:'1000'}}>
      {suggestionvalue?.map((i)=>(
        <h1 style={{cursor:'pointer',marginBottom:'.5rem'}} className='hover:bg-gray-200' onClick={() => {SearchValue.trim()?(navigate(`/searchproducts/${SearchValue}`),setSuggestion(false)):''}}>{i}...</h1>
      ))}
        

      </div>:''
     }
          </div>
        <div className={style.navber}>
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src={logo} width={180} height={70} alt="Description" />
        </div>
        <div style={{margin:'0 1rem 0 1rem'}}>
          <HeaderCategory/>
        </div>
       
        <div className={style.search}>
          <input placeholder='Search..' value={SearchValue} className={style.input} onChange={searchvalue} onKeyDown={en} />
          
        {!SearchValue?.trim()==''?  <div className={style.searchIconDiv} style={{right:'7%',backgroundColor:'#fff'}}>
          <AiOutlineClose  onClick={closesearch}/>
             </div>:''}
           <div className={style.searchIconDiv} style={{flexDirection:'row'}}>
             <IoSearch className={style.searchIcon} onClick={() => {SearchValue.trim()?navigate(`/searchproducts/${SearchValue}`):''}} />
             </div>
         
        </div>

        <div className={style.navberList}>
         <div  style={{width:'2rem',height:'2rem' ,borderRadius:'50%', overflow: 'hidden',display:'flex',alignItems:'center'}} >
          <img src={`https://flagsapi.com/${userlocation?userlocation:'US'}/flat/64.png` } style={{ width: '3rem', height: '3rem', objectFit:'cover' }}/>
          </div> 
          {user && user?.role != 'GUEST' ? <div className={style.signIn} title='my account' onClick={() => navigate('/profile')}>
            <IoPerson />
          </div> : <div className={style.signIn} title='sign in' style={{ fontSize: '1rem', width: '5rem',fontWeight:'600' }} onClick={handleOpen}  >Sign in</div>
          }
          {/* <div className={style.signIn} title='sign in'>Sign in</div> */}
          <div className={style.like} onClick={()=>navigate('/account/order')}><BsHandbag /></div>
          <div className={style.cart} onClick={gocart}>

            <FiShoppingCart />
            <span className={style.cartValue}>{cart?.cartItems.length ? cart?.cartItems.length : 0}</span>
          </div>
        </div>
      </div>
      <AuthModel handleClose={handleClose} open={handleOpenAuth} />
      </>:<>
      <div style={{width:'100%',top:'11%',position:'absolute',display:'flex',alignItems:'center',justifyContent:'center'}}>
   
          {
      suggestion? <div style={{position:'sticky',backgroundColor:'#fff',width:'100%',paddingLeft:'1rem',top:'7%',marginLeft:'1rem',boxShadow:'2px 2px 2px #BEBEBE',zIndex:'1000'}}>
      {suggestionvalue?.map((i)=>(
        <h1 style={{cursor:'pointer',marginBottom:'.5rem'}} className='hover:bg-gray-200' onClick={() => {SearchValue.trim()?(navigate(`/searchproducts/${SearchValue}`),setSuggestion(false)):''}}>{i}...</h1>
      ))}

      </div>:''
     }
          </div>
          
      <div className={style.navber} style={{flexDirection:'column',gap:'4px',}}>
     
        <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src={logo} width={180} height={70} alt="Description" />
        </div>
        <div  style={{width:'2rem',height:'2rem' ,borderRadius:'50%', overflow: 'hidden',display:'flex',alignItems:'center'}} >
          <img src={`https://flagsapi.com/${userlocation?userlocation:'US'}/flat/64.png` } style={{ width: '3rem', height: '3rem', objectFit:'cover' }}/>
          </div> 
        <div className={style.navberList}>
       
        
      
          {user && user?.role != 'GUEST' ? 
          <div className={style.signIn} title='my account' onClick={() => navigate('/profile')}>
            <IoPerson />
          </div> : <div className={style.signIn} title='sign in' style={{ fontSize: '1rem', width: '10rem', }} onClick={handleOpen}  >Sign in</div>
          }
          {/* <div className={style.signIn} title='sign in'>Sign in</div> */}
          <div className={style.like} onClick={()=>navigate('/account/order')}><BsHandbag /></div>
          <div className={style.cart} onClick={gocart}>

            <FiShoppingCart />
            <span className={style.cartValue}>{cart?.cartItems.length ? cart?.cartItems.length : 0}</span>
          </div>
        </div>
        </div>
      <div style={{display:'flex',flexDirection:'row',width:'100%',gap:'4px'}}>
      <div style={{marginRight:'1rem',width:'30%'}}>
          <HeaderCategory/>
        </div>
       
        <div className={style.search} style={{width:'64%'}}>
          <input placeholder='Search..' className={style.input} onChange={searchvalue} onKeyDown={en}  style={{width:'100%'}}  value={SearchValue}/>
          {!SearchValue?.trim()==''?  <div className={style.searchIconDiv} style={{right:'14%',backgroundColor:'#fff'}}>
          <AiOutlineClose  onClick={closesearch}/>
             </div>:''}
          <div className={style.searchIconDiv}><IoSearch className={style.searchIcon} onClick={() => {SearchValue.trim()?navigate(`/searchproducts/${SearchValue}`):''}} /></div>
         
        </div>
       
      </div>
     
      </div>
      <AuthModel handleClose={handleClose} open={handleOpenAuth} />
     
      </>}
    </>
  )
}
