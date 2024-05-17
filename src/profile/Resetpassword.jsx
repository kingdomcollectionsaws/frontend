import React,{useState} from 'react'
import { useParams } from 'react-router-dom'

export default function Resetpassword() {
  const urlParams = window.location.href;
  const [password,setPassword] = useState()
  const [cpassword,setCpassword] = useState()
  const sendemail = async()=>{
   if(password?.trim() !== '' && password==cpassword){
    const passdata ={
      password:password,

          }
          try {
            const response = await fetch(`http://localhost:5454/auth/reset-password/${urlParams.split('?')[1].slice(3,27)}/${urlParams.split('?')[1].slice(34,900)}`, {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify(emaildata)
              });
            const data = await response.json()
            alert(data.msg)
          } catch (error) {
            alert('Something is wrong or link expired')
          }
   }else{
alert('Passwords not matched')
   }
  }
    
      return (
        <div style={{display:'flex',alignItems:'center',marginTop:'5rem',flexDirection:'column',gap:'20px'}}>
            <input type="password" name='password' placeholder='Create a new Password' required onChange={(e)=>setPassword(e.target.value)} />
            <input type="text" name='password' placeholder='Confirm Password' required onChange={(e)=>setCpassword(e.target.value)} />
            <button onClick={sendemail}>Change password</button>
        </div>
      )
}
