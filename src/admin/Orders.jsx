import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../config/apiConfig';
import Fedex from './Fedex';
import { AiOutlineClose } from 'react-icons/ai';

export default function Orders() {
  const [loading,setLoading] = useState(true);
  const [ordersData,setOrdersData] = useState([]);
    useEffect(()=>{
        orders()
    },[])
    const orders = ()=>{
        const token = localStorage.getItem('jwt');
        const requestOptions = {
          method: 'GET',
          headers:{
            authorization: token
          }
        }
      fetch(`${API_BASE_URL}/api/admin/orders`, requestOptions)
      .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
      })
      .then(orders => {
     // console.log('order:', orders);
     setLoading(false)
      setOrdersData(orders)
     
      })
      .catch(error => {
      console.error('There was a problem with the fetch request:', error);
      });
       }
       const confirmedstatus = async (id) => {
        try {
            const token = localStorage.getItem('jwt');
            const requestOptions = {
                method: 'PUT',
                headers: {
                  authorization: token
              }
              
            };
    
            const response = await fetch(`${API_BASE_URL}/api/admin/orders/${id}/confirmed`, requestOptions);
    
            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }
    
            const msg = await response.json();

            // console.log('orderssss:', users);
            // const filteredUser = users.filter(user => user.role !== 'GUEST');
            // setAllusers(filteredUser);
        } catch (error) {
            console.error('There was a problem with the fetch request:', error);
        }
    };
    const shipstatus = async (id) => {
      try {
          const token = localStorage.getItem('jwt');
          const requestOptions = {
              method: 'PUT',
              headers: {
                authorization: token
            }
            
          };
  
          const response = await fetch(`${API_BASE_URL}/api/admin/orders/${id}/ship`, requestOptions);
  
          // if (!response.ok) {
          //     throw new Error('Network response was not ok');
          // }
  
          const msg = await response.json();

          // console.log('orderssss:', users);
          // const filteredUser = users.filter(user => user.role !== 'GUEST');
          // setAllusers(filteredUser);
      } catch (error) {
          console.error('There was a problem with the fetch request:', error);
      }
  };
  const deliverstatus = async (id) => {
    try {
        const token = localStorage.getItem('jwt');
        const requestOptions = {
            method: 'PUT',
            headers: {
              authorization: token
          }
          
        };

        const response = await fetch(`${API_BASE_URL}/api/admin/orders/${id}/deliver`, requestOptions);

        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }

        const msg = await response.json();

        // console.log('orderssss:', users);
        // const filteredUser = users.filter(user => user.role !== 'GUEST');
        // setAllusers(filteredUser);
    } catch (error) {
        console.error('There was a problem with the fetch request:', error);
    }
};
const deletestatus = async (id) => {
  try {
      const token = localStorage.getItem('jwt');
      const requestOptions = {
          method: 'DELETE',
          headers: {
            authorization: token
        }
        
      };

      const response = await fetch(`${API_BASE_URL}/api/admin/orders/${id}/delete`, requestOptions);

      // if (!response.ok) {
      //     throw new Error('Network response was not ok');
      // }

      const msg = await response.json();

      // console.log('orderssss:', users);
      // const filteredUser = users.filter(user => user.role !== 'GUEST');
      // setAllusers(filteredUser);
  } catch (error) {
      console.error('There was a problem with the fetch request:', error);
  }
};
const cancelstatus = async (id) => {
  try {
      const token = localStorage.getItem('jwt');
      const requestOptions = {
          method: 'PUT',
          headers: {
            authorization: token
        }
        
      };

      const response = await fetch(`${API_BASE_URL}/api/admin/orders/${id}/cancel`, requestOptions);

      // if (!response.ok) {
      //     throw new Error('Network response was not ok');
      // }

      const msg = await response.json();

      // console.log('orderssss:', users);
      // const filteredUser = users.filter(user => user.role !== 'GUEST');
      // setAllusers(filteredUser);
  } catch (error) {
      console.error('There was a problem with the fetch request:', error);
  }
};
const [fedexorderdata,setFedexorderdata]= useState()
const [fedexmenu,setFedexmenu]= useState(false)


const feddata = (item,feds)=>{
const grant_type = 'client_credentials';
const client_id = 'l7fac14eef2af1454787d2302a6fa57e1b';
const client_secret = 'c9888b2c3643479b872b5ac902286df3';

const params = new URLSearchParams({
    grant_type,
    client_id,
    client_secret
});

fetch("https://apis-sandbox.fedex.com/oauth/token", {
    method: 'POST',
    mode:'no-cors',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
})
.then(response => {
    // if (!response.ok) {
    //     throw new Error('Network response was not ok');
    // }
    
    return response.json();
})
.then(json => {
    console.log(json);
})
.catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});

}
  return (
  !loading? <div>
   { fedexmenu?
  <div style={{display:'flex',width:'100%',height:'150vh',backgroundColor:'#fff',margin:'2rem',flexDirection:'column'}}>
   <button onClick={()=>setFedexmenu(false)} style={{margin:'2rem',position:'absolute',right:'1%'}}>
    <AiOutlineClose/>
    </button>
    <Fedex orderdata={fedexorderdata}/>

  </div>: ordersData?.map((item)=>(
      <div  className='flex align-center justify-around border shadow-lg mt-8 hover:scale-105 flex-warp flex-col m-10 p-5' style={{border:'1px solid black'}}>
           <div style={{margin:'.3rem'}}>
      <h1>Tracking id: <span style={{color:'#ff4000'}}>{item.trackingId?item.trackingId:'Not shiped yet'}</span> {item.trackingId?<span style={{cursor:'pointer',backgroundColor:'gray',color:'#fff'}} onClick={()=>{navigator.clipboard.writeText(item.trackingId);alert(" Tracking id copied")}}>Copy</span>:''}</h1>
      <h1>Total amount: ${item?.totalPrice}</h1>
      <h1>orderDate: {item?.orderDate.slice(0,10)}</h1>
      {item.trackingId?<h1 > <a href="https://www.fedex.com/en-in/tracking.html" target="_blank" rel="noopener noreferrer" style={{color:'blue'}}>Click here </a>to track your order</h1>:''}
    </div>
      {item.orderItems.map((i,index)=><div >
     <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}} key={index}>
    <div style={{width:'60%'}}>
    <div className=' rounded-sm sm:w-[5rem] sm:h-[5rem] h-[5rem] w-[5rem]  '>
    <img className='object-cover border rounded-lg' src={i.product?.imageUrl[0]} alt="img" />
      </div> 
    <div className='flex flex-col '>
      <p className='font-bold mb-2'></p>
      <p>Price: {i.price}</p>
      <p>Name: {i.product?.title}</p>
      <p>Style: {i.sizes[0]}</p>
      <p className=' mb-2'>Quantity: {i.quantity}</p>
      <p className=' mb-2'>Order date: {item.createdAt.slice(0,10)}</p>
      
      <p>{i.title}</p>
    </div>
   
    </div>
   
     </div>
     <h1 style={{fontWeight:'bold'}}> Order Address</h1>
     <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
    
  <div>
          <div className='flex flex-col' >
            <p className='font-bold mb-2'></p>
            <p>name: {item.shippingAddress?.firstName}</p>
            <p>mobile: {item.shippingAddress?.mobile}</p>
            <p>email: {item.shippingAddress?.email}</p>
            <p>country: {item.shippingAddress?.country}</p>
            <p>state: {item.shippingAddress?.state}</p>
            <p>city: {item.shippingAddress?.city}</p>
            <p>Address: {item.shippingAddress?.streetAddress}</p>
            <p>Zipcode: {item.shippingAddress?.zipCode}</p>
            <p>Note: {item.shippingAddress?.note}</p>
          </div>
  
  </div>
  <div>
  <h1 style={{fontWeight:'bold'}}> Billing Address</h1>
  
          <div className='flex flex-col'>
            <p className='font-bold mb-2'></p>
            <p>name: {item.shippingAddress?.billing.firstName}</p>
            <p>mobile: {item.shippingAddress?.billing.mobile}</p>
            <p>email: {item.shippingAddress?.billing.email}</p>
            <p>country: {item.shippingAddress?.billing.country}</p>
            <p>state: {item.shippingAddress?.billing.state}</p>
            <p>city: {item.shippingAddress?.billing.city}</p>
            <p>address: {item.shippingAddress?.billing.streetAddress}</p>
            <p>Zipcode: {item.shippingAddress?.billing.zipCode}</p>
          </div>
  </div>
    
    </div>
     </div>
    )} 
    
    <p className='font-semibold mb-2'>Status: {item.orderStatus}</p>
   <button>Update status</button>
   <div style={{display:'flex',flexDirection:'row', alignItems:'center',justifyContent:'center',gap:'20px',marginTop:'1rem'}}>
   <button onClick={()=>confirmedstatus(item._id)} style={{background:'black',color:'#fff',padding:'4px'}}>Confirmed</button>
   <button onClick={()=>shipstatus(item._id)} style={{background:'black',color:'#fff',padding:'4px'}}>Ship</button>
   <button onClick={()=>deliverstatus(item._id)} style={{background:'black',color:'#fff',padding:'4px'}}>Deliver</button>
   <button onClick={()=>deletestatus(item._id)} style={{background:'black',color:'#fff',padding:'4px'}}>Delete</button>
   <button onClick={()=>cancelstatus(item._id)} style={{background:'black',color:'#fff',padding:'4px'}}>Cancel</button>
   <button style={{background:'black',color:'#fff',padding:'4px'}} onClick={()=>{setFedexmenu(true);setFedexorderdata(item)}}>Fedex</button>
   </div>

    <div>
      
    </div>
    </div>
   
    ))}
   
   </div>:<h1 style={{height:'80vh',width:'70%'}}>Loading..</h1>
  )
}
