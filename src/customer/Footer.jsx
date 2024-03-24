import React, { useState } from 'react'
import img from "../../public/img1.png"
import style from '../customer/components/custom/styles.module.css'
import { useNavigate } from 'react-router-dom';
import { IoIosArrowUp } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { FiInstagram } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
export default function Footer() {
  
    const navigate = useNavigate()
  return (
    <div>
          <footer className={style.footer}>
      <div className={style.leftColumn}  >
        <img src="/footerimg.jpg" alt="Logo" className={style.logo}   />
      </div>
      <div className={style.rightColumn} style={{backgroundColor:'black',paddingTop:'1rem'}}>
        <div className={style.column} >
          <h3>Shop</h3>
          <ul>
            <li>  <a href="#"> Gift cards </a> </li> 
            <li>  <a href="#">  Registry </a> </li> 
            <li>  <a href="#"> Sitemap </a> </li> 
            <li>  <a href="#">  blog </a> </li> 
            <li>  <a href="#"> United Kingdom </a> </li> 
            <li>  <a href="#"> Germany </a> </li> 
            <li>  <a href="#">Canada </a> </li> 
          </ul>
        </div>
        <div className={style.column}>
          <h3>Sell</h3>
          <ul>
            <li>  <a href="#"> Sell </a> </li> 
            <li>  <a href="#"> Teams </a> </li> 
            <li>  <a href="#"> Forums </a> </li> 
            <li>  <a href="#"> Affiliates & Creators </a> </li> 
          </ul>
        </div>
        <div className={style.column}>
          <h3>About</h3>
          <ul>
            <li>  <a href="#">  Inc. </a> </li> 
            <li>  <a href="#"> Policies </a> </li> 
            <li>  <a href="#"> Investors </a> </li> 
            <li>  <a href="#"> Careers </a> </li> 
            <li>  <a href="#"> Press </a> </li> 
            <li>  <a href="#"> Impact </a> </li> 
            <li>  <a href="#"> Legal imprint </a> </li> 
          </ul>
        </div>
        <div className={style.column}>
          <h3>Help</h3>
          <ul>
            <li>  <a href="#"> Help Centre </a> </li> 
            <li>  <a href="#"> Privacy settings </a> </li> 
          </ul>
        </div>
      </div>
    </footer>
    <footer className={style.footerEnd}>
      <div className={style.footerLeft}>
        <p><a href="#" > &copy; 2024  Inc. </a></p>
      </div>
      <div className={style.footerRight}>
      <div className={style.column} >
          <ul style={{ display:'flex',  flexDirection:'row',gap:'20px',justifyContent:'center',alignItems:'center'}}>
           <li>  <a href="#">  Terms of Use</a> </li> 
            <li>  <a href="#"> Privacy </a> </li> 
            <li>  <a href="#"> Interest-based ads </a> </li> 
            <li>  <a href="#"> Local Shops </a> </li> 
            <li>  <a href="#">  Regions </a> </li> 
          </ul>
        </div>
      </div>
    </footer>
    </div>
  )
}

 export const Mobilefooter = ()=>{
  const [open,setOpen] = useState(false);
  const [open2,setOpen2] = useState(false);
  const [open3,setOpen3] = useState(false);
  const [open4,setOpen4] = useState(false);
  return(
    <>
     <div className={style.leftColumn} style={{backgroundColor:'#fff'}} >
        <img src="/kc-logo.png" alt="Logo" className={style.logo}   />
      </div>
    <h2 className={style.toggleBtn} onClick={()=>setOpen(!open)}>Shop <span style={{ marginLeft: '295px' }}>{open ? <IoIosArrowUp /> : <IoIosArrowDown />}</span></h2>
                    {
                    open?<div className={style.column} >
                    <ul>
                      <li>  <a href="#"> Gift cards </a> </li> 
                      <li>  <a href="#">  Registry </a> </li> 
                      <li>  <a href="#"> Sitemap </a> </li> 
                      <li>  <a href="#">  blog </a> </li> 
                      <li>  <a href="#"> United Kingdom </a> </li> 
                      <li>  <a href="#"> Germany </a> </li> 
                      <li>  <a href="#">Canada </a> </li> 
                    </ul>
                  </div> : <h1></h1>
                  }
                   <h2 className={style.toggleBtn} onClick={()=>setOpen2(!open2)}>Sell <span style={{ marginLeft: '305px' }}>{open2 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span></h2>
                    {
                    open2? <div className={style.column}>
                    <ul>
                      <li>  <a href="#"> Sell </a> </li> 
                      <li>  <a href="#"> Teams </a> </li> 
                      <li>  <a href="#"> Forums </a> </li> 
                      <li>  <a href="#"> Affiliates & Creators </a> </li> 
                    </ul>
                  </div> : <h1></h1>
                  }
                   <h2 className={style.toggleBtn} onClick={()=>setOpen3(!open3)}>About <span style={{ paddingLeft: '290px' }}>{open3 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span></h2>
                    {
                    open3?<div className={style.column} >
                    <ul>
                    <li>  <a href="#">  Inc. </a> </li> 
            <li>  <a href="#"> Policies </a> </li> 
            <li>  <a href="#"> Investors </a> </li> 
            <li>  <a href="#"> Careers </a> </li> 
            <li>  <a href="#"> Press </a> </li> 
            <li>  <a href="#"> Impact </a> </li> 
            <li>  <a href="#"> Legal imprint </a> </li> 
                    </ul>
                  </div> : <h1></h1>
                  }
                   <h2 className={style.toggleBtn} onClick={()=>setOpen4(!open4)}>Help <span style={{ paddingLeft: '300px' }}>{open4 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span></h2>
                    {
                    open4?<div className={style.column} >
                    <ul>
                    <li>  <a href="#"> Help Centre </a> </li> 
            <li>  <a href="#"> Privacy settings </a> </li> 
                    </ul>
                  </div> : <h1></h1>
                
                  }
                    <div style={{display:'flex',alignItems:'center',flexDirection:'row',justifyContent:'center',gap:'20px' ,marginTop:'2rem',marginBottom:'2rem'}}>
                      <div className={style.icons}><a href="#"><FaFacebook/></a></div>
                      <div className={style.icons}><a href="#"><FiInstagram /></a></div>
                      <div className={style.icons}><a href="#"><FaTwitter/></a></div>
                      <div className={style.icons}><a href="#"><FaWhatsapp/></a></div>
                    </div>
                    <footer className={style.footerEnd}>
      <div className={style.footerLeft}>
        <p><a href="#" > &copy; 2024  Kingdom. </a></p>
      </div>
      <div className={style.footerRight}>
      <div className={style.column} >
          <ul style={{ display:'flex',  flexDirection:'row',gap:'20px',justifyContent:'center',alignItems:'center'}}>
           <li>  <a href="#">  Terms of Use</a> </li> 
            <li>  <a href="#"> Privacy </a> </li> 
            <li>  <a href="#"> Interest-based ads </a> </li> 
            <li>  <a href="#"> Local Shops </a> </li> 
            <li>  <a href="#">  Regions </a> </li> 
          </ul>
        </div>
      </div>
    </footer>
    </>
  )
}