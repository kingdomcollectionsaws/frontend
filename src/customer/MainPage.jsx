
import React, { useEffect, useState } from 'react'
import style from '../customer/components/custom/styles.module.css'
import b1 from "../../public/b1.jpg"
import b2 from "../../public/b4.jpg"
import b3 from "../../public/b3.jpg"
import { GoArrowRight } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import Loader from './Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from './state/product/productSlice'
import Footer, { Mobilefooter } from './Footer'
import Carousel, { Carousel2 } from './components/homecarousel/Carousel'
import { getCart } from './state/cart/cartSlice'
import { getUserDetail } from './state/Auth/registerSlice'
import ProfilePage from '../profile/Profile'
export default function MainPage() {
  const blogs = [
    {
      title: '9 Comfy Throws for Cosy Autumn Vibes',
      tag: 'Shopping Guides',
      img: b1,
      des: "Embrace the snuggling season with stylish throws that will warm your hearts."
    },
    {
      title: '14 Beautiful Bags That Express Your Unique Style',
      tag: 'Shopping Guides',
      img: b2,
      des: "Amp up your fashion game with bags that perfectly match your aesthetic."
    },
    {
      title: 'The Best Gift Ideas for Kids of All Ages',
      tag: 'Gifts Guides',
      img: b3,
      des: "Shop the sweetest surprises for all little ones in your family–these gifts for kids will definitely earn you some brownie points."
    },
  ]
  const [category, setCategory] = useState([])
  const [allproduct, setAllproduct] = useState([])
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getCart())
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
  }, []);
  const dispatch = useDispatch();
  const { products, loading } = useSelector(store => store.allproducts);
  //dispatch(getAllProducts())
  useEffect(() => {
    if (products.length > 0) {
      setAllproduct(products);
    }
  }, [products]);
  useEffect(() => {
    const apiKey = 'ck_503e81308c5e908b9050b367e98d837395f578c4';
    const apiSecret = 'cs_1ed4558d5120ba67905426b5f46f8a38efb47035';

    const credentials = `${apiKey}:${apiSecret}`;
    // Base64 encode the credentials
    const base64Credentials = btoa(credentials);
    const headers = new Headers({
      'Authorization': `Basic ${base64Credentials}`,
      'Content-Type': 'application/json'
    });
    const requestOptions = {
      method: 'GET',
      headers: headers,
    };

    fetch(`https://kingdomcollection.uk/wp-json/wc/v3/products/categories`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(products => {
        console.log('Products page:', products);
        setCategory(products)
      })
      .catch(error => {
        console.error('There was a problem with the fetch request:', error);
      });
  }, [dispatch])
  const navigate = useNavigate()
  return (
    !loading ?
      <div style={{ overflowX: 'hidden', boxSizing: 'border-box', paddingLeft: '0', paddingRight: '0' }} className={style.mainPage}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <h1 className={style.text} style={{ fontSize: '24px', color: '#222222', marginBottom: '-.5rem' }} >Shop by Category</h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: '15px' }} className={style.cate}>


            {
              category?.slice(0, 6).map((i) => (
                
                  <div className={style.categoryProduct} onClick={()=>navigate(`/products/${i.slug}`)} >
                    <img src={i.image?.src} style={{ borderRadius: '50%', width: "8rem", height: '8rem' }} alt='img' />
                    <p style={{ fontWeight: '600' }}>{i.name}</p>
                  </div>
               
              ))
            }
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: '.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', justifyContent: 'center' }}> <h1 className={style.text} style={{ fontSize: '24px', color: '#222222', marginBottom: '1rem' }}>Trending Items</h1>

          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }} className={style.cateHeading}>
            <div className={style.categoryHead}>All</div>

            <div className={style.categoryHead}>SALE</div>
            <div className={style.categoryHead}>FRESH</div>
            <div className={style.categoryHead}>GAUNTLETS</div>

          </div>
          {
            isMobile ? <Carousel2 data={allproduct.slice(4, 8)} /> : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: '15px' }}>
              {
                allproduct?.slice(4, 8).map((i) => (

                  <div className={style.gitfProduct} style={{ padding: '0', border: '.1px solid gray', borderRadius: '0', border: 'none' }} onClick={() => navigate(`/product/${i._id}`)} >
                    <img src={i.imageUrl[0]} width={250} height={190} alt='img' />

                    <h1 className={style.text} style={{ fontWeight: '700', width: '90%', fontSize: '1rem', display: 'flex', alignSelf: "flex-start", }}>{i.title.substring(0, 20)}...</h1>
                    <h1 className={style.text} style={{ fontWeight: '500', width: '90%', fontSize: '1rem', display: 'flex', alignSelf: "flex-start" }}>£ {i.price}</h1>


                  </div>
                ))
              }
            </div>
          }
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginLeft: '1rem', marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', justifyContent: 'center' }}> <h1 className={style.text} style={{ fontSize: '24px', color: '#222222', marginBottom: '1rem' }}> Our Bestsellers </h1>
          </div>
          {isMobile ? <div >
            <Carousel data={allproduct.slice(1, 5)} />
          </div> :
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: '20px' }}>
              {
                allproduct?.slice(1, 5).map((i) => (
                  <div className={style.gitfProduct} style={{ padding: '0', border: '.1px solid gray', borderRadius: '0', border: 'none' }} onClick={() => navigate(`/product/${i._id}`)} >
                    <img src={i.imageUrl[0]} alt='img' style={{ width: '15rem', height: '15rem' }} />
                    <h1 className={style.text} style={{ fontWeight: '700', width: '90%', fontSize: '1rem', display: 'flex', alignSelf: "flex-start", }}>{i.title.substring(0, 20)}...</h1>
                    <h1 className={style.text} style={{ fontWeight: '500', width: '90%', fontSize: '1rem', display: 'flex', alignSelf: "flex-start" }}>£ {i.price}</h1>
                  </div>
                ))}
            </div>
          }
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: '2rem' }}>
          <h1 className={style.text} style={{ fontSize: '24px', color: '#222222', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> Fresh from the blog <GoArrowRight /></h1>
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: '15px' }}>
            {
              blogs.map((i, index) => (
                <div key={index} className={style.homeProduct} style={{ padding: '0', border: '.1px solid gray', alignItems: 'flex-start', gap: '10px', }} >
                  <img src={i.img} height={250} style={{ borderRadius: '12px', width: '100%' }} alt='img' />

                  <div className={style.Blogtext}>{i.tag}</div>
                  <div className={style.text} style={{ fontWeight: '600', paddingLeft: '2rem' }}>{i.title}</div>
                  <div className={style.Blogtext} style={{ width: '20rem' }} >{i.des}</div>


                </div>
              ))
            }
          </div>
          <div className={style.sub}>
            <p className={style.text} style={{ fontSize: '1rem' }}>Get unique gift ideas and so much more delivered right to your inbox.</p>
            <div className={style.emailinput}>
              <input placeholder='Enter your Email' className={style.input} style={{ width: '55%', border: 'none' }} />
              <div className={style.subBtn} >Subscribe</div>
            </div>
          </div>

        </div>
        {
          isMobile ? <Mobilefooter /> : <Footer />
        }
      </div> : <Loader />
  )
}

