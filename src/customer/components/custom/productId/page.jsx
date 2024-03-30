
//import img1 from "../../../../public/img1.png"
import ReactStars from "react-rating-stars-component";
import img1 from "../../../../../public/img1.png"
import fv from "../../../../../public/fv.png"
import Header from "../../../Header";
import ProductSlider from "../ProductSlider";
import style from '../styles.module.css'
import { IoMdStar } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import starimg from '../../../../../public/star.png'
import { FaRegHeart } from "react-icons/fa";
import hand from '../../../../../public/hand.jpg'
import brand from '../../../../../public/brand.png'
import { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { FaHand } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { GiCrumblingBall } from "react-icons/gi";
import { TbRulerMeasure } from "react-icons/tb";
import { PiGiftFill } from "react-icons/pi";
import { MdDateRange } from "react-icons/md";
import { BsBox2 } from "react-icons/bs";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import ricon from '../../../../../public/ricon.jpg';
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../state/product/productSlice";
import { useNavigate, useParams } from 'react-router-dom';
import Loader from "../../../Loader";
import { addItemInCart, getCart, updateItemInCart } from "../../../state/cart/cartSlice";
import Footer, { Mobilefooter } from "../../../Footer";
import { InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { Pagination } from "flowbite-react";
import { FormControl } from "react-bootstrap";
import { API_BASE_URL } from "../../../../config/apiConfig";
//require("bootstrap/less/bootstrap.less");
export default function ProductDetailPage({ params }) {
  const [count, setCount] = useState(0)
  const [countend, setCountend] = useState(5)
  const [open, setOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [open2, setOpen2] = useState(true)
  const [open3, setOpen3] = useState(true)
  const [isMobile, setIsMobile] = useState(false);
  const [data, setData] = useState()
  const [review, setReview] = useState()
  const [categories, setCategories] = useState([])
  const [productDetails, setProductDetails] = useState();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.user);
  const { product, loading } = useSelector(store => store.allproducts);
  const { cart } = useSelector(store => store.cart);
  const { id } = useParams();
  // Make the fetch request
  

  const paginationHandel = () => {
    setCount(count + 1);
    setCountend(countend + 5)
    setCurrentPage(countend + 1)
  }
  const allreviews = () => {
    setCount(6)
  }
  // if(productDetails){
  //   dispatch(findProductById(id))
  //  }
  const carts = (id) => {
const token = localStorage.getItem('jwt');
if(token){
  if(productDetails?.sizes.length > 0){
    if(selectedValue){
      const data = { productId: id }
      //ispatch(updateItemInCart({id:id,quantity:2,sizes:["red"]}))
      dispatch(addItemInCart(data));
      navigate('/cart')
    }else{
      alert("plaase select variation")
    }
  }else{
    const data = { productId: id }
    //ispatch(updateItemInCart({id:id,quantity:2,sizes:["red"]}))
    dispatch(addItemInCart(data));
    navigate('/cart')
  }
}
  
      alert('Please login before add item to cart')
  
  
    }
  useEffect(() => {
    Getreviews(id)
    dispatch(findProductById(id));
    setProductDetails(null);

    const apiKey = 'ck_503e81308c5e908b9050b367e98d837395f578c4'; // Use environment variable or default value
    const apiSecret = 'cs_1ed4558d5120ba67905426b5f46f8a38efb47035'; // Replace 'YOUR_API_SECRET' with your actual API secret
    const apiUrl = `https://kingdomcollection.uk/wp-json/wc/v3/products`; // Adjust the URL as needed
    const reviewUrl = `https://kingdomcollection.uk/wp-json/wc/v3/products/reviews/?520`;
    // Concatenate API key and secret with a colo
    const credentials = `${apiKey}:${apiSecret}`;
    // Base64 encode the credentials
    const base64Credentials = btoa(credentials);

    // Set up the request headers
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
        setCategories(products)
      })
      .catch(error => {
        console.error('There was a problem with the fetch request:', error);
      });
    // fetch(`https://kingdomcollection.uk/wp-json/wc/v3/products/reviews/?${570}`, requestOptions)
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    //   })
    //   .then(Review => {
    //     //console.log('reviews:', Review);
    //     setReview(Review);
    //   })
    //   .catch(error => {
    //     console.error('There was a problem with the fetch request:', error);
    //   });

  }, [dispatch, id])

  useEffect(() => {
    // Update product details when 'product' from Redux store changes
    if (product) {
      setProductDetails(product);
    }
  }, [product])
  useEffect(() => {
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
  }, [data]);
  const handleDiv = () => {
    setOpen(!open)
  }
  const handleDiv2 = () => {
    setOpen2(!open2)
  }
  const handleDiv3 = () => {
    setOpen3(!open3)
  }

  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value)
    localStorage.setItem('value', event.target.value);
    // Update the selected value state
  };
const Getreviews = (id)=>{
  const requestOptions = {
    method: 'GET',
  };
  fetch(`${API_BASE_URL}/api/reviews/product/${id}`, requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return  response.json();
  })
  .then(reviews=> {
    console.log('reviews:', reviews);
    setReview(reviews)
  })
  .catch(error => {
    console.error('There was a problem with the fetch request:', error);
  });
}
  return (
    !loading ? <>
      {
        isMobile ?
          <>
            <div className={style.main} style={{ boxSizing: 'border-box', padding: '0', margin: '0', height: '100vh' }}>
              <div className={style.carousel} style={{ width: '100%', height: '20rem' }}>
                <ProductSlider imagesdata={productDetails?.imageUrl} />
                <div className={style.info} style={{ width: '100%', marginLeft: '2px' }}>
                  <div className={style.limited}> Limited Stock! Order Now.</div>
                  <div className={style.price}>£{productDetails?.price}</div>
                  <div className={style.choose}>
                    Choose from multiple variations
                  </div>
                  <div className={style.des}>{productDetails?.title}</div>
                  <div className={style.stars}>
                    <ReactStars
                      count={5}
                      size={20}
                      activeColor="#222222"
                      value={5}
                      color='#222222'
                    />
                  </div>
                  <div className={style.check}>
                    <IoCheckmark style={{ color: '#5379DE', fontSize: '20px' }} />
                    <p className={style.checkP}> Arrives soon Get it by </p>
                    {/* <span style={{ borderBottom: '1px dashed black' }}>06-07 Mar</span> if you order today */}
                  </div>
                  <div className={style.check} style={{ marginTop: '.1rem' }}>
                    <IoCheckmark style={{ color: '#5379DE', fontSize: '20px' }} />
                    <p className={style.checkP}> Returns & exchanges accepted </p>
                  </div>
                  <div>
                    <p style={{ display: 'flex', alignItems: 'center', paddingLeft: '1rem' }}>Style<sup style={{ color: '#A61A2E', fontSize: '10px', }}> <IoMdStar /></sup></p>
                  </div>
                  <div style={{marginLeft:'1rem',width:'95%'}}>
                  <InputLabel id="demo-simple-select-label">{selectedValue?selectedValue:"choose an option"}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleChange}
                    style={{width:'95%' ,marginBottom:'1rem'}}
                    label="Age"
                    value={"kk"}
                  >
                    {productDetails?.sizes.map((item, index) => (

                      <MenuItem value={item} key={index}>
                        {item}
                      </MenuItem>

                    ))
                    }

                  </Select>
                  </div>
                  <div>
                    <button className={style.cartBtn} onClick={() => carts(productDetails?._id)} style={{ marginLeft: '1rem', width: '90%' }}>
                      Add to cart
                    </button>
                    <button className={style.cartBtn} style={{ marginTop: '1rem', marginBottom: '1rem', marginLeft: '1rem', width: '90%' }} onClick={() => carts(productDetails?._id)}>
                      Buy Now
                    </button>
                  </div>
                  <div className={style.starReview} style={{ marginTop: '1rem' }} >
                    <img src={starimg} width={60} height={35} alt="Description" />
                    <p className={style.checkP}><span style={{ fontFamily: 'bold', fontSize: '1rem' }}>Star Product</span> This product consistently earned 5-star reviews, dispatched on time and</p>
                  </div>

                  <div>
                    <h2 className={style.toggleBtn} onClick={handleDiv}>Item details <span style={{ marginLeft: '13rem' }}>{open ? <IoIosArrowUp /> : <IoIosArrowDown />}</span></h2>
                    {
                      !open ? <div style={{ fontFamily: '"Graphik Webfont", "-apple-system", "Helvetica Neue", "Droid Sans", "Arial", "sans-serif"', }}>
                        <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1rem', color: '#222222', alignItems: 'center', marginBottom: '1rem', gap: '10px' }}>
                          <FaHand />
                          <p>Handmade</p>
                        </div>
                        <div style={{ display: 'flex', fontSize: '1rem', color: '#222222', flexDirection: 'row', alignItems: 'center', marginBottom: '1rem', gap: '10px' }}>
                          <IoLocationSharp style={{ fontSize: '1.2rem' }} />
                          <p>Delivery from India</p>
                        </div>
                        <div >
                          Great King Leonidas Sparta 300 Movie Helmet Battle Damage Edition Best For Valentine s Gift For Him

                        </div>
                        <div style={{ marginTop: '2rem', display: 'flex', gap: '-1px', flexDirection: 'column' }}>
                          <span>Helmet Comes With Wooden Stand</span> <br />
                          <span>Material Steel/Iron</span><br />
                        </div>
                      </div> : <h1></h1>
                    }
                  </div>
                  <div>
                    <h2 className={style.toggleBtn} onClick={handleDiv2} style={{ fontWeight: '500' }}>Delivery and return policies <span style={{ marginLeft: '7rem' }}>{open2 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span></h2>
                    {
                      !open2 ? <div style={{ fontFamily: '"Graphik Webfont", "-apple-system", "Helvetica Neue", "Droid Sans", "Arial", "sans-serif"', }}>
                        <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1.2rem', color: '#222222', alignItems: 'center', gap: '10px' }}>
                          <MdDateRange />
                          <p>Order today to get in 3days</p>
                        </div>
                        <div style={{ display: 'flex', marginTop: '1rem', flexDirection: 'row', fontSize: '1.2rem', color: '#222222', alignItems: 'center', gap: '10px' }}>
                          <BsBox2 />
                          <p> <span style={{ fontSize: '.9rem', borderBottom: '1px dashed gay', cursor: 'pointer' }}> </span>Returns & exchanges accepted Within 30 days</p>
                        </div>
                        <div style={{ marginTop: '1rem', display: 'flex', }}>
                          <img src={hand} width={50} height={50} alt="Description" style={{ width: '40%' }} />
                          <p>Kindom Collection Purchase Protection Shop confidently on Kingdom Collection knowing if something goes wrong with an order we have got your back for all eligible purchases<span style={{ fontSize: '1rem', borderBottom: '1px solid black', cursor: 'pointer' }}>see programme terms</span></p>
                        </div>
                      </div> : <h1></h1>
                    }
                  </div>
                  <div>
                    <h2 className={style.toggleBtn} onClick={handleDiv3}>Meet your Brand <span style={{ paddingLeft: '10rem' }}>{open3 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span></h2>
                    {
                      !open3 ? <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div>
                          <img src={brand} width={90} height={80} alt="Description" />
                        </div>
                        <div style={{ fontFamily: '"Guardian-EgypTT", "Charter", "Charter Bitstream", "Cambria", "Noto Serif Light", "Droid Serif", "Georgia", "serif"' }}>
                          <p style={{ fontSize: '1.4rem', color: '#222222' }}>Kingdom Collection</p>
                          <p style={{ fontSize: '1rem' }}>We are here to help you with your queries and suggestions</p>
                          <p className={style.toggleBtn}> <span style={{ paddingRight: '1rem', fontSize: '.9rem', width: '3rem' }}><FaRegHeart /> </span> Follow me on instagram</p>
                          <button className={style.cartBtn} style={{ backgroundColor: '#fff', color: 'black', border: '2px solid black' }}>
                            Message Kingdom Collection
                          </button>
                        </div>

                      </div>
                        : <h1></h1>
                    }

                  </div>
                  <div style={{ display: 'flex', gap: '5px', marginTop: '2rem', marginLeft: '-1rem' }}>
                    {count == 5 ? <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '2rem', cursor: 'pointer' }} onClick={() => { setCount(1); setCountend(5) }}>
                      <p style={{ fontSize: '1rem' }} className={style.text}> Product Reviews </p>
                      <p style={{ fontSize: '1rem', marginLeft: '.5rem', borderRadius: '50%', background: '#EAEAEA', padding: '5px', width: '2rem' }}> {review?.length}</p>

                    </div> : <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '2rem', cursor: 'pointer', borderBottom: '2px solid black' }} onClick={() => { setCount(1); setCountend(5) }}>
                      <p style={{ fontSize: '1rem' }} className={style.text}> Product Reviews </p>
                      <p style={{ fontSize: '1rem', marginLeft: '.5rem', borderRadius: '50%', background: '#EAEAEA', padding: '5px', width: '2rem' }}> {review?.length}</p>

                    </div>}
                    {
                      count > 5 ? <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '2rem', cursor: 'pointer' }} onClick={() => { setCount(5); setCountend(10) }}>
                        <p style={{ fontSize: '1rem' }} className={style.text}> Overall Reviews  </p>
                        <p style={{ fontSize: '1rem', marginLeft: '.5rem', borderRadius: '60%', background: '#EAEAEA', padding: '5px', width: '2.7rem' }}> 4.5k</p>

                      </div> : <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '2rem', cursor: 'pointer', borderBottom: '2px solid black' }} onClick={() => { setCount(5); setCountend(10) }}>
                        <p style={{ fontSize: '1rem' }} className={style.text}> Overall Reviews  </p>
                        <p style={{ fontSize: '1rem', marginLeft: '.5rem', borderRadius: '60%', background: '#EAEAEA', padding: '5px', width: '2.7rem' }}> 4.5k</p>

                      </div>
                    }
                  </div>
                  {
                    review ? review.slice(0, 5).map((item, index) => (
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '1rem', borderBottom: '1px solid #EAEAEA', marginBottom: '1rem' }} key={index}>
                        <div style={{ display: 'flex', width: '65%', flexDirection: 'column', gap: '10px' }}>
                          <ReactStars
                            count={5}
                            size={24}
                            activeColor="black"
                            value={item.ratings}
                            color='#fff'
                          />
                          <div className={style.text}>
                            {item.review}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center' }}>
                            <div><img src={ricon} width={30} height={30} style={{ borderRadius: '50%' }} alt="Description" /></div>
                            <div style={{ borderBottom: '1px solid #222222', cursor: 'pointer', marginBottom: '.5rem', display: 'flex', marginLeft: '-1rem' }} className={style.text}>{item.name}</div>
                            <div className={style.text}> {item.createdAt.slice(0,10)}</div>
                          </div>
                          {/* <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                          <AiFillLike />
                          <p> Helpful</p>
                        </div> */}

                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img src={img1} alt="img" style={{ display: 'flex', width: '10rem', height: '10rem', alignItems: 'center', justifyContent: 'center' }} />
                        </div>
                      </div>
                    )) : <h1></h1>
                  }
                </div>
                <div className="flex overflow-x-auto  m-[1rem]">
                  <ResponsivePagination

                    current={currentPage}
                    total={50}
                    onPageChange={paginationHandel}
                    

                  />
                </div>
                <h1 style={{ fontWeight: '500', margin: '2rem', color: '#222222', fontFamily: '"Guardian-EgypTT", "Charter", "Charter Bitstream", "Cambria", "Noto Serif Light", "Droid Serif", "Georgia", "serif"', fontSize: '1.5rem' }}>Explore Related Categories</h1>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', margin: '1rem' }}>

                  {
                    categories.slice(0, 5)?.map((i) => (
                      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '10rem' }} key={i.id}>
                        <img src={i.image?.src} alt="img" style={{ width: '5rem', height: '5rem', borderRadius: '50%' }} />
                        <p style={{ fontWeight: '500' }}>{i.name}</p>
                      </div>
                    ))
                  }

                </div>
                <h1 style={{ fontWeight: '500', margin: '2rem', color: '#222222', fontFamily: '"Guardian-EgypTT", "Charter", "Charter Bitstream", "Cambria", "Noto Serif Light", "Droid Serif", "Georgia", "serif"', fontSize: '1.5rem' }}>Explore More Related Search</h1>
                <div style={{ display: 'flex', gap: '10px', flexDirection: 'row', flexWrap: 'wrap', marginLeft: '2rem', marginBottom: '2rem' }}>
                  <button style={{ display: 'flex', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9', fontWeight: '500' }} className={style.text}>
                    Gift for Boysfriends
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text}>
                    Gift for Dad
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text}>
                    Gift for Husband
                  </button>

                  <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text}>
                    Gift for Him
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text}>
                    Personalised Gift
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9', }} className={style.text}>
                    Gifts
                  </button>

                </div>
                <Mobilefooter />
              </div>
            </div>


          </>
          :
          <div>
            <div className={style.main}>
              <div className={style.carousel}>
                <ProductSlider imagesdata={productDetails?.imageUrl} />
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '2rem' }}>
                  <p style={{ fontSize: '1.6rem' }} className={style.text}> 317 reviews</p>
                  <div className={style.stars} style={{ paddingLeft: '1rem' }}>
                    <ReactStars
                      count={5}
                      size={30}
                      activeColor="#222222"
                      value={5}
                      color='#222222'
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '5px', marginBottom: '1rem' }}>
                  {count == 5 ? <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '2rem', cursor: 'pointer' }} onClick={() => setCount(5)}>
                    <p style={{ fontSize: '1rem' }} className={style.text}> Product Reviews </p>
                    <p style={{ fontSize: '1rem', marginLeft: '.5rem', borderRadius: '50%', background: '#EAEAEA', padding: '5px', width: '2rem' }}> {review?.length}</p>

                  </div> : <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '2rem', cursor: 'pointer', borderBottom: '2px solid black' }} onClick={() => setCount(5)}>
                    <p style={{ fontSize: '1rem' }} className={style.text}> Product Reviews </p>
                    <p style={{ fontSize: '1rem', marginLeft: '.5rem', borderRadius: '50%', background: '#EAEAEA', padding: '5px', width: '2rem' }}> {review?.length}</p>

                  </div>}
                  {
                    count > 5 ? <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '2rem', cursor: 'pointer' }} onClick={allreviews}>
                      <p style={{ fontSize: '1rem' }} className={style.text}> Overall Reviews  </p>
                      <p style={{ fontSize: '1rem', marginLeft: '.5rem', borderRadius: '60%', background: '#EAEAEA', padding: '5px', width: '2.7rem' }}> 4.5k</p>

                    </div> : <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '2rem', cursor: 'pointer', borderBottom: '2px solid black' }} onClick={allreviews}>
                      <p style={{ fontSize: '1rem' }} className={style.text}> Overall Reviews  </p>
                      <p style={{ fontSize: '1rem', marginLeft: '.5rem', borderRadius: '60%', background: '#EAEAEA', padding: '5px', width: '2.7rem' }}> 4.5k</p>

                    </div>
                  }
                </div>


                {
                  review ? review.slice(0, 5).map((item, index) => (
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '1rem', borderBottom: '1px solid #EAEAEA', marginBottom: '1rem' }} key={index}>
                      <div style={{ display: 'flex', width: '65%', flexDirection: 'column', gap: '10px' }}>
                        <ReactStars
                          count={5}
                          size={24}
                          activeColor="black"
                          value={item?.ratings}
                          color='#fff'
                        />
                        <div className={style.text}>
                          {item.review}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center' }}>
                          <div><img src={item.image} width={30} height={30} style={{ borderRadius: '50%' }} alt="Description" /></div>
                          <div style={{ borderBottom: '1px solid #222222', cursor: 'pointer', marginBottom: '.5rem', display: 'flex', marginLeft: '-1rem' }} className={style.text}>{item.name}</div>
                          <div className={style.text}> {item.createdAt.substring(0, 10)}</div>
                        </div>
                        {/* <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                          <AiFillLike />
                          <p> Helpful</p>
                        </div> */}

                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={item?.image} alt="img" style={{ display: 'flex', width: '10rem', height: '10rem', alignItems: 'center', justifyContent: 'center' }} />
                      </div>
                    </div>
                  )) : <h1></h1>
                }
              </div>
              <div className={style.info}>
                <div className={style.limited}>Limited Stock Order Now</div>
                <div className={style.price}>£{productDetails?.price}</div>
                <div className={style.choose}>
                  Choose from multiple variations
                </div>
                <div className={style.des}> <p>{productDetails?.title}</p></div>
                <div className={style.stars}>
                  <ReactStars
                    count={5}
                    size={20}
                    activeColor="#222222"
                    value={5}
                    color='#222222'
                  />
                </div>
                <div className={style.check}>
                  <IoCheckmark style={{ color: '#5379DE', fontSize: '20px' }} />
                  <p className={style.checkP}>Arrives soon Get it by  </p>
                </div>
                <div className={style.check} style={{ marginTop: '1px' }}>
                  <IoCheckmark style={{ color: '#5379DE', fontSize: '20px' }} />
                  <p className={style.checkP}>Returns & exchanges accepted</p>
                </div>
                <div>
                  <p style={{ display: 'flex', alignItems: 'center', margin: '1rem' }}>Style<sup style={{ color: '#A61A2E', fontSize: '10px' }}> <IoMdStar /></sup></p>
                </div>
                <div style={{width:'95%',marginLeft:'1rem'}} >
             
                <InputLabel id="demo-simple-select-label">{selectedValue?selectedValue:"choose an option"}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleChange}
                    style={{width:'100%' ,marginBottom:'1rem'}}
                    label="Age"
                    value={"kk"}
                  >
                    {productDetails?.sizes.map((item, index) => (

                      <MenuItem value={item} key={index}>
                        {item}
                      </MenuItem>

                    ))
                    }

                  </Select>
                  
                </div>





                <div style={{marginLeft:'1rem'}}>
                  <button className={style.cartBtn} onClick={() => carts(productDetails?._id)}>
                    Add to cart
                  </button>
                  <button className={style.cartBtn} style={{ marginTop: '1rem', marginBottom: '1rem' }} onClick={() => carts(productDetails?._id)}>
                    Buy Now
                  </button>
                </div>
                <div className={style.starReview} style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                  <img src={starimg} width={60} height={35} alt="Description" />
                  <p className={style.checkP}><span style={{ fontFamily: 'bold', fontSize: '1rem' }}>Star Product</span> This product consistently earned 5-star reviews dispatched on time and</p>
                </div>

                <div>
                  <h2 className={style.toggleBtn} onClick={handleDiv} style={{ fontWeight: '600' }}>Item details <span style={{ marginLeft: '18rem' }}>{open ? <IoIosArrowUp /> : <IoIosArrowDown />}</span></h2>
                  {
                    open ? <div style={{ fontFamily: '"Graphik Webfont", "-apple-system", "Helvetica Neue", "Droid Sans", "Arial", "sans-serif"', }}>
                      <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1rem', color: '#222222', alignItems: 'center', marginBottom: '1.2rem', gap: '10px' }}>
                        <FaHand />
                        <p>Handmade</p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1rem', color: '#222222', alignItems: 'center', gap: '10px', paddingBottom: '1rem' }}>
                        <PiGiftFill style={{ fontSize: '1.2rem' }} />
                        <div>
                          <p>Gift wrapping available <span style={{ fontSize: '1rem', borderBottom: '1px dashed black', cursor: 'pointer' }}>See details</span></p>
                          <div >
                            Great King Leonidas Sparta 300 Movie Helmet Battle Damage Edition Best For Valentine s Gift For Him
                          </div>

                        </div>

                      </div>
                    </div> : <h1></h1>
                  }
                </div>
                <div>
                  <h2 className={style.toggleBtn} onClick={handleDiv2} style={{ fontWeight: '600' }} >Delivery and return policies <span style={{ marginLeft: '10rem' }}>{open2 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span></h2>
                  {
                    open2 ? <div style={{ fontFamily: '"Graphik Webfont", "-apple-system", "Helvetica Neue", "Droid Sans", "Arial", "sans-serif"', }}>
                      <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1.2rem', color: '#222222', alignItems: 'center', gap: '10px', paddingBottom: '1rem' }}>
                        <MdDateRange />
                        <p>Order today Get in 3days <span style={{ fontSize: '1rem', borderBottom: '1px dashed gary', cursor: 'pointer' }}></span></p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1.2rem', color: '#222222', alignItems: 'center', gap: '10px', paddingBottom: '1rem' }}>
                        <BsBox2 />
                        <p> <span style={{ fontSize: '.9rem', borderBottom: '1px dashed gay', cursor: 'pointer', }}> </span>Returns & exchanges accepted within 30 days</p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row', fontSize: '.9rem', color: '#222222', alignItems: 'center', gap: '10', marginBottom: '2rem' }}>
                        <img src={hand} width={50} height={50} alt="Description" />
                        <p>Kindom Collection Purchase Protection: Shop confidently on Kingdom Collection knowing if something goes wrong with an order we ve got your back for all eligible purchases  <span style={{ fontSize: '1rem', borderBottom: '1px solid black', cursor: 'pointer' }}>see programme terms</span></p>
                      </div>
                    </div> : <h1></h1>
                  }
                </div>
                <div>
                  <h2 className={style.toggleBtn} onClick={handleDiv3} style={{ fontWeight: '600' }}>Meet your Brand <span style={{ paddingLeft: '15rem' }}>{open3 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span></h2>
                  {
                    open3 ? <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <div>
                        <img src={brand} width={90} height={80} alt="Description" />
                      </div>
                      <div style={{ fontFamily: '"Guardian-EgypTT", "Charter", "Charter Bitstream", "Cambria", "Noto Serif Light", "Droid Serif", "Georgia", "serif"' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                          <div>
                            <p style={{ fontSize: '1.4rem', color: '#222222', paddingBottom: '1rem' }}>Kingdom Collection</p>
                            <p style={{ fontSize: '1rem' }}>We are here to help you with your queries and suggestions</p>
                          </div>
                        </div>
                        <p className={style.toggleBtn}> <span style={{ paddingRight: '1rem', fontSize: '.9rem', width: '3rem' }}><FaRegHeart /> </span> Follow me on instagram</p>
                        <button className={style.cartBtn} style={{ backgroundColor: '#fff', color: 'black', border: '2px solid black' }}>
                          Message Kingdom Collection
                        </button>
                      </div>

                    </div>
                      : <h1></h1>
                  }
                </div>

              </div>
            </div>
            <div className="flex overflow-x-auto  m-[1rem]">
              <ResponsivePagination
                current={currentPage}
                total={10}
                onPageChange={paginationHandel}
              />
            </div>
            {/* 
      <Pagination  totalPages={10} currentPage={currentPage}  showIcons    onPageChange={paginationHandel} style={{
        borderRadius:'12px'
      }} />
    </div> */}
            <h1 style={{ fontWeight: '500', margin: '2rem', color: '#222222', fontFamily: '"Guardian-EgypTT", "Charter", "Charter Bitstream", "Cambria", "Noto Serif Light", "Droid Serif", "Georgia", "serif"', fontSize: '1.5rem' }}>Explore Related Categories</h1>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', margin: '1rem' }}>

              {
                categories.slice(0, 5)?.map((i) => (
                  <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '10rem' }} key={i.id}>
                    <img src={i.image?.src} alt="img" style={{ width: '5rem', height: '5rem', borderRadius: '50%' }} />
                    <p style={{ fontWeight: '500' }}>{i.name}</p>
                  </div>
                ))
              }

            </div>
            <h1 style={{ fontWeight: '500', margin: '2rem', color: '#222222', fontFamily: '"Guardian-EgypTT", "Charter", "Charter Bitstream", "Cambria", "Noto Serif Light", "Droid Serif", "Georgia", "serif"', fontSize: '1.5rem' }}>Explore More Related Search</h1>
            <div style={{ display: 'flex', gap: '10px', flexDirection: 'row', flexWrap: 'wrap', marginLeft: '2rem', marginBottom: '1rem' }}>
              <button style={{ display: 'flex', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9', fontWeight: '500' }} className={style.text}>
                Gift for Boysfriends
              </button>
              <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text}>
                Gift for Dad
              </button>
              <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text}>
                Gift for Husband
              </button>

              <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text}>
                Gift for Him
              </button>
              <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text}>
                Personalised Gift
              </button>
              <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text}>
                Gifts
              </button>
            </div>
            <Footer />
          </div>
      }
    </> : <Loader />
  );
}
