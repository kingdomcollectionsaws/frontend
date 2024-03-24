
import React, { useState } from 'react'
import logo from '../../public/kc-logo.png'
import india from '../../public/indiaFlag.png'
import style from '../../src/customer/components/custom/styles.module.css'
import { IoSearch ,IoPerson} from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import AuthModel from './auth/AuthModel';
import { useSelector } from 'react-redux';

export default function Header() {
    const navigate = useNavigate()
    const [handleOpenAuth,setHandleOpeneAuth]= useState(false);
    const {user} = useSelector(store=>store.user);
    
    const handleClose = ()=>{
        setHandleOpeneAuth(false)
        navigate("/")
      }
      const handleOpen = ()=>{
        setHandleOpeneAuth(true)
      }
    const gocart = () => {
        navigate('/cart')
      }
    const goprofile = () => {
        window.location.replace("https://kingdomcollection.uk/my-account/");
      }
    return (
        <>
            <div className={style.navber}>
                <div className="logo" onClick={()=>navigate('/')} style={{cursor:'pointer'}}> 
                    <img src={logo} width={240} height={70} alt="Description"/>
                </div>
                <div className={style.search}>
                    <input placeholder='Search for anything' className={style.input} />
                    <div className={style.searchIconDiv}><IoSearch className={style.searchIcon} /></div>
                </div>
                <div className={style.navberList}>
                     {user?<div className={style.signIn} title='my account' onClick={handleOpen}>
                        <IoPerson/>
                        </div>:<div className={style.signIn} title='sign in'>Sign in</div>
                        } 
                    {/* <div className={style.signIn} title='sign in'>Sign in</div> */}
                    <div className={style.indiaFlagDiv}>
                        <img src={india} style={{width:'25px',height:'25px'}} className={style.indiaFlag} alt="Description"/>
                    </div>
                    <div className={style.like}><FaRegHeart /></div>
                    <div className={style.cart} onClick={gocart}>
                       
                        <FiShoppingCart />
                        <span className={style.cartValue}>0</span>
                        </div>
                </div>
            </div>
            <AuthModel  handleClose={handleClose} open={handleOpenAuth}/>
        </>
    )
}
