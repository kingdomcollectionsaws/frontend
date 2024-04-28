import { Button, Grid, InputLabel, MenuItem, Select, TextField, dialogActionsClasses } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import productSlice, { findProductById, getAllProducts } from '../customer/state/product/productSlice';
import Loader from '../customer/Loader.jsx';
import { API_BASE_URL } from '../config/apiConfig.js';
import OrderCard from '../customer/components/order/OrderCard.jsx';
import Orders from './Orders.jsx';
import { MdDashboard } from "react-icons/md";
import { FaBlogger, FaBoxes } from "react-icons/fa";
import { FaBloggerB } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import Orderpie from './Orderpie.jsx';
import Todayorder from './Todayorder.jsx';
import { useNavigate } from 'react-router-dom';
import Addnewproduct from './Addnewproduct.jsx';
import { Vibration } from '@mui/icons-material';
import Blog from './Blog.jsx';
import AddBlog from './AddBlog.jsx';
export default function Dashboard() {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [editmenu, setEditmenu] = useState(false);
    const [allorders, setAllorders] = useState([]);
    const [allusers, setAllusers] = useState([]);
    const [openSection, setOpenSection] = useState("DASHBOARD")
    
    const [showCategory, setShowCategory] = useState()
    const { products, loading, product } = useSelector(store => store.allproducts);
    const { user } = useSelector(store => store.user);
    const productCategory = ["gladiator-costume", "mf-doom-mask", "nazgul-costume", "roman-costume", "spartan-costume", "templar-costume"]

    const [productData, setProductData] = useState({
        title: '',
        price: '',
        productData: '',
        description: '',
        quantity: '',
        category: '',
        imageUrl: [],
        sizes: [],
        brand: '',
        discountedPrice:'',
        slug:'',
        height:'',
        width:'',
        materials:''
    });

    const [variations, setVariations] = useState('');
    const handleInputChange = (e) => {
        
        const { name, value } = e.target;
        //    if(name=="images"){
        //     productData.images =imageUrls
        //    }
        if (name == "price") {
            productData.price = value
        }
        // if (name == "variaton") {
        //     productData.sizes = []
        // }
        if (name == "description") {
            productData.description = value
        }
        if (name == "quantity") {
            productData.quantity = value
        }
        if (name == "title") {
            productData.title = value
        }
        if (name == "video") {
            productData.imageUrl.push(value)
        }
         
        if (name == "productvariaton") {
            productData.brand = value
        }
        if (name == "discountedPrice") {
            productData.discountedPrice = value
        }
        if (name == "slug") {
            productData.slug = value
        }
        if (name == "height") {
            productData.height = value
        }
        if (name == "width") {
            productData.width = value
        }
        if (name == "materials") {
            productData.materials = value
        }

    };
    const handleChange = (e) => {
        setShowCategory(e.target.value)
        productData.category = e.target.value;
      //  console.log(productData.category);
    }
    const getorder = () => {
        const token = localStorage.getItem('jwt');
        const requestOptions = {
            method: 'GET',
            headers: {
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
                
    
    // Set the filtered orders in allOrders
    setAllorders(orders);

            })
            .catch(error => {
                console.error('There was a problem with the fetch request:', error);
            });
    }
    const getusers = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const requestOptions = {
                method: 'GET',
              
            };
    
            const response = await fetch(`${API_BASE_URL}/api/admin/orders/allusers`, requestOptions);
    
            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }
    
            const users = await response.json();

           // console.log('orderssss:', users);
            const filteredUser = users.filter(user => user.role !== 'GUEST');
            setAllusers(filteredUser);
        } catch (error) {
            console.error('There was a problem with the fetch request:', error);
        }
    };
  
    
  
    useEffect(() => {
      
        getusers()
    }, []);

    const handelfileupload = async (event) => {
        const files = event.target.files;
        const formDataArray = [];


        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append('file', files[i]);
            formData.append('upload_preset', 'pnegpfre');
            formDataArray.push(formData);
        }


        const uploadResponses = await Promise.all(formDataArray.map(formData =>
            fetch(`https://api.cloudinary.com/v1_1/dujcstewk/image/upload`, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
        ));

        const imageUrls = uploadResponses.map(response => response.secure_url).filter(url => url);
        productData.imageUrl = imageUrls
    }
    const postProduct = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify(productData)
        }
        fetch(`${API_BASE_URL}/api/admin/products/`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(products => {
               // console.log('Products page:', products);
                setOpen(false)
            })
            .catch(error => {
                console.error('There was a problem with the fetch request:', error);
            });

    }
    const deleteProduct = async (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
        }
        fetch(`${API_BASE_URL}/api/admin/products/${id}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(products => {
                console.log('Products delete successfully');
                setOpen(false)
            })
            .catch(error => {
                console.error('There was a problem with the fetch request:', error);
            });

    }

     
   
    
    const [product_Id,setProduct_Id] = useState()
    const updateproductdetails = ()=>{
      
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify(productData)
        }
        fetch(`${API_BASE_URL}/api/admin/products/${product_Id}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(products => {
                console.log('Products delete successfully');
                setOpen(false)
            })
            .catch(error => {
                console.error('There was a problem with the fetch request:', error);
            });

    
    }
  
    const updateProduct = async (id,title,price,description,quantity,category,imageUrl,sizes,brand, discountedPrice,slug) => {
        setProduct_Id(id)
        setEditmenu(true)
        setOpen(true)
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Optional: smooth scrolling behavior
          });
        
            // Set sizes to the original value if variations is empty
         
            
                // Set sizes to an empty array if variations has a value
                
            setProductData({
                title: title,
                brand: brand,
                price: price,
                description: description,
                quantity: quantity,
                category: category,
                imageUrl: imageUrl,
                discountedPrice: discountedPrice,
                slug:slug,

            });
        
     
       
      
    }
    useEffect(() => {
        dispatch(getAllProducts())
        getorder();
        getusers()
    }, [open,]);
    const navigate = useNavigate()
    return (
        !loading && user?.role === "ADMIN" ?
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                <div style={{ width: '15%', position: 'sticky', height: 'auto', paddingTop: '1rem', bg: 'gray', paddingLeft: '1rem', borderTop: '2px solid gray',backgroundColor:'black',color:'#fff' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', position: 'fixed', marginLeft: '1rem', gap: '30px', height: '30rem', columnGap: '10px' }}>
                        <p style={{ display: 'flex', alignItems: 'center', width: '15rem', cursor: 'pointer', }} onClick={() => {setOpenSection("DASHBOARD");setEditmenu(false)}}><span style={{ color: '#fff', fontSize: '1.5rem', marginRight: '1rem' }} ><MdDashboard /></span>Analytics</p>
                        <p style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => {setOpenSection("PRODUCTS");setEditmenu(false)}}> <span style={{ color: '#fff', fontSize: '1.5rem', marginRight: '1rem' }}>  <FaBoxes /></span>Products</p>
                        <p style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => {setOpenSection("ADDNEWPRODUCT");setEditmenu(false)}}>Add new</p>
                        <p style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => {setOpenSection("ORDERS");setEditmenu(false)}}> <span
                            style={{ color: '#fff', fontSize: '1.5rem', marginRight: '1rem' }}><MdLocalShipping /></span>Orders</p>
                        <p style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => {setOpenSection("USERS");setEditmenu(false)}}> <span
                            style={{ color: '#fff', fontSize: '1.5rem', marginRight: '1rem' }}><FaUsers /></span> Users</p>
                         <p style={{width:'15rem',height:'1rem', cursor:'pointer',display:'flex',alignItems:'center',fontSize:'1.2rem',gap:'1rem'}} onClick={()=>setOpenSection("BLOG")}> <FaBlogger/>Blogs</p> 
                         <p style={{width:'15rem',height:'1rem', cursor:'pointer'}} onClick={()=>setOpenSection("ADDBLOG")}>Add new blog</p>
                    </div>
                </div>

                <div style={{ width: '85%', background: '#E8E8E8' }}>
                    {openSection == "DASHBOARD" ? <>
                        <div style={{ display: 'flex' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', width: '100%', gap: '50px', paddingTop: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '12rem', height: '8rem', background: '#66ff40', gap: '10px', color: '#fff', borderRadius: '12px', fontSize: '1.5rem', cursor: 'pointer' }}>
                                    <div>
                                        <p>{products.length}</p>
                                        <p>Products</p>
                                    </div>
                                    <div style={{ fontSize: '1.5rem' }}>
                                        <FaBoxes />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '12rem', height: '8rem', background: '#FACC2E', gap: '10px', color: '#fff', borderRadius: '12px', fontSize: '1.5rem', cursor: 'pointer' }}>
                                    <div>
                                        <p>{allorders.length}</p>
                                        <p>order</p>
                                    </div>
                                    <div style={{ fontSize: '1.5rem' }}>
                                        <MdLocalShipping />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '12rem', height: '8rem', background: ' #e6b800', gap: '10px', color: '#fff', borderRadius: '12px', fontSize: '1.5rem', cursor: 'pointer' }}>
                                    <div>
                                        <p>{allusers.length}</p>
                                        <p>Users</p>
                                    </div>
                                    <div style={{ fontSize: '1.5rem' }}>
                                        <FaUsers />
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '4rem', gap: '50px', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> <h1>All orders</h1>
                                <Orderpie /> </div>
                            <div style={{ display: 'flex',flexDirection: 'column',alignItems: 'center' }}> <h1>Today orders</h1><Todayorder /> </div>
                        </div>
                    </> : ''}
                    {openSection == "ORDERS" ? <Orders /> : ''}
                    {openSection == "BLOG" ? <Blog value={false}/> : ''}
                    {openSection == "ADDBLOG" ? <AddBlog/> : ''}
                    {openSection == "ADDNEWPRODUCT" ? <Addnewproduct/> : ''}
                    {openSection == "PRODUCTS" ? 
                   <div>
                  {  !editmenu?<div style={{display:'flex',flexDirection:'row',gap:'100px',paddingLeft:'4rem',borderBottom:'1px solid gray',}}>
                        <p>Images</p>
                        <div style={{width:'10rem'}}>Name</div>
                        <p >Stock</p>
                        <p>Price</p>
                        <p>Category</p>
                        <p style={{marginLeft:'8rem'}}>Date</p>
                    </div>:''}
               {!editmenu? <div>
                { products.map((i) => (
                            <>  
                            <div className='border mb-3 m-10'>
                                <div className='flex align-center mx-3 mt-10  space-x-5 m-10' key={i} >
                                    <img src={i.imageUrl[0]} alt='img' style={{ width: '5rem', height: '5rem' }} />
                                    <div className='flex align-center justify-center flex-row ' style={{gap:'110px'}} >
                                        <div style={{width:'11rem'}}>
                                        <p>{i.title} </p>
                                        <div style={{display:'flex',width:'14rem'}}>
                                        <Button sx={{ color: "RGB(145 85 253)" }} onClick={() => updateProduct(i._id, i.title, i.price, i.description, i.quantity, i.category, i.imageUrl, i.sizes, i.brand,i.discountedPrice,i.slug)} >EDIT <span style={{color:'black',paddingLeft:'1rem'}}> |</span></Button>
           
                                        <Button sx={{ color: "RGB(145 85 253)" }} onClick={() => deleteProduct(i._id)}>delete <span style={{color:'black',paddingLeft:'1rem'}}> |</span></Button>
                                        <Button sx={{ color: "RGB(145 85 253)" }} onClick={() => navigate(`/product/${i.slug}/${i._id}`)} >View</Button>
                                    </div>
                                        </div>
                                        <p style={{marginLeft:'2rem',}}><spna style={{color:'green'}}>in stock</spna> ({i.quantity})</p>
                                        <p >  {i.price}</p>
                                        
                                        <p> {i.category}</p>
                                        <p style={{width:'10rem'}}> {i.createdAt.slice(0,10)}</p>
                                        <div className="flex align-center justify-start m-y-1 space-x-2" >
                                        </div>
                                    </div>
                                    <div>
                                    </div>

                                </div>
                                <div className='flex align-center justify-center mx-3  space-x-5'>
                                   

                                </div> </div>
                            </>
                        ))}</div>: <div style={{padding:'1rem'}}>
                             <div>
                            <p style={{color:'red'}}>*If you don't want to change any field, keep that input empty</p>
                                <p>Product : {productData.title}</p>
                            <div>
                                    
                            <form >
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    name='title'
                                    label='Title'
                                    
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    name='slug'
                                    label='Slug'
                                    
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}  >
                                <p>select all images you to upload</p>
                                <input
                                    style={{backgroundColor:'black',color:'#fff'}}
                                    
                                    required
                                    name='images'
                                    label='Images'
                                    type='file'
                                    fullWidth
                                    imginput
                                    multiple
                                    onChange={handelfileupload}

                                />

                            </Grid>
                            <Grid item xs={12}  >
                                <TextField
                                    required
                                    name='description'
                                    label='Description'
                                    fullWidth
                                    onChange={handleInputChange}
                                    multiline
                                    rows={5}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6}  >

                                <TextField
                                    required
                                    name='price'
                                    label='Regular Price'
                                    fullWidth
                                    onChange={handleInputChange}
                                    style={{paddingBottom:'10px'}}
                                />
                              
                            </Grid>  
                            <Grid item xs={6} sm={6}  >
                               <TextField
                                    required
                                    name='discountedPrice'
                                    label='Sale Price'
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                          </Grid>  
                          <Grid  item xs={6} sm={6}>
                            <TextField
                                    required
                                    name='height'
                                    label='Height'
                                    fullWidth
                                    onChange={handleInputChange}
                                    style={{paddingBottom:'10px'}}
                                /></Grid>
                                <Grid  item xs={6} sm={6}>
                            <TextField
                                    required
                                    name='width'
                                    label='Width'
                                    fullWidth
                                    onChange={handleInputChange}
                                    style={{paddingBottom:'10px'}}
                                /></Grid>
                                <Grid  item xs={6} sm={6}>
                            <TextField
                                    required
                                    name='materials'
                                    label='Materials'
                                    fullWidth
                                    onChange={handleInputChange}
                                    style={{paddingBottom:'10px'}}
                                /></Grid>
                            <Grid item xs={12} sm={6} >
                                <TextField
                                    required
                                    name='quantity'
                                    label='Quantiy'
                                    type='number'
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <div>
                                    <InputLabel id="demo-simple-select-label">{productData.category ? showCategory : "choose a category"}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        onChange={handleChange}
                                        style={{ width: '100%', marginBottom: '1rem' }}
                                        label="Age"
                                        value={"category"}
                                    >
                                        {productCategory?.map((item, index) => (

                                            <MenuItem value={item} key={index}>
                                                {item}
                                            </MenuItem>

                                        ))
                                        }

                                    </Select>
                                </div>
                                
                            </Grid>
                           
                            <Grid item xs={12} sm={12} >
                              
                            <TextField
                                    required
                                    name='video'
                                    label='Video Link'
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '1rem' }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} >

<p>{productData?.sizes}</p>
<TextField
    required
    name='variaton'
    label='All variaton'
    value={variations}
    fullWidth
    onChange={(e) =>{ setVariations(e.target.value)}}
/>
</Grid>
                            <Grid item xs={12} sm={6} >
                                <Button
                                    className=' w-full px-0 py-3'
                                    variant='contained'
                                    sx={{ background: "#9155FD" }}
                                    onClick={() => {setProductData(prevData => ({
                                        ...prevData,
                                        sizes: Array.isArray(prevData.sizes) ? [...prevData.sizes, variations] : [variations],
                                      }));setVariations('') }}
                                >

                                    add new one variation
                                </Button>

                            </Grid>

                          
                            <Grid item xs={12} sm={6} >
                                <TextField
                                    required
                                    name='productvariaton'
                                    label='Product variaton'
                                    fullWidth
                                    onChange={handleInputChange}
                                />

                            </Grid>
                            {editmenu?<Grid item xs={12} sm={6} >
                                <Button
                                    className=' w-full px-0 py-3'
                                    variant='contained'
                                    sx={{ background: "#9155FD" }}
                                    onClick={updateproductdetails}
                                >
                                    Update
                                </Button>
                            </Grid>:<Grid item xs={12} sm={6} >
                                <Button
                                    className=' w-full px-0 py-3'
                                    variant='contained'
                                    sx={{ background: "#9155FD" }}
                                    onClick={postProduct}
                                >
                                    Post
                                </Button>
                            </Grid>}
                        </Grid>
                    </form>
                            
                        </div>
                        </div>
                            </div>}
                </div>:''}
                    {openSection == "USERS" ? <div>
                    <div  className='flex align-center justify-around border shadow-lg mt-8  flex-warp flex-col m-20 p-5' >
      {allusers.map((i)=><div >
     <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row',border:'1px solid black',margin:'4px'}}>
    <div style={{width:'60%'}}>
    <div className='flex flex-col m-5 '>
      <p className='font-bold mb-2'></p>
      <p>Firstname: {i?.firstName}</p>
      <p>Lastname: {i?.lastName}</p>
      <p>Email: {i?.email}</p>
      <p>Mobile: {i?.mobile}</p>
      <p>Join date:{i?.createdAt.slice(0,10)}</p>
    </div>
   
    </div>
    
   
     </div></div>
    )} 
  
    <div>
      
    </div>
    </div>
                    </div>: ''}
                    {openSection == "OVERVIEW" ? <div>
                        <div>Overview</div>
                    </div> : ''}
                </div>
            </div> : <Loader />
    )
}
