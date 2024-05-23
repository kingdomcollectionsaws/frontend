import React,{useState} from 'react'
import { useParams } from 'react-router-dom'
import { API_BASE_URL } from '../config/apiConfig';

export default function Resetpassword() {
  const urlParams = window.location.href;
  const [password,setPassword] = useState()
  const [cpassword,setCpassword] = useState()
  const sendemail = async()=>{
   if(password?.trim() !== '' && password==cpassword){
    const passdata ={
      password:password,
      token:urlParams.split('?')[1].slice(34,900),
      id:urlParams.split('?')[1].slice(3,27)

          }
          try {
            
            const response = await fetch(`${API_BASE_URL}/auth/reset-password/${urlParams.split('?')[1].slice(3,27)}/?${urlParams.split('?')[1].slice(34,900)}`, {
                  method: "PUT",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify(passdata)
              });
            const data = await response.json()
            alert(data.msg);
            console.log(response);
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
