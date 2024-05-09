import React, { useState } from 'react'
import { API_BASE_URL } from '../config/apiConfig'

export default function Forgotpassword() {
  const [email ,setEmail] = useState()
  const sendemail = async()=>{
    const emaildata ={
email:"email"
    }
    try {
      const res =  await fetch(`http://localhost:5454/auth/forgotpassword`,
      {method:'POST',
      body:JSON.stringify(emaildata)});
      const data = await res.json()
      alert(data.msg)
    } catch (error) {
      alert('Invalid email')
    }
  }

  return (
    <div style={{display:'flex',alignItems:'center',marginTop:'5rem',flexDirection:'column'}}>
        <input type="email" name='email' placeholder='Enter you email' required onChange={(e)=>setEmail(e.target.value)} />
        <button onClick={sendemail}>Send link</button>
    </div>
  )
}
