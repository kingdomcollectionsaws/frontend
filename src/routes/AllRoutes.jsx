import React from 'react'
import {Route, Routes} from "react-router-dom"
import Homepage from '../customer/pages/homepage/Homepage'
import Cart from '../customer/components/cart/Cart'
import Navigation from '../customer/components/navigation/Navigation'
import Order from '../customer/components/order/Order'
import Checkout from '../customer/components/checkout/Checkout'
import Productdetails from '../customer/components/productdetails/Productdetail'
import Product from '../customer/components/product/Product'
import OderDetail from '../customer/components/order/OrderDetail'
import ProductDetailPage from '../customer/components/custom/productId/page'
import Header from '../customer/Header'
import Footer from '../customer/Footer'
import ProfilePage from '../profile/Profile'
import UpadteProfile from '../profile/UpdateProfile'
import CategoryProduct from '../customer/components/custom/CategoryProduct'
import Dashboard from '../admin/Dashboard'

export default function AllRoutes() {

  
  return (
    <>
 <Header/>
    <Routes>
<Route path='/' element={<Homepage/>}/>
<Route path='/login' element={<Homepage/>}/>
<Route path='/register' element={<Homepage/>}/>
<Route path='/cart' element={<Cart/>}/>
<Route path='/profile' element={<ProfilePage/>}/>
<Route path='/profile/update' element={<UpadteProfile/>}/>
<Route path='/checkout' element={<Checkout/>}/>
<Route path='/product/:id' element={<ProductDetailPage/>}/>
<Route path='/products/:category' element={<CategoryProduct/>}/>
<Route path='/account/order' element={<Order/>}/>
<Route path='/account/order/:order_id/:payment_id' element={<OderDetail/>}/>
<Route path='/AdmIn' element={<Dashboard/>}/>
    </Routes>
    
    </>

  )
}
