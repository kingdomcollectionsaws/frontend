
import React, { useDebugValue, useEffect, useState } from 'react'
import logo from '../../public/kc-logo.png'
import india from '../../public/indiaFlag.png'
import style from '../../src/customer/components/custom/styles.module.css'
import { IoSearch ,IoPerson} from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useLocation, useNavigate } from 'react-router-dom';
import AuthModel from './auth/AuthModel';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetail } from './state/Auth/registerSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCart } from './state/cart/cartSlice';
export default function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation()
    const [handleOpenAuth,setHandleOpeneAuth]= useState(false);
    const {user,error} = useSelector(store=>store.user);
    const {cart} = useSelector(store=>store.cart);
    const [SearchValue,setSearchValue] = useState()
    const jwt = localStorage.getItem('jwt');
    useEffect(()=>{
      dispatch(getCart())
       dispatch(getUserDetail()) ;
       if(user){
        setHandleOpeneAuth(false)
       }
       if(location.pathname === "/login"){
        setHandleOpeneAuth(true)
       }
       if(location.pathname === "/register"){
        setHandleOpeneAuth(true)
       }
       if(location.pathname === "/Guest"){
        setHandleOpeneAuth(true)
       }
    },[dispatch,jwt,location])
  
    const handleClose = ()=>{
        setHandleOpeneAuth(false)
        navigate("/")
      }
      const handleOpen = ()=>{
        navigate("/login")
        setHandleOpeneAuth(true)
      }
    const gocart = () => {
        navigate('/cart')
      }
      const searchvalue = (e)=>{
        setSearchValue(e.target.value);
      }
      const en = (event)=>{
        if(event.keyCode == 13){
            navigate(`/searchproducts/${SearchValue}`)}
      }
    return (
        <>
            <div className={style.navber}>
                <div className="logo" onClick={()=>navigate('/')} style={{cursor:'pointer'}}> 
                    <img src={logo} width={240} height={70} alt="Description"/>
                </div>
                <div className={style.search}>
                    <input placeholder='Search..' className={style.input} onChange={searchvalue}  onKeyDown={en} />
                    <div className={style.searchIconDiv}><IoSearch className={style.searchIcon} onClick={()=>navigate(`/searchproducts/${SearchValue}`)}  /></div>
                </div>
                <div className={style.navberList}>
                     { user && user?.role != 'GUEST' ?<div className={style.signIn} title='my account' onClick={()=>navigate('/profile')}>
                        <IoPerson/>
                        </div>:<div className={style.signIn} title='sign in' style={{fontSize:'1rem',width:'5rem'}} onClick={handleOpen}  >Sign in</div>
                        } 
                    {/* <div className={style.signIn} title='sign in'>Sign in</div> */}
                    <div className={style.like}><FaRegHeart /></div>
                    <div className={style.cart} onClick={gocart}>
                       
                        <FiShoppingCart />
                        <span className={style.cartValue}>{cart?.cartItems.length?cart?.cartItems.length:0}</span>
                        </div>
                </div>
            </div>
            <AuthModel  handleClose={handleClose} open={handleOpenAuth}/>
        </>
    )
}
