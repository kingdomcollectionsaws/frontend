import { Button, Grid, InputLabel, MenuItem, Select, TextField, dialogActionsClasses } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import productSlice, { findProductById, getAllProducts } from '../customer/state/product/productSlice';
import Loader from '../customer/Loader.jsx';
import { API_BASE_URL } from '../config/apiConfig.js';
import OrderCard from '../customer/components/order/OrderCard.jsx';
import Orders from './Orders.jsx';
import { loginUser } from '../customer/state/Auth/registerSlice.js';
export default function Dashboard() {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [openSection,setOpenSection] = useState("PRODUCTS")
    const [variations, setVaritions] = useState();
    const [showCategory,setShowCategory] = useState()
    const {products,loading,product} = useSelector(store=>store.allproducts);
  const productCategory = ["gladiator-costume","mf-doom-mask","nazgul-costume","roman-costume","spartan-costume","templar-costume"]

    const [productData, setProductData] = useState({
        title: '',
        price: '',
        productData:'',
        description: '',
        quantity: '',
        category: '',
        imageUrl: [],
        sizes: []
    });

    const updateProduct = async(id)=>{
       dispatch(findProductById(id));
       await product
       if(product){
         console.log(product);
       }
      
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
    //    if(name=="images"){
    //     productData.images =imageUrls
    //    }
       if(name =="price"){
        productData.price =value
        productData.productData =price
       }
       if(name == "description"){
        productData.description = value
       }
       if(name =="quantity"){
        productData.quantity =value
       }
       if(name =="title"){
        productData.title = value
       }
       if(name == "video"){
        productData.imageUrl.push(value)
       }
      

    };
    const handleChange = (e)=>{
        setShowCategory( e.target.value)
        productData.category = e.target.value;
        console.log(productData.category);
    }
   
    useEffect(()=>{
        dispatch(getAllProducts())
    },[]);

    const handelfileupload = async (event) => {
        const files =  event.target.files;
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
        productData.imageUrl=imageUrls
    }
    const postProduct = ()=>{
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
        console.log('Products page:', products);
      })
      .catch(error => {
        console.error('There was a problem with the fetch request:', error);
      });

    }
    const deleteProduct = async(id)=>{
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
      })
      .catch(error => {
        console.error('There was a problem with the fetch request:', error);
      });

    }
    return (
       !loading?<div style={{display:'flex',justifyContent:'space-between',}}>
          
    <div style={{width:'20%',position:'sticky', paddingTop:'5rem',marginTop:'1rem',borderRadius:'1rem',}} >
    
 <div style={{display:'flex',flexDirection:'column', position:'fixed',marginLeft:'1rem',gap:'30px',}}>
 <h1 style={{fontSize:'1.5rem'}}>MY Dashboard</h1>
    <button style={{width:'15rem',height:'3rem',borderRadius:'1rem',background:'#F1641E'}} onClick={()=>setOpenSection("PRODUCTS")}>Products</button>
    <button style={{width:'15rem',height:'3rem',borderRadius:'1rem',background:'#F1641E'}} onClick={()=>setOpenSection("ORDERS")}>Orders</button>
    <button style={{width:'15rem',height:'3rem',borderRadius:'1rem',background:'#F1641E'}} onClick={()=>setOpenSection("USERS")}>Users</button>
    <button style={{width:'15rem',height:'3rem',borderRadius:'1rem',background:'#F1641E'}} onClick={()=>setOpenSection("OVERVIEW")}>Overview</button>

 </div>
    </div>
    <div style={{width:'80%'}}>
   { openSection == "ORDERS"?<Orders/>:''}
 { openSection == "PRODUCTS"? <div>
       <Button sx={{ color: "RGB(145 85 253)" }} onClick={() => setOpen(true)}>Add new product</Button>
            {
                open ? <div>
                    <form >
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    name='title'
                                    label='Title'
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>

                                <TextField
                                    required
                                    name='price'
                                    label='Price'
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    name='description'
                                    label='Description'
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                            </Grid>
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
                  <InputLabel id="demo-simple-select-label">{productData.category? showCategory:"choose an option"}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleChange}
                    style={{width:'100%' ,marginBottom:'1rem'}}
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
                               <Grid item xs={12} sm={12}  >
                              <p>select all images you to upload</p>
                                <input
                                
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

                            <Grid item xs={12} sm={6} >
                            
                                        <p>{productData.sizes}</p>
                                <TextField
                                    required
                                    name='variaton'
                                    label='Variaton'
                                    value={variations}
                                    fullWidth
                                    onChange={(e)=>setVaritions(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <Button
                                    className=' w-full px-0 py-3'
                                    variant='contained'
                                    sx={{ background: "#9155FD" }}
                                    onClick={()=>{productData.sizes.push(variations);setVaritions('')}}
                                >

                                   add new one variation
                                </Button>
                             
                            </Grid>
                          
                            <Grid item xs={12} sm={6} >
                            <TextField
                                    required
                                    name='video'
                                    label='Video Link'
                                    onChange={handleInputChange}
                                    style={{marginBottom:'1rem'}}
                                />
                                <Button
                                    className=' w-full px-0 py-3'
                                    variant='contained'
                                    sx={{ background: "#9155FD" }}
                                    onClick={postProduct}
                                >
                                    Post
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <Button
                                onClick={()=>setOpen(false)}
                                    className=' w-full px-0 py-3'
                                    variant='contained'
                                    sx={{ background: "tomato" }}
                                >
                                    cancle
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div> : ''
            }

            {products.map((i) => (
                <>   <div className='border mb-3 m-10'>
                    <div className='flex align-center mx-3 mt-10  space-x-5 m-10' key={i} >
                        <img src={ i.imageUrl[0]} alt='img' style={{width:'5rem',height:'5rem'}}/>
                        <div className='flex align-center justify-center flex-col' >
                            <p> Name: {i.title}</p>
                            <p> Price: {i.price}</p>
                            <p> quantity: {i.quantity}</p>
                            <p> category: {i.category}</p>
                            <div className="flex align-center justify-start m-y-1 space-x-2" >
                            </div>
                        </div>
                        <div>
                        </div>

                    </div>
                    <div className='flex align-center justify-center mx-3  space-x-5'>
                        <div>
                            <Button sx={{ color: "RGB(145 85 253)" }}  onClick={()=>updateProduct(i._id)} >EDIT</Button>

                            <Button sx={{ color: "RGB(145 85 253)" }} onClick={()=>deleteProduct(i._id)}>delete</Button>
                        </div>

                    </div> </div>
                </>
            ))}
</div>:''}
 { openSection == "USERS"?<div>
    <div>Users</div>
 </div>:''}
 { openSection == "OVERVIEW"?<div>
    <div>Overview</div>
 </div>:''}
    </div>
        </div>:<Loader/>
    )
}
