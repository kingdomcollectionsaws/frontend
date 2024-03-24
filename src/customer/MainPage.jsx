
import React, { useEffect, useState } from 'react'
import style from '../customer/components/custom/styles.module.css'
import img from "../../public/img1.png"
import c1 from "../../public/decoration.jpeg"
import c2 from "../../public/fashion-mag.jpeg"
import c3 from "../../public/furniture.png"
import c4 from "../../public/life.jpg"
import c5 from "../../public/interor.jpg"
import c6 from "../../public/life.jpg"
import c7 from "../../public/music.jpg"
import c8 from "../../public/photgraph.jpg"
import c9 from "../../public/style.jpg"
import c10 from "../../public/uncatego.png"
import g1 from "../../public/g1.png"
import g2 from "../../public/g2.png"
import g3 from "../../public/g3.png"
import g4 from "../../public/g5.jpg"
import b1 from "../../public/b1.jpg"
import b2 from "../../public/b4.jpg"
import b3 from "../../public/b3.jpg"
import { GoArrowRight } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import Loader from './Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from './state/product/productSlice'
import axios from 'axios'
import { API_BASE_URL } from '../config/apiConfig'
import Footer, { Mobilefooter } from './Footer'
import Carousel, { Carousel2 } from './components/homecarousel/Carousel'
export default function MainPage() {
  const blogs = [
    {
      title:'9 Comfy Throws for Cosy Autumn Vibes',
      tag:'Shopping Guides',
      img:b1,
      des :"Embrace the snuggling season with stylish throws that will warm your hearts."
    },
    {
      title:'14 Beautiful Bags That Express Your Unique Style',
      tag:'Shopping Guides',
      img:b2,
      des:"Amp up your fashion game with bags that perfectly match your aesthetic."
    },
    {
      title:'The Best Gift Ideas for Kids of All Ages',
      tag:'Gifts Guides',
      img:b3,
      des:"Shop the sweetest surprises for all little ones in your family–these gifts for kids will definitely earn you some brownie points."
    },
  ]
  const [category,setCategory] = useState([])
  const [allproduct,setAllproduct] = useState([])
  const [loading,setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false);
  
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
  }, []);
  const [imgArray, setImgArray] = useState([
    { url: c1 },
    { url: c2 },
    { url: c3 },
    { url: c4 },
    { url: c5 },
    { url: c6 },
    { url: c7 },
    { url: c8 },
    { url: c9 },
    { url: c10 }
])
  const categorys = [{title:"Anniversary",url:g1},{title:"Gifts for Him",url:g2},{title:"Gifts for Her",url:g3},{title:"Wedding gift",url:g4}]
  const giftsImgs = [g1,g2,g3,g4]

  function mergeArrays(category, imgArray) {
    const mergedArray = [];

    // Iterate through the arrays and merge objects
    for (let i = 0; i < category.length; i++) {
        // Create a new object with product name and corresponding img
       
        const mergedObject = {
            productName: category[i].name,
            productlink: category[i].link,
            imgUrl: imgArray[i].url
        };
        // Add merged object to the new array
        mergedArray.push(mergedObject);
    }

    return mergedArray;
  }
const dispatch = useDispatch();
const {user} = useSelector(store => store.user);
const allproducts= useSelector(store => store.allproducts);
  useEffect(() => {
    //dispatch(getAllProducts());
    //setAllproduct(allproducts)
  //console.log("all",allproducts);
  getdata ()
  
  const apiKey =  'ck_503e81308c5e908b9050b367e98d837395f578c4'; // Use environment variable or default value
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
         console.log('Products page:' ,products);
         setCategory(products)
      })
      .catch(error => {
        console.error('There was a problem with the fetch request:', error);
      });
  }, [])
const getdata = async()=>{
  try {
    const res = await axios.get(`${API_BASE_URL}/api/products/`)
    const data = res.data.content
    setAllproduct(data)
    console.log("res",res.data.content[0].image);
    setLoading(false)
  } catch (error) {
    console.log("nn",error);
    setLoading(true)
  }

}
const navigate = useNavigate()
  return (
    !loading ?
   <div style={{overflowX:'hidden',boxSizing:'border-box',paddingLeft:'0',paddingRight:'0'}} className={style.mainPage}>
   <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
    <h1 className={style.text} style={{fontSize:'24px',color:'#222222',marginBottom:'-1rem'}} >Shop by Category</h1>
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row',flexWrap:'wrap',gap:'15px'}} className={style.cate}>
    
    
      {
        category.slice(0,6).map((i)=>(
         <Link href={i.productlink} key={i.id}>
           <div className={style.categoryProduct}  >
          <img src={i.image?.src}  style={{borderRadius:'50%',width:"8rem",height:'8rem'}} alt='img'/>
      <p style={{fontWeight:'600'}}>{i.name}</p>
          </div>
         </Link>
        ))
      }
    </div>
   </div>
   <div style={{display:'flex',justifyContent:'center',flexDirection:'column',marginTop:'.5rem'}}>
  <div style={{display:'flex',justifyContent:'center',justifyContent:'center'}}> <h1 className={style.text} style={{fontSize:'24px',color:'#222222',marginBottom:'1rem'}}>Tranding Items</h1>

  </div>
  <div style={{display:'flex',flexDirection:'row',alignItems:'center' }} className={style.cateHeading}>
  <div  className={style.categoryHead}>All</div>
  
  <div className={style.categoryHead}>SALE</div>
  <div className={style.categoryHead}>FRESH</div>
  <div className={style.categoryHead}>GAUNTLETS</div>
 
  </div>
{
  isMobile? <Carousel2 data={allproduct.slice(4,8)}/>:<div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row',flexWrap:'wrap',gap:'15px'}}>
      {
         allproduct.slice(4,8).map((i)=>(

          <div className={style.gitfProduct} style={{padding:'0',border:'.1px solid gray', borderRadius:'0',border:'none'}} onClick={()=>navigate(`/product/${i._id}`)} >
          <img src={i.imageUrl[0]} width={250} height={190}  alt='img'/>
        
          <h1 className={style.text} style={{fontWeight:'700',width:'90%',fontSize:'1rem',display:'flex',alignSelf: "flex-start" ,}}>{i.title.substring(0, 20)}...</h1>
          <h1 className={style.text} style={{fontWeight:'500',width:'90%',fontSize:'1rem',display:'flex',alignSelf: "flex-start"}}>£ {i.price}</h1>
         
         
          </div>
        ))
      }
    </div>
  }

  
   </div>
   <div style={{display:'flex',justifyContent:'center',flexDirection:'column',marginLeft:'1rem',marginTop:'2rem'}}>
   <div style={{display:'flex',justifyContent:'center',justifyContent:'center'}}> <h1 className={style.text} style={{fontSize:'24px',color:'#222222',marginBottom:'1rem'}}> Our Bestsellers </h1>

  </div>
   {isMobile  ? <div >
          <Carousel data={allproduct.slice(1,5)} />
        </div>:
   <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row',flexWrap:'wrap',gap:'20px'}}>
      {
      allproduct.slice(1,5).map((i)=>(
         
          <div className={style.gitfProduct} style={{padding:'0',border:'.1px solid gray', borderRadius:'0',border:'none'}} onClick={()=>navigate(`/product/${i._id}`)} >
          <img src={i.imageUrl[0]}   alt='img' style={{width:'15rem',height:'15rem'}}/>
        
          <h1 className={style.text} style={{fontWeight:'700',width:'90%',fontSize:'1rem',display:'flex',alignSelf: "flex-start" ,}}>{i.title.substring(0, 20)}...</h1>
          <h1 className={style.text} style={{fontWeight:'500',width:'90%',fontSize:'1rem',display:'flex',alignSelf: "flex-start"}}>£ {i.price}</h1>
         
         
          </div>
     
        ))}
      
    </div> 
}

  
   </div>
   <div style={{display:'flex',justifyContent:'center',flexDirection:'column',marginTop:'2rem'}}>
    <h1 className={style.text} style={{fontSize:'24px',color:'#222222',marginBottom:'1rem',display:'flex',alignItems:'center',justifyContent:'center'}}> Fresh from the blog <GoArrowRight /></h1>
    <div style={{display:'flex',justifyContent:'center',flexDirection:'row',flexWrap:'wrap',gap:'15px'}}>
      {
        blogs.map((i,index)=>(
          <div key={index} className={style.homeProduct} style={{padding:'0',border:'.1px solid gray',alignItems:'flex-start',gap:'10px',}} >
          <img src={i.img} height={250} style={{borderRadius:'12px',width:'100%'}} alt='img'/>
        
          <div className={style.Blogtext}>{i.tag}</div>
          <div className={style.text} style={{fontWeight:'600',paddingLeft:'2rem'}}>{i.title}</div>
          <div className={style.Blogtext} style={{width:'20rem'}} >{i.des}</div>
         
      
          </div>
        ))
      }
    </div>

    <div className={style.sub}>
    <p  className={style.text} style={{fontSize:'1rem'}}>Get unique gift ideas and so much more delivered right to your inbox.</p>
    <div className={style.emailinput}>
                    <input placeholder='Enter your Email' className={style.input} style={{width:'55%',border:'none'}} />
                    <div className={style.subBtn} >Subscribe</div>
                </div>
    </div>
  
   </div>
   {
    isMobile ? <Mobilefooter/> :<Footer/>
   }
  
   </div> :<Loader/>
  )
}

