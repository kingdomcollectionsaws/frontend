
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
export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation()
  const [handleOpenAuth, setHandleOpeneAuth] = useState(false);
  const { user, error } = useSelector(store => store.user);
  const { cart } = useSelector(store => store.cart);
  const [SearchValue, setSearchValue] = useState()
  const jwt = localStorage.getItem('jwt');
  const [isMobile, setIsMobile] = useState(false);
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
    if (location.pathname === "/checkout?step=2") {
      setHandleOpeneAuth(false)
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
  }, [dispatch, jwt, location,cart?.cartItems.length ])

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
  }
  const en = (event) => {
    if (event.keyCode == 13) {
      navigate(`/searchproducts/${SearchValue}`)
    }
  }
  return (
    <>
      {!isMobile?<>

        <div className={style.navber}>
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src={logo} width={180} height={70} alt="Description" />
        </div>
        <div style={{margin:'0 1rem 0 1rem'}}>
          <HeaderCategory/>
        </div>
       
        <div className={style.search}>
          <input placeholder='Search..' className={style.input} onChange={searchvalue} onKeyDown={en} />
          <div className={style.searchIconDiv}><IoSearch className={style.searchIcon} onClick={() => navigate(`/searchproducts/${SearchValue}`)} /></div>
        </div>
        <div className={style.navberList}>
          {user && user?.role != 'GUEST' ? <div className={style.signIn} title='my account' onClick={() => navigate('/profile')}>
            <IoPerson />
          </div> : <div className={style.signIn} title='sign in' style={{ fontSize: '1rem', width: '5rem' }} onClick={handleOpen}  >Sign in</div>
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
     
      <div className={style.navber} style={{flexDirection:'column',gap:'4px',}}>
        <div style={{display:'flex',flexDirection:'row'}}>
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src={logo} width={180} height={70} alt="Description" />
        </div>
        <div className={style.navberList}>
          {user && user?.role != 'GUEST' ? <div className={style.signIn} title='my account' onClick={() => navigate('/profile')}>
            <IoPerson />
          </div> : <div className={style.signIn} title='sign in' style={{ fontSize: '1rem', width: '5rem' }} onClick={handleOpen}  >Sign in</div>
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
      <div style={{margin:'0',width:'30%'}}>
          <HeaderCategory/>
        </div>
       
        <div className={style.search} style={{width:'67%'}}>
          <input placeholder='Search..' className={style.input} onChange={searchvalue} onKeyDown={en}  style={{width:'100%'}} />
          <div className={style.searchIconDiv}><IoSearch className={style.searchIcon} onClick={() => navigate(`/searchproducts/${SearchValue}`)} /></div>
        </div>
      </div>
       
      </div>
      <AuthModel handleClose={handleClose} open={handleOpenAuth} />
      
      </>}
    </>
  )
}
