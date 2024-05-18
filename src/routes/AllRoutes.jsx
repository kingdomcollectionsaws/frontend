import React, { useEffect, useState , Suspense, lazy} from 'react'
import {Route, Routes} from "react-router-dom"
import Homepage from '../customer/pages/homepage/Homepage'
const Cart = lazy(() => import('../customer/components/cart/Cart'));
import Order from '../customer/components/order/Order'
import Checkout from '../customer/components/checkout/Checkout'
import OderDetail from '../customer/components/order/OrderDetail'
import ProductDetailPage from '../customer/components/custom/productId/page'
import Header from '../customer/Header'
import ProfilePage from '../profile/Profile'
import UpadteProfile from '../profile/UpdateProfile'
import CategoryProduct from '../customer/components/custom/CategoryProduct'
import Dashboard from '../admin/Dashboard'
import SearchProducts from '../SearchProducts'
import PrivacyPolicy from '../customer/PrivacyPolicy'
import AboutUs from '../customer/About'
import ShippingPolicy from '../customer/ShippingPolicy'
import ContactUs from '../customer/Contact'
import BlogDetails from '../customer/BlogDetails'
import PaymentCancel from '../customer/PaymentCancel'
import AllBlogs from '../customer/AllBlogs'
import Allproducts from '../customer/Allproducts'
import Forgotpassword from '../profile/Forgotpassword'
import Loader from '../customer/Loader';
import Resetpassword from '../profile/Resetpassword';
import Mainproducts from '../customer/components/custom/MainProducts';


export default function AllRoutes() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(()=>{
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    // Call handleResize on initial render
    handleResize();

    // Add event listener to listen for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[])
  return (
    <>
 <Header/>
 {isMobile?<div style={{height:'4rem'}}></div>:''}
    <Routes>
<Route path='/' element={<Homepage/>}/>
<Route path='/login' element={<Homepage/>}/>
<Route path='/register' element={<Homepage/>}/>
<Route path='/cart' element={<Suspense fallback={<div><Loader/></div>}><Cart/> </Suspense>}/>
<Route path='/profile' element={<ProfilePage/>}/>
<Route path='/profile/update' element={<UpadteProfile/>}/>
<Route path='/checkout' element={<Checkout/>}/>
<Route path='/product/:name/:id' element={<ProductDetailPage/>}/>
<Route path='/all/products' element={<Mainproducts/>}/>
<Route path='/product/:id' element={<ProductDetailPage/>}/>
<Route path='/searchproducts/:search' element={<SearchProducts/>}/>
<Route path='/products/:category' element={<CategoryProduct/>}/>
<Route path='/allproducts/' element={<Allproducts/>}/>
<Route path='/account/order' element={<Order/>}/>
<Route path='/account/order/:order_id/:payment_id' element={<OderDetail/>}/>
<Route path='/AdmIn' element={<Dashboard/>}/>
<Route path='/Guest' element={<Cart/>}/>
<Route path='/PrivacyPolicy' element={<PrivacyPolicy/>}/>
<Route path='/About' element={<AboutUs/>}/>
<Route path='/ShippingPolicy' element={<ShippingPolicy/>}/>
<Route path='/Contact' element={<ContactUs/>}/>
<Route path='/forgotpassword' element={<Forgotpassword/>}/>
<Route path='/reset-password/?' element={<Resetpassword/>}/>
<Route path='/blog/:slug' element={<BlogDetails/>}/>
<Route path='/blog/all' element={<AllBlogs/>}/>
<Route path='/paynment/paymentcanceled' element={<PaymentCancel/>}/>
    </Routes>
    
    </>

  )
}