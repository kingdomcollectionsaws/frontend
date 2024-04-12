
import { PieChart } from '@mui/x-charts/PieChart';
import { API_BASE_URL } from '../config/apiConfig';
import React,{ useEffect,useState } from 'react';


export default function Orderpie() {
  const [loading,setLoading] = useState(true);
  const [ordersData,setOrdersData] = useState([]);
  const [orderpending,setOrderpending] = useState(0);
  const [orderplaced,setOrderplaced] = useState([]);
  const [orderdelivered,setOrderdelivered] = useState([]);
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
      console.log('order:', orders);
      setOrdersData(orders)
      setLoading(false)
      let pendingCount = 0;
      let placedCount = 0;
      let deliveredCount = 0;

      orders.forEach(order => {
        if (order.orderStatus=== 'PENDING') {
          pendingCount++;
        } else if (order.orderStatus === 'PLACED') {
          placedCount++;
        } else if (order.orderStatus  === 'DELIVERED') {
          deliveredCount++;
        }
      });
console.log(pendingCount);
      // Update state variables
      setOrderpending(pendingCount);
      setOrderplaced(placedCount);
      setOrderdelivered(deliveredCount);
      })
      .catch(error => {
      console.error('There was a problem with the fetch request:', error);
      });
       }
  return (
    <PieChart
    
      series={[
        {
          data: [
            { id: 0, value: orderpending, label: `Order Pending ${orderpending}` },
            { id: 1, value: orderplaced, label: `Order Placed ${orderplaced}` },
            { id: 2, value: orderdelivered, label: `Order Delivered ${orderdelivered}` },
          ],
        },
      ]}
      width={500}
      height={200}
    />
  );
}

