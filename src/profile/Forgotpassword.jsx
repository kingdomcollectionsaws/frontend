import React, { useState } from 'react'
export default function Forgotpassword() {
  const [email,setEmail] = useState()
  const sendemail = async()=>{
    const emaildata ={
email:email
    }
    try {
      const response = await fetch("http://localhost:5454/auth/forgotpassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(emaildata)
        });
      const data = await response.json()
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
