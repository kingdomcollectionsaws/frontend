import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function PaymentCancel() {
    const navigate = useNavigate()
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'20px',height:'90vh'}}>
        <div>Payment Canceled! try again</div>
        <button style={{backgroundColor:'black',color:'#fff'}} onClick={()=>navigate('/cart')}> Go to cart</button>
    </div>
  )
}
