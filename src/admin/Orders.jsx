import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../config/apiConfig';

export default function Orders() {
  const [loading,setLoading] = useState(true);
  const [ordersData,setOrdersData] = useState([]);
  const [addressData,setAddressData] = useState([]);
    useEffect(()=>{
        orders()
        ordersadd()
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
      setOrdersData(orders)
      setLoading(false)
      })
      .catch(error => {
      console.error('There was a problem with the fetch request:', error);
      });
       }
       const ordersadd = ()=>{
        const token = localStorage.getItem('jwt');
        const requestOptions = {
          method: 'GET',
          headers:{
            authorization: token
          }
        }
      fetch(`${API_BASE_URL}/api/admin/orders/alladdress`, requestOptions)
      .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
      })
      .then(address => {
    //  console.log('address:', address);
      setAddressData(address)
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
const [feds,setFeds]= useState()
const fedexhandel = (item)=>{
  
  //console.log(item);
  addressData.map((address,index)=>{
    
    if (address._id== item.shippingAddress) {
setFeds(address)
    }
  })

  feddata(item,feds)
}

const feddata = (item,feds)=>{
console.log(item,feds);

 // Sample input data for creating a shipment
const input = {
  "RequestedShipment": {
    "ShipTimestamp": new Date().toISOString(), // Current timestamp
    "DropoffType": "REGULAR_PICKUP",
    "ServiceType": "FEDEX_GROUND",
    "PackagingType": "FEDEX_BOX", // e.g., FEDEX_BOX
    "Shipper": {
      "Contact": {
        "PersonName": "John Doe",
        "CompanyName": "Sender Company",
        "PhoneNumber": "1234567890"
      },
      "Address": {
        "StreetLines": ["123 Main St"],
        "City": "Anytown",
        "StateOrProvinceCode": "NY",
        "PostalCode": "12345",
        "CountryCode": "US"
      }
    },
    "Recipient": {
      "Contact": {
        "PersonName": "Jane Smith",
        "CompanyName": "Recipient Company",
        "PhoneNumber": "9876543210"
      },
      "Address": {
        "StreetLines": ["456 Elm St"],
        "City": "Othertown",
        "StateOrProvinceCode": "CA",
        "PostalCode": "54321",
        "CountryCode": "US"
      }
    },
    "ShippingChargesPayment": {
      "PaymentType": "SENDER",
      "Payor": {
        "ResponsibleParty": {
          "AccountNumber": "YOUR_ACCOUNT_NUMBER"
        }
      }
    },
    "LabelSpecification": {
      "LabelFormatType": "COMMON2D",
      "ImageType": "PDF",
      "LabelStockType": "PAPER_4X6"
    },
    "PackageCount": "1",
    "RequestedPackageLineItems": [{
      "SequenceNumber": "1",
      "Weight": {
        "Value": "1.0",
        "Units": "LB"
      },
      "Dimensions": {
        "Length": "10",
        "Width": "5",
        "Height": "4",
        "Units": "IN"
      }
    }]
  }
};

// Convert the input data to JSON string
const data = JSON.stringify(input);


}
useEffect(() => {
 // console.log(feds); // Log feds whenever it changes
}, [feds]);
  return (
  !loading? <div>
   {
  ordersData?.map((item)=>(
      <div  className='flex align-center justify-around border shadow-lg mt-8 hover:scale-105 flex-warp flex-col m-10 p-5' style={{border:'1px solid black'}}>
      {item.orderItems.map((i)=><div >
     <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
    <div style={{width:'60%'}}>
    <div className=' rounded-sm sm:w-[5rem] sm:h-[5rem] h-[5rem] w-[5rem]  '>
    <img className='object-cover border rounded-lg' src={i.product.imageUrl[0]} alt="img" />
      </div> 
    <div className='flex flex-col '>
      <p className='font-bold mb-2'></p>
      <p>Price: {i.price}</p>
      <p>Name: {i.product.title}</p>
      <p>Style: {i.sizes[0]}</p>
      <p className=' mb-2'>Quantity: {i.quantity}</p>
      <p className=' mb-2'>Order date: {item.createdAt.slice(0,10)}</p>
      
      <p>{i.title}</p>
    </div>
   
    </div>
    
   
     </div></div>
    )} 
    <h1 style={{fontWeight:'bold'}}> Order Address</h1>
     <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
    
  <div>
  {addressData.map((address,index)=>{
    
      if (address._id== item. shippingAddress) {
        
        return (
          <div className='flex flex-col' key={address.user}>
            <p className='font-bold mb-2'></p>
            <p>name: {address.firstName}</p>
            <p>mobile: {address.mobile}</p>
            <p>email: {address.email}</p>
            <p>country: {address.country}</p>
            <p>state: {address.state}</p>
            <p>city: {address.city}</p>
            <p>Address: {address.streetAddress}</p>
            <p>Zipcode: {address.zipCode}</p>
            <p>Note: {item.note}</p>
          </div>
        );
      }
      return null;
}) }
  </div>
  <div>
  <h1 style={{fontWeight:'bold'}}> Billing Address</h1>
  {addressData.map((address,index)=>{
      
      if (address._id== item. shippingAddress) {
        return (
          <div className='flex flex-col' key={address.user}>
            <p className='font-bold mb-2'></p>
            <p>name: {address.billing.firstName}</p>
            <p>mobile: {address.billing.mobile}</p>
            <p>email: {address.billing.email}</p>
            <p>country: {address.billing.country}</p>
            <p>state: {address.billing.state}</p>
            <p>city: {address.billing.city}</p>
            <p>address: {address.billing.streetAddress}</p>
            <p>Zipcode: {address.billing.zipCode}</p>
          </div>
        );
      }
      return null;
}) }
  </div>
    </div>
  
    <p className='font-semibold mb-2'>Status: {item.orderStatus}</p>
   <button>Update status</button>
   <div style={{display:'flex',flexDirection:'row', alignItems:'center',justifyContent:'center',gap:'20px',marginTop:'1rem'}}>
   <button onClick={()=>confirmedstatus(item._id)} style={{background:'black',color:'#fff',padding:'4px'}}>Confirmed</button>
   <button onClick={()=>shipstatus(item._id)} style={{background:'black',color:'#fff',padding:'4px'}}>Ship</button>
   <button onClick={()=>deliverstatus(item._id)} style={{background:'black',color:'#fff',padding:'4px'}}>Deliver</button>
   <button onClick={()=>deletestatus(item._id)} style={{background:'black',color:'#fff',padding:'4px'}}>Delete</button>
   <button onClick={()=>cancelstatus(item._id)} style={{background:'black',color:'#fff',padding:'4px'}}>Cancel</button>
   <button style={{background:'black',color:'#fff',padding:'4px'}} onClick={()=>fedexhandel(item)}>Fedex</button>
   </div>

    <div>
      
    </div>
    </div>
   
    ))
   
   }
   </div>:<h1>Loading..</h1>
  )
}
