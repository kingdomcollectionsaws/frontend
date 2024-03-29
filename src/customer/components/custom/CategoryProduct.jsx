import React, { useEffect, useState } from 'react'
import style from '../custom/styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../Loader'
import { getAllProducts } from '../../state/product/productSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { API_BASE_URL } from '../../../config/apiConfig'
export default function CategoryProduct() {
  const navigate = useNavigate()
    const { category } = useParams();
    const [ products,setProducts] = useState([])
    const [loading,setLoading] = useState(true)
  
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllProducts());
        productsfetch()
        
    },[dispatch])
    const productsfetch = ()=>{
      const requestOptions = {
        method: 'GET',
      };
      fetch(`${API_BASE_URL}/api/products/?category=${category}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(products => {
        console.log('Products pageee:', products);
        setProducts(products);
        setLoading(false)
      })
      .catch(error => {
        console.error('There was a problem with the fetch request:', error);
        setLoading(false)
      });
    }
  return (
    !loading?<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: '20px' }}>
    {
     products?.map((i) => (
        <div className={style.gitfProduct} style={{ padding: '0', border: '.1px solid gray', borderRadius: '0', border: 'none' }} onClick={() => navigate(`/product/${i._id}`)} >
          <img src={i.imageUrl[0]} alt='img' style={{ width: '15rem', height: '15rem' }} />
          <h1 className={style.text} style={{ fontWeight: '700', width: '90%', fontSize: '1rem', display: 'flex', alignSelf: "flex-start", }}>{i.title.substring(0, 20)}...</h1>
          <h1 className={style.text} style={{ fontWeight: '500', width: '90%', fontSize: '1rem', display: 'flex', alignSelf: "flex-start" }}>£ {i.price}</h1>
        </div>
      ))}
  </div>:<Loader/>
  )
}
