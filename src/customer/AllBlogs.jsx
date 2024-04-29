import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../config/apiConfig';
import style from '../customer/components/custom/styles.module.css'
import { useNavigate } from 'react-router-dom';
export default function AllBlogs() {
    const [blogs,setBlogs] = useState()
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
      
      useEffect(()=>{
        getblogs()
        
       
      
      },[])
      const navigate = useNavigate()
  return (
    <div style={{display:'flex',flexWrap:'wrap',gap:'20px',justifyContent:'center'}}>
          {
              blogs?.map((i, index) => (
                <div key={index} className={style.homeProduct} style={{ padding: '0', border: '.1px solid gray', alignItems: 'flex-start', gap: '10px', cursor:'pointer' }} onClick={()=>navigate(`/blog/${i.slug}`)} >
                  <img src={i?.image} height={250} style={{ borderRadius: '12px', width: '100%' }} alt='img' />
                  <div className={style.Blogtext}>Shopping Guides</div>
                  <div className={style.text} style={{ fontWeight: '600', paddingLeft: '2rem' }}>{i?.title}</div>
                  <div className={style.Blogtext} style={{ width: '20rem' }} >{i?.description.slice(0,100)}</div>
                </div>
              ))
            }
    </div>
  )
}
