import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from './customer/state/product/productSlice';
import { Carousel2 } from './customer/components/homecarousel/Carousel';
import style from '../src/customer/components/custom/styles.module.css'
import { useNavigate, useParams } from 'react-router-dom';
export default function SearchProducts() {
  const navigate = useNavigate()
    const { search } = useParams();
    const [allproduct, setAllproduct] = useState([])
    const { products, loading } = useSelector(store => store.allproducts);
    const [isMobile, setIsMobile] = useState(false);
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getAllProducts());
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
    //dispatch(getAllProducts())
    let filteredProducts=[];
    useEffect(() => {
     
        setAllproduct(products);
       console.log("kking",search);
       filteredProducts = products.filter(product => product.title.toLowerCase().includes(search.toLowerCase())
     );
     console.log(filteredProducts);
     
      
    }, [products,search]);
    // const searchTerm = req.query.q; // Get search term from query parameter
    // if (!searchTerm) {
    //     return res.status(400).json({ error: 'Search term is required' });
    // }

    // // Filter products based on search term
    // const filteredProducts = products.filter(product =>
    //     product.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: '10px',marginTop:'4rem'}} >
              {
               filteredProducts = products.filter(product => product.title.toLowerCase().includes(search.toLowerCase())).map((i,index) => (
<div className={style.gitfProduct} style={{ padding: '0', border: '.1px solid gray', borderRadius: '.5rem', border: 'none' ,}} onClick={() => navigate(`/product/${i.slug}/${i._id}`)} >
<img src={i.imageUrl[0]}  alt='img' className='lg:w-[15rem] lg:h-[15rem]'  style={{borderRadius: '.5rem'}}/>
<h1 className={style.text} style={{ fontWeight: '700', width: '90%', fontSize: '1rem', display: 'flex', alignSelf: "flex-start",cursor:'pointer' }} onClick={() => navigate(`/product/${i._id}`)}>{i.title.substring(0, 15)}...</h1>
<h1 className={style.text} style={{ fontWeight: '800', width: '90%', fontSize: '1rem', display: 'flex', alignItems:'center',color:'#16A34A' }}> ${i.discountedPrice}<span><p className=' tracking-tight text-gray-600  line-through px-2 ' style={{fontSize:'15px',fontWeight:'300',paddingTop:'1px'}}>${i.price}</p></span> </h1>
</div>
                ))
              }
              <div>{  filteredProducts.length>0?'':'No product found!'}</div>
    </div>
  
  )
}
