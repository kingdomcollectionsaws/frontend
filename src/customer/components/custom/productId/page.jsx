
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
import { FaRegHeart, FaXing } from "react-icons/fa";
import hand from '../../../../../public/hand.jpg'
import brand from '../../../../../public/brand.png'
import { useState, useEffect, Fragment, useRef, } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon, PhoneXMarkIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { IoIosArrowUp } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { FaHand } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { GiCrumblingBall } from "react-icons/gi";
import { TbRulerMeasure } from "react-icons/tb";
import { PiGiftFill } from "react-icons/pi";
import { MdDateRange, MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
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
import { API_BASE_URL } from "../../../../config/apiConfig";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ReviewsSlider from "../ReviewsSlider";
//require("bootstrap/less/bootstrap.less");
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUser, getUserDetail } from "../../../state/Auth/registerSlice";
import c1 from "../../../../../public/c1.png"
import c2 from "/public/c2.png"
import c3 from "/public/c3.png"
import c4 from "/public/c4.png"
import c5 from "/public/c5.png"
import c6 from "/public/c6.png"
export default function ProductDetailPage({ params }) {
  const [count, setCount] = useState(0)
  const [countend, setCountend] = useState(5)
  const [open1, setOpen1] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [allproductreviews, setAllproductreviews] = useState()
  const [open2, setOpen2] = useState(true)
  const [open3, setOpen3] = useState(true)
  const [isMobile, setIsMobile] = useState(false);
  const [data, setData] = useState()
  const [review, setReview] = useState()
  const [categories, setCategories] = useState( [{
    slug:"gladiator-costume",
    name:"Gladiator Costume",
    image:c1
  },
  {
    slug:"mf-doom-mask",
    name:"Mf doom mask",
    image:c2
  },
  {
    slug:"nazgul-costume",
    name:"Nazgul costume",
    image:c3
  },
  {
    slug:"roman-costume",
    name:"Roman costume",
    image:c4
  },
  {
    slug:"spartan-costume",
    name:"Spartan costume",
    image:c5
  },
  {
    slug:"templar-costume",
    name:"Templar costume",
    image:c6
  }
])
  const [productDetails, setProductDetails] = useState();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.user);
  const { product, loading, products } = useSelector(store => store.allproducts);
  const { cart } = useSelector(store => store.cart);
  const { id } = useParams();
  const [open, setOpen] = useState(false)

  const cancelButtonRef = useRef(null)
  // Make the fetch request
  let newPage = 0;
  let newCountStart = 0;
  let newCountEnd = 5;
  const paginationHandel = (page) => {
    //console.log(page);

    newPage = page;
    newCountStart = newPage * 5;
    newCountEnd = newCountStart + 5;

    setCount(newCountStart);
    setCountend(newCountEnd);
    setCurrentPage(newPage);

    //console.log(newCountStart, newCountEnd, newPage);
  }
  const allreviews = () => {
    setCount(6)
  }
  const notify = (msg) => toast(msg, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
  });
  const carts = async(id) => {
    const token = localStorage.getItem('jwt');
    if (selectedValue) {
      const data = { productId: id }
      if (token) {
       
        dispatch(addItemInCart(data));
        notify("Item added to cart")
      }
      else {
        

        if (!user) {
          const uniqueIdentifier = Math.floor(Math.random() * 100000);
          const uniqueIdentifierdate = Date.now();
          const guestemail = `guest${uniqueIdentifier}${uniqueIdentifierdate}@gmail.com`;
          const guestpassword = Math.random().toString(36).slice(-8);
          const role = 'GUEST'
          const userData = {
            firstName: `guest${uniqueIdentifier}`,
            lastName: `guest${uniqueIdentifierdate}`,
            email: guestemail,
            password: guestpassword,
            role: 'GUEST',
          }
          await dispatch(createUser(userData));
          await dispatch(addItemInCart(data));
          notify("Item added to cart");   
        } else {
          dispatch(addItemInCart(data));
          navigate('/cart')
        }
      }
    }
    else {

      notify("please select a Variation")

    }
  }
  const buynow = async(id) => {
    const token = localStorage.getItem('jwt');
    if (selectedValue) {
      const data = { productId: id }
      if (token) {

        
        dispatch(addItemInCart(data));
        notify("Item added to cart");
        navigate('/cart')
      }
      else {
       
        if (!user) {
          const uniqueIdentifier = Math.floor(Math.random() * 100000);
          const uniqueIdentifierdate = Date.now();
          const guestemail = `guest${uniqueIdentifier}${uniqueIdentifierdate}@gmail.com`;
          const guestpassword = Math.random().toString(36).slice(-8);
          const role = 'GUEST'
          const userData = {
            firstName: `guest${uniqueIdentifier}`,
            lastName: `guest${uniqueIdentifierdate}`,
            email: guestemail,
            password: guestpassword,
            role: 'GUEST',
          }
          await dispatch(createUser(userData));
          await dispatch(addItemInCart(data));
          notify("Item added to cart");
          navigate('/cart')
        } else {
          navigate('/cart')
        }
      }
    } else {

      notify("please select a Variation")

    }
  }

  useEffect(() => {
   // setCategories(CategoryList)
getUserDetail()
    Getreviews(id)
    dispatch(findProductById(id));
    setProductDetails(null);
    //console.log(products);
    fetch(`${API_BASE_URL}/api/reviews/allreviews`, {
      method: 'GET'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(Review => {
        setAllproductreviews(Review);
      })
      .catch(error => {
        console.error('There was a problem with the fetch request:', error);
      });
    setOpen(false)
  }, [dispatch, id])

  useEffect(() => {
    // Update product details when 'product' from Redux store changes
    if (product) {
      setProductDetails(product);
    }
  }, [product,user])
  useEffect(() => {

    dates()
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
    setOpen1(!open1)
  }
  const handleDiv2 = () => {
    setOpen2(!open2)
  }
  const handleDiv3 = () => {
    setOpen3(!open3)
  }

  const [selectedValue, setSelectedValue] = useState('');
  const [showall, setShowall] = useState(false);
  const [orderDate, setOrderDate] = useState();
  const dates = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const today = new Date();
    const startDate = today.getDate();
    const futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + 3);
    const formattedDateRange = `${futureDate.getDate()}-${months[futureDate.getMonth()]}`;
    setOrderDate(formattedDateRange)

  }
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    localStorage.setItem('value', event.target.value);
    // Update the selected value state
    fetch(`${API_BASE_URL}/api/products/?category=${product.category}&brand=${event.target.value}`, {
      method: 'GET'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(selectedProducts => {
      //  console.log("hello", selectedProducts);

        for (let i = selectedProducts.length - 1; i >= 0; i--) {
          if (selectedProducts[i].brand == event.target.value) {
            let lastMatchingProduct = selectedProducts[i];
            setProductDetails(lastMatchingProduct);    
            break; // Exit loop once the last matching product is found
          }
        }

      })
      .catch(error => {
        console.error('There was a problem with the fetch request:', error);
      });
  };
  const Getreviews = (id) => {
    const requestOptions = {
      method: 'GET',
    };
    fetch(`${API_BASE_URL}/api/reviews/product/${id}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(reviews => {
     //   console.log('reviews:', reviews);
        setReview(reviews)
      })
      .catch(error => {
        console.error('There was a problem with the fetch request:', error);
      });
  }
  const [showindex, setShowindex] = useState(0)
  const handlePrev = () => {
    if (showindex > 0) {
      setShowindex(showindex => showindex - 1);
     // console.log(showindex);
    } else {
      setShowindex(review.length);
    }
  }
  const handleNext = () => {
    if (showindex < review.length - 1) {
      setShowindex(showindex => showindex + 1);
    //  console.log(showindex);
    }else{
      setShowindex(0);
    }
  }
  const handleallNext = () => {
    if (showindex < allproductreviews.length - 1) {
      setShowindex(showindex => showindex + 1);
     // console.log(showindex);
    }
  }
  useEffect(() => {
  

  }, [showindex, open]);




  return (
    !loading ? <>
      
      {
        isMobile ?
          <>
            <ToastContainer />
            <div className={style.main} style={{ boxSizing: 'border-box', padding: '0', margin: '0', height: '100vh' }}>
              <div className={style.carousel} style={{ width: '100%', height: '20rem' }}>
                <ProductSlider imagesdata={productDetails?.imageUrl} />
                <div className={style.info} style={{ width: '100%', marginLeft: '2px' }}>
                  <div className={style.limited}> Limited Stock! Order Now.</div>
                  <div className={style.price}>£{productDetails?.price}</div>
                  <div className={style.choose} >
                    Choose from multiple variations
                  </div>
                  <div className={style.des}>{productDetails?.title}</div>
                  <div className={style.check}>
                    <IoCheckmark style={{ color: '#5379DE', fontSize: '20px' }} />
                     <p className={style.checkP}>Order today  to get by <span style={{ borderBottom: '1px dashed black' }}>{orderDate}</span></p>
                    {/* <span style={{ borderBottom: '1px dashed black' }}>06-07 Mar</span> if you order today */}
                  </div>
                  <div className={style.check} style={{ marginTop: '.1rem' }}>
                    <IoCheckmark style={{ color: '#5379DE', fontSize: '20px' }} />
                    <p className={style.checkP}> Returns & exchanges accepted </p>
                  </div>
                  <div>
                    <p style={{ display: 'flex', alignItems: 'center', paddingLeft: '1rem' }}>Style<sup style={{ color: '#A61A2E', fontSize: '10px', }}> <IoMdStar /></sup></p>
                  </div>
                  <div style={{ marginLeft: '1rem', width: '95%' }}>

                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={handleChange}
                      style={{ width: '95%', marginBottom: '1rem' }}

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
                    <button className={style.cartBtn} onClick={() => carts(productDetails?._id, productDetails?.title, productDetails?.price, productDetails?.imageUrl[0], productDetails?.discountedPrice)} style={{ marginLeft: '1rem', width: '90%' }}>
                      Add to cart
                    </button>
                    <button className={style.cartBtn} style={{ marginTop: '1rem', marginBottom: '1rem', marginLeft: '1rem', width: '90%' }} onClick={() => buynow(productDetails?._id, productDetails?.title, productDetails?.price, productDetails?.imageUrl[0], productDetails?.discountedPrice)}>
                      Buy Now
                    </button>
                  </div>
                  <div className={style.starReview} style={{ marginTop: '1rem' }} >
                    <img src={starimg} width={60} height={35} alt="Description" />
                    <p className={style.checkP}><span style={{ fontFamily: 'bold', fontSize: '1rem' }}>Star Product</span> This product consistently earned 5-star reviews, dispatched on time and</p>
                  </div>

                  <div>
                    <h2 className={style.toggleBtn} onClick={handleDiv}>Item details <span style={{ marginLeft: '13rem' }}>{open1 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span></h2>
                    {
                      !open1 ? <div style={{ fontFamily: '"Graphik Webfont", "-apple-system", "Helvetica Neue", "Droid Sans", "Arial", "sans-serif"', }}>
                        <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1rem', color: '#222222', alignItems: 'center', marginBottom: '1rem', gap: '10px', padding: '1rem' }}>
                          <FaHand />
                          <p>Handmade</p>
                        </div>
                        <div style={{ display: 'flex', fontSize: '1rem', color: '#222222', flexDirection: 'row', alignItems: 'center', marginBottom: '1rem', gap: '10px', padding: '1rem' }}>
                          <IoLocationSharp style={{ fontSize: '1.2rem' }} />
                          <p>Delivery from UK</p>
                        </div>
                        <div style={{ padding: '1rem' }}>
                          Great King Leonidas Sparta 300 Movie Helmet Battle Damage Edition Best For Valentine s Gift For Him

                        </div>
                        <div style={{ marginTop: '2rem', display: 'flex', gap: '-1px', flexDirection: 'column', padding: '1rem' }}>
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
                        <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1.2rem', color: '#222222', alignItems: 'center', gap: '10px', padding: '1rem' }}>
                          <MdDateRange />
                          <p>Order today  to get by <span style={{ borderBottom: '1px dashed black' }}>{orderDate}</span></p>
                        </div>
                        <div style={{ display: 'flex', marginTop: '1rem', flexDirection: 'row', fontSize: '1.2rem', color: '#222222', alignItems: 'center', gap: '10px', padding: '1rem' }}>
                          <BsBox2 />
                          <p> <span style={{ fontSize: '.9rem', borderBottom: '1px dashed gay', cursor: 'pointer' }}> </span>Returns & exchanges accepted Within 30 days</p>
                        </div>
                        <div style={{ marginTop: '1rem', display: 'flex', }}>
                          <img src={hand} width={50} height={50} alt="Description" style={{ width: '40%' }} />
                          <p>Kindom Collection Purchase Protection Shop confidently on Kingdom Collection knowing if something goes wrong with an order we have got your back for all eligible purchases</p>
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
                  <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginLeft: '1rem' }}>
                    <p style={{ fontSize: '1.6rem' }} className={style.text}> {allproductreviews?.length} reviews</p>
                    <div className={style.stars} style={{ paddingLeft: '1rem' }}>
                      <ReactStars
                        count={5}
                        size={30}
                        activeColor="#222222"
                        value={5}
                        color="#222222"
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '5px', marginTop: '2rem', marginLeft: '-1rem' }}>


                    {!showall ? <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '2rem', cursor: 'pointer', borderBottom: '2px solid black' }} onClick={() => { setShowall(false), setShowindex(0) }}>
                      <p style={{ fontSize: '1rem' }} className={style.text}> Product Reviews </p>
                      <p style={{ fontSize: '1rem', borderRadius: '50%', background: '#EAEAEA', width: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '2rem', marginLeft: '.5rem' }}>  {review?.length}</p>

                    </div> : <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '2rem', cursor: 'pointer' }} onClick={() => { setShowall(false); setShowindex(0) }}>
                      <p style={{ fontSize: '1rem' }} className={style.text}> Product Reviews </p>
                      <p style={{ fontSize: '1rem', borderRadius: '50%', background: '#EAEAEA', width: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '2rem', marginLeft: '.5rem' }}>  {review?.length}</p>

                    </div>}
                    {
                      showall ? <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '2rem', cursor: 'pointer', borderBottom: '2px solid black' }} onClick={() => setShowall(true)}>
                        <p style={{ fontSize: '1rem' }} className={style.text}> Overall Reviews </p>
                        <p style={{ fontSize: '1rem', borderRadius: '50%', background: '#EAEAEA', width: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '2rem', marginLeft: '.5rem' }}> {allproductreviews?.length}</p>

                      </div> : <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '2rem', cursor: 'pointer' }} onClick={() => setShowall(true)}>
                        <p style={{ fontSize: '1rem' }} className={style.text}> Overall Reviews  </p>
                        <p style={{ fontSize: '1rem', borderRadius: '50%', background: '#EAEAEA', width: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '2rem', marginLeft: '.5rem' }}>  {allproductreviews?.length}</p>

                      </div>
                    }
                  </div>
                  {
                    !showall ? review?.slice(count, countend).map((item, index) => (
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '1rem', borderBottom: '1px solid #EAEAEA', marginBottom: '1rem' }} key={index} onClick={() => { setOpen(true); setShowindex(index) }}>
                        <div style={{ display: 'flex', width: '65%', flexDirection: 'column', gap: '10px' }}>
                          <ReactStars
                            count={5}
                            size={24}
                            activeColor="black"
                            value={item.ratings}
                            color='#fff'
                          />
                          <div className={style.text}>
                            {item?.review}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center' }}>
                            <div><img src={ricon} width={30} height={30} style={{ borderRadius: '50%' }} alt="Description" /></div>
                            <div style={{ borderBottom: '1px solid #222222', cursor: 'pointer', marginBottom: '.5rem', display: 'flex', marginLeft: '-1rem' }} className={style.text}>{item.name}</div>
                            <div className={style.text}> {item.createdAt.slice(0, 10)}</div>
                          </div>
                          <Transition.Root show={open} as={Fragment}>
                            <Dialog as="div" className="fixed inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                              <div className="flex items-center justify-center min-h-screen px-4 text-center">
                                <Transition.Child
                                  as={Fragment}

                                >
                                  <Dialog.Overlay className="fixed inset-0  bg-black  bg-opacity-20 transition-opacity" />
                                </Transition.Child>

                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                  &#8203;
                                </span>

                                <Transition.Child
                                  as={Fragment}

                                >
                                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden  transform transition-all sm:my-8 sm:align-middle my-20">
                                    <div style={{ width: '100vw', backgroundColor: '#fff', height: '45rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', borderRadius: '12px', padding: '1rem' }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                                        <div style={{ marginLeft: '-1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                          <img src={review[showindex]?.image} alt={"img"} style={{ width: '80%', height: '20rem', borderRadius: '12px' }} />
                                        </div>
                                        <div style={{ height: '25rem', paddingTop: '1rem' }}>
                                          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                                            {/* <div>
                                      <img src={ricon} alt={"img"} style={{ width: '3rem', height: '2rem' }} />
                                    </div> */}
                                            <div >{review[showindex]?.review}</div>
                                          </div>
                                          <div>  <ReactStars
                                            count={5}
                                            size={24}
                                            activeColor="black"

                                            value={5}
                                            color='#fff'
                                          /></div>

                                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <p style={{ fontWeight: 'bold', }}>{review[showindex]?.name}</p>
                                            <p>{review[showindex]?.createdAt.slice(0, 10)}</p>

                                          </div>

                                          <p style={{ paddingTop: '5rem' }}>Purchased item</p>

                                          {products?.map((pro) => {
                                            if (pro._id == review[showindex]?.product) {
                                              return (
                                                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center', width: '20rem', cursor: 'pointer', }} onClick={() => { setOpen(false); navigate(`/product/${item.product}`) }}>
                                                  <div>
                                                    <img src={pro.imageUrl[0]} alt={"img"} style={{ width: '6rem', height: '3rem' }} />
                                                  </div>
                                                  <div style={{ display: 'flex', flexDirection: 'column', width: 'full' }} >
                                                    <p >{pro.title}</p>

                                                  </div>
                                                </div>
                                              );
                                            }
                                            return null;
                                          })}
                                        </div>

                                      </div>


                                    </div>
                                  </div>
                                </Transition.Child>
                              </div>
                            </Dialog>
                          </Transition.Root>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img src={item.image} alt="img" style={{ display: 'flex', width: '10rem', height: '10rem', alignItems: 'center', justifyContent: 'center' }} />
                        </div>
                      </div>
                    )) : allproductreviews?.slice(count, countend).map((item, index) => (
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '1rem', borderBottom: '1px solid #EAEAEA', marginBottom: '1rem' }} key={index} onClick={() => { setOpen(true); setShowindex(index) }}>
                        <div style={{ display: 'flex', width: '65%', flexDirection: 'column', gap: '10px' }}>
                          <ReactStars
                            count={item.ratings}
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
                            <div className={style.text}> {item.createdAt.slice(0, 10)}</div>
                          </div>
                          <Transition.Root show={open} as={Fragment}>
                            <Dialog as="div" className="fixed inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                              <div className="flex items-center justify-center min-h-screen px-4 text-center">
                                <Transition.Child
                                  as={Fragment}

                                >
                                  <Dialog.Overlay className="fixed inset-0 bg-black  bg-opacity-20 transition-opacity-50" />
                                </Transition.Child>

                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                  &#8203;
                                </span>

                                <Transition.Child
                                  as={Fragment}

                                >
                                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden  transform transition-all sm:my-8 sm:align-middle my-20">
                                    <div style={{ width: '100vw', backgroundColor: '#fff', height: '43rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', borderRadius: '12px', padding: '1rem' }}>
                                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center', marginLeft: '-1rem' }} >
                                          <img src={allproductreviews[showindex]?.image} alt={"img"} style={{ width: '80%', height: '20rem', borderRadius: '12px' }} />
                                        </div>
                                        <div style={{ height: '20rem', paddingTop: '1rem', width: '100%' }}>
                                          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                                            {/* <div>
                                      <img src={ricon} alt={"img"} style={{ width: '3rem', height: '2rem' }} />
                                    </div> */}
                                            <div >{allproductreviews[showindex]?.review}</div>
                                          </div>
                                          <div>  <ReactStars
                                            count={5}
                                            size={24}
                                            activeColor="black"

                                            value={5}
                                            color='#fff'
                                          /></div>

                                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <p style={{ fontWeight: 'bold', }}>{allproductreviews[showindex]?.name}</p>
                                            <p>{allproductreviews[showindex]?.createdAt.slice(0, 10)}</p>

                                          </div>

                                          <p style={{ paddingTop: '5rem' }}>Purchased item</p>
                                          {products.map((pro) => {
                                            if (pro._id == allproductreviews[showindex].product) {
                                              return (
                                                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center', width: '20rem', cursor: 'pointer' }} onClick={() => { setOpen(false); navigate(`/product/${allproductreviews[showindex].product}`) }}>
                                                  <div>
                                                    <img src={pro.imageUrl[0]} alt={"img"} style={{ width: '6rem', height: '3rem' }} />
                                                  </div>
                                                  <div style={{ display: 'flex', flexDirection: 'column', width: 'full' }} >
                                                    <p >{pro.title}</p>

                                                  </div>
                                                </div>
                                              );
                                            }
                                            return null;
                                          })}
                                        </div>

                                      </div>


                                    </div>
                                  </div>
                                </Transition.Child>
                              </div>
                            </Dialog>
                          </Transition.Root>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img src={item.image} alt="img" style={{ display: 'flex', width: '10rem', height: '10rem', alignItems: 'center', justifyContent: 'center' }} />
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className="flex overflow-x-auto  m-[1rem]">
                  <ResponsivePagination

                    current={currentPage}
                    total={Math.ceil(allproductreviews?.length/5)}
                    onPageChange={() => paginationHandel(currentPage)}


                  />
                </div>
                <h1 style={{ fontWeight: '500', margin: '2rem', color: '#222222', fontFamily: '"Guardian-EgypTT", "Charter", "Charter Bitstream", "Cambria", "Noto Serif Light", "Droid Serif", "Georgia", "serif"', fontSize: '1.5rem' }}>Explore Related Categories</h1>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', margin: '1rem' }}>

                  {
                    categories.slice(0, 5)?.map((i) => (
                      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '10rem' }} key={i.id}>
                        <img src={i.image} alt="img" style={{ width: '5rem', height: '5rem', borderRadius: '50%' }} />
                        <p style={{ fontWeight: '500' }}>{i.name}</p>
                      </div>
                    ))
                  }

                </div>
                <h1 style={{ fontWeight: '500', margin: '2rem', color: '#222222', fontFamily: '"Guardian-EgypTT", "Charter", "Charter Bitstream", "Cambria", "Noto Serif Light", "Droid Serif", "Georgia", "serif"', fontSize: '1.5rem' }}>Explore More Related Search</h1>
                <div style={{ display: 'flex', gap: '10px', flexDirection: 'row', flexWrap: 'wrap', marginLeft: '2rem', marginBottom: '2rem' }}>
                  <button style={{ display: 'flex', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9', fontWeight: '500' }} className={style.text} onClick={() => navigate('/searchproducts/a')}>
                    Gift for Boysfriends
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text} onClick={() => navigate('/searchproducts/a')} >
                    Gift for Dad
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text}>
                    Gift for Husband
                  </button>

                  <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text} onClick={() => navigate('/searchproducts/a')} >
                    Gift for Him
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text} onClick={() => navigate('/searchproducts/a')} >
                    Personalised Gift
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9', }} className={style.text} onClick={() => navigate('/searchproducts/a')} >
                    Gifts
                  </button>

                </div>
                <Mobilefooter />
              </div>
            </div>


          </>
          :
          <div>
            <div className='mt-20  sm:mt-0'>
            </div>
            <ToastContainer />
            <div className={style.main}>
              <div className={style.carousel}>
                <ProductSlider imagesdata={productDetails?.imageUrl} />
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '2rem' }}>
                  <p style={{ fontSize: '1.6rem' }} className={style.text}> {allproductreviews?.length} reviews</p>
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
                  {!showall ? <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '2rem', cursor: 'pointer', borderBottom: '2px solid black' }} onClick={() => { setShowall(false); setShowindex(0) }}>
                    <p style={{ fontSize: '1rem' }} className={style.text}> Product Reviews </p>
                    <p style={{ fontSize: '1rem', borderRadius: '50%', background: '#EAEAEA', width: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '2rem', marginLeft: '.5rem' }}>  {review?.length}</p>

                  </div> : <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '2rem', cursor: 'pointer' }} onClick={() => { setShowall(false); setShowindex(0) }}>
                    <p style={{ fontSize: '1rem' }} className={style.text}> Product Reviews </p>
                    <p style={{ fontSize: '1rem', borderRadius: '50%', background: '#EAEAEA', width: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '2rem', marginLeft: '.5rem' }}> {review?.length}</p>

                  </div>}
                  {
                    showall ? <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '2rem', cursor: 'pointer', borderBottom: '2px solid black' }} onClick={() => setShowall(true)}>
                      <p style={{ fontSize: '1rem' }} className={style.text}> Overall Reviews </p>
                      <p style={{ fontSize: '1rem', borderRadius: '50%', background: '#EAEAEA', width: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '2rem', marginLeft: '.5rem' }}> {allproductreviews?.length}</p>

                    </div> : <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '2rem', cursor: 'pointer' }} onClick={() => setShowall(true)}>
                      <p style={{ fontSize: '1rem' }} className={style.text}> Overall Reviews  </p>
                      <p style={{ fontSize: '1rem', borderRadius: '50%', background: '#EAEAEA', width: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '2rem', marginLeft: '.5rem' }}> {allproductreviews?.length}</p>

                    </div>
                  }
                </div>
                {
                  !showall ? review?.slice(count, countend).map((item, index) => (
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '1rem', borderBottom: '1px solid #EAEAEA', marginBottom: '1rem', cursor: 'pointer' }} key={index} onClick={() => setOpen(true)} >
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
                          <div className={style.text}> {item.createdAt.slice(0, 10)}</div>
                        </div>
                        {/* <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                          <AiFillLike />
                          <p> Helpful</p>
                        </div> */}

                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={item.image} alt="img" style={{ display: 'flex', width: '10rem', height: '10rem', alignItems: 'center', justifyContent: 'center' }} />
                      </div>
                      {
                        
                        review?.slice(count, countend).map((item) => (<Transition.Root show={open} as={Fragment}>

                          <Dialog as="div" className="fixed inset-0  overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                            <div className="flex items-center justify-center min-h-screen px-4 text-center">
                              <Transition.Child
                                as={Fragment}

                              >
                                <Dialog.Overlay className="fixed inset-0  transition-opacity" style={{backgroundColor:'gray',opacity:'0.5'}}  />
                              </Transition.Child>

                              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                &#8203;
                              </span>

                              <Transition.Child
                                as={Fragment}

                              >

                                <div className="inline-block align-bottom bg-[#F9F6EE] shadow-sm rounded-lg text-left overflow-hidden  transform transition-all sm:my-8 sm:align-middle">
                                  <div style={{ width: '50rem', backgroundColor: '#fff', height: '25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', borderRadius: '12px', }}>
                                    <div>
                                      <div className="prev" onClick={handlePrev}><MdOutlineArrowBackIos /></div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <div >
                                        <img src={review[showindex]?.image} alt={"img"} style={{ width: '40rem', height: '25rem', borderRadius: '12px' }} />
                                      </div>
                                      <div style={{ height: '25rem', paddingLeft: '1rem', paddingTop: '1rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                                          {/* <div>
                                      <img src={ricon} alt={"img"} style={{ width: '3rem', height: '2rem' }} />
                                    </div> */}
                                          <div >{review[showindex]?.review}</div>
                                        </div>
                                        <div>  <ReactStars
                                          count={5}
                                          size={24}
                                          activeColor="black"
                                          edit={false}
                                          value={5}
                                          color='#fff'
                                        /></div>

                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                          <p style={{ fontWeight: 'bold', }}>{review[showindex]?.name}</p>
                                          <p>{review[showindex]?.createdAt.slice(0, 10)}</p>

                                        </div>

                                        <p style={{ paddingTop: '10rem' }}>Purchased item</p>
                                        {products.map(pro => {
                                          if (pro._id === item.product) {
                                            return (
                                              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center', width: '20rem', cursor:'pointer' }} onClick={() => { setOpen(false);  }}>
                                                <div>
                                                  <img src={pro.imageUrl[0]} alt={"img"} style={{ width: '6rem', height: '3rem' }} />
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', width: 'full' }} >
                                                  <p >{pro.title}</p>

                                                </div>
                                              </div>
                                            );
                                          }
                                          return null;
                                        })}
                                        <div>

                                          <div className="next" onClick={handleNext}><MdOutlineArrowForwardIos /></div>
                                        </div>
                                      </div>

                                    </div>


                                  </div>
                                </div>
                              </Transition.Child>
                            </div>
                          </Dialog>
                        </Transition.Root>))}
                    </div>
                  )) : allproductreviews?.slice(count, countend).map((item, index) => (
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '1rem', borderBottom: '1px solid #EAEAEA', marginBottom: '1rem' }} key={index} onClick={() => { setOpen(true) }}>
                      <div style={{ display: 'flex', width: '65%', flexDirection: 'column', gap: '10px' }} >
                      <div>  <ReactStars
                                          count={5}
                                          size={24}
                                          activeColor="black"
                                          edit={false}
                                          value={5}
                                          color='#fff'
                                        /></div>
                        <div className={style.text}>
                          {item.review}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center' }}>
                          <div><img src={ricon} width={30} height={30} style={{ borderRadius: '50%' }} alt="Description" /></div>
                          <div style={{ borderBottom: '1px solid #222222', cursor: 'pointer', marginBottom: '.5rem', display: 'flex', marginLeft: '-1rem' }} className={style.text}>{item.name}</div>
                          <div className={style.text}> {item.createdAt.slice(0, 10)}</div>
                        </div>


                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={item.image} alt="img" style={{ display: 'flex', width: '10rem', height: '10rem', alignItems: 'center', justifyContent: 'center' }} />
                      </div>
                      {
                        allproductreviews?.slice(count, countend).map((item) => (
                          <Transition.Root show={open} as={Fragment} className = "bg-green">

                            <Dialog as="div" className="fixed inset-0   overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen} >
                              <div className="flex items-center justify-center min-h-screen px-4 text-center">
                                <Transition.Child
                                  as={Fragment}


                                >
                                  <Dialog.Overlay className="fixed inset-0  transition-opacity" style={{backgroundColor:'gray',opacity:'0.1'}} />
                                </Transition.Child>

                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                  &#8203;
                                </span>

                                <Transition.Child
                                  as={Fragment}

                                >

                                  <div className="inline-block align-bottom rounded-lg text-left overflow-hidden  transform transition-all sm:my-8 sm:align-middle">
                                    <div style={{ width: '50rem', backgroundColor: '#fff',opacity:'1', height: '25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', borderRadius: '12px', }}>
                                      <div>
                                        <div className="prev" onClick={handlePrev}><MdOutlineArrowBackIos /></div>
                                      </div>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div >
                                          <img src={allproductreviews[showindex]?.image} alt={"img"} style={{ width: '40rem', height: '25rem', borderRadius: '12px' }} />
                                        </div>
                                        <div style={{ height: '25rem', paddingLeft: '1rem', paddingTop: '1rem' }}>
                                          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                                            {/* <div>
                                      <img src={ricon} alt={"img"} style={{ width: '3rem', height: '2rem' }} />
                                    </div> */}
                                            <div >{allproductreviews[showindex].review}</div>
                                          </div>
                                          <div>  <ReactStars
                                            count={5}
                                            size={24}
                                            activeColor="black"
                                            edit={false}
                                            value={5}
                                            color='#fff'
                                          /></div>

                                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <p style={{ fontWeight: 'bold', }}>{allproductreviews[showindex].name}</p>
                                            <p>{allproductreviews[showindex].createdAt.slice(0, 10)}</p>

                                          </div>

                                          <p style={{ paddingTop: '10rem' }}>Purchased item</p>
                                          {products.map((pro) => {
                                            if (pro._id == allproductreviews[showindex].product) {
                                              return (
                                                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center', width: '20rem', cursor: 'pointer' }} onClick={() => { setOpen(false); navigate(`/product/${allproductreviews[showindex].product}`) }}>
                                                  <div>
                                                    <img src={pro.imageUrl[0]} alt={"img"} style={{ width: '6rem', height: '3rem' }} />
                                                  </div>
                                                  <div style={{ display: 'flex', flexDirection: 'column', width: 'full' }} >
                                                    <p >{pro.title}</p>

                                                  </div>
                                                </div>
                                              );
                                            }
                                            return null;
                                          })}
                                          <div>

                                            <div className="next" onClick={handleallNext}><MdOutlineArrowForwardIos /></div>
                                          </div>
                                        </div>

                                      </div>


                                    </div>
                                  </div>
                                </Transition.Child>
                              </div>
                            </Dialog>
                          </Transition.Root>))}
                    </div>
                  ))

                }
              </div>
              <div className={style.info}>
                <div className={style.limited}>Limited Stock Order Now</div>
                <div className={style.price}>£{productDetails?.price}</div>
                <div className={style.choose}>
                  Choose from multiple variations
                </div>
                <div className={style.des}> <p>{productDetails?.title}</p></div>
               
                <div className={style.check}>
                  <IoCheckmark style={{ color: '#5379DE', fontSize: '20px' }} />
                  <p className={style.checkP} >Order today  to get by <span style={{ borderBottom: '1px dashed black' }}>{orderDate}</span></p>
                </div>
                <div className={style.check} style={{ marginTop: '1px' }}>
                  <IoCheckmark style={{ color: '#5379DE', fontSize: '20px' }} />
                  <p className={style.checkP}>Returns & exchanges accepted</p>
                </div>
                <div>
                  <p style={{ display: 'flex', alignItems: 'center', margin: '1rem' }}>Style<sup style={{ color: '#A61A2E', fontSize: '10px' }}> <IoMdStar /></sup></p>
                </div>
                <div style={{ width: '95%', marginLeft: '1rem' }} >
                  <Select
                    labelId="select-label"
                    id="simple-select"
                    onChange={handleChange}
                    style={{ width: '100%', marginBottom: '1rem' }}
                  >
                    {productDetails?.sizes.map((item, index) => (

                      <MenuItem value={item} key={index} >
                        {item}
                      </MenuItem>

                    ))
                    }

                  </Select>

                </div>





                <div style={{ marginLeft: '1rem' }}>
                  <button className={style.cartBtn} onClick={() => carts(productDetails?._id, productDetails?.title, productDetails?.price, productDetails?.imageUrl[0], productDetails?.discountedPrice)}>
                    Add to cart
                  </button>
                  <button className={style.cartBtn} style={{ marginTop: '1rem', marginBottom: '1rem' }} onClick={() => buynow(productDetails?._id, productDetails?.title, productDetails?.price, productDetails?.imageUrl[0], productDetails?.discountedPrice)}>
                    Buy Now
                  </button>
                </div>
                <div className={style.starReview} style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                  <img src={starimg} width={60} height={35} alt="Description" />
                  <p className={style.checkP}><span style={{ fontFamily: 'bold', fontSize: '1rem' }}>Star Product</span> This product consistently earned 5-star reviews dispatched on time and</p>
                </div>

                <div>
                  <h2 className={style.toggleBtn} onClick={handleDiv} style={{ fontWeight: '600' }}>Item details <span style={{ marginLeft: '18rem' }}>{open1 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span></h2>
                  {
                    open1 ? <div style={{ fontFamily: '"Graphik Webfont", "-apple-system", "Helvetica Neue", "Droid Sans", "Arial", "sans-serif"', }}>
                      <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1rem', color: '#222222', alignItems: 'center', marginBottom: '1.2rem', gap: '10px' }}>
                        <FaHand />
                        <p>Handmade</p>
                      </div>
                      <div style={{ display: 'flex', fontSize: '1rem', color: '#222222', flexDirection: 'row', alignItems: 'center', marginBottom: '1rem', gap: '10px' }}>
                        <IoLocationSharp style={{ fontSize: '1.2rem' }} />
                        <p>Delivery from UK</p>
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
                        <p>Order today to get by <span style={{ borderBottom: '1px dashed black' }}>{orderDate}</span></p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1.2rem', color: '#222222', alignItems: 'center', gap: '10px', paddingBottom: '1rem' }}>
                        <BsBox2 />
                        <p> <span style={{ fontSize: '.9rem', borderBottom: '1px dashed gay', cursor: 'pointer', }}> </span>Returns & exchanges accepted within 30 days</p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row', fontSize: '.9rem', color: '#222222', alignItems: 'center', gap: '10', marginBottom: '2rem' }}>
                        <img src={hand} width={50} height={50} alt="Description" />
                        <p>Kindom Collection Purchase Protection: Shop confidently on Kingdom Collection knowing if something goes wrong with an order we ve got your back for all eligible purchases  </p>
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
                total={Math.ceil(allproductreviews?.length/5)}
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
                    <img src={i.image} alt="img" style={{ width: '5rem', height: '5rem', borderRadius: '50%' }} />
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
              <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text} onClick={() => navigate('/searchproducts/a')} >
                Gift for Dad
              </button>
              <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text} onClick={() => navigate('/searchproducts/a')} >
                Gift for Husband
              </button>

              <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text} onClick={() => navigate('/searchproducts/a')} >
                Gift for Him
              </button>
              <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text} onClick={() => navigate('/searchproducts/a')} >
                Personalised Gift
              </button>
              <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text} onClick={() => navigate('/searchproducts/a')} >
                Gifts
              </button>
            </div>
            <Footer />

          </div>
      }
    </> : <Loader />
  );
}
