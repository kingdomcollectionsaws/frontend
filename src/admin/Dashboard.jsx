import { Button, Grid, InputLabel, MenuItem, Select, TextField, dialogActionsClasses } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import productSlice, { findProductById, getAllProducts } from '../customer/state/product/productSlice';
import Loader from '../customer/Loader.jsx';
import { API_BASE_URL } from '../config/apiConfig.js';
import OrderCard from '../customer/components/order/OrderCard.jsx';
import Orders from './Orders.jsx';
import { MdDashboard } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import Orderpie from './Orderpie.jsx';
import Todayorder from './Todayorder.jsx';
export default function Dashboard() {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [allorders, setAllorders] = useState([]);
    const [openSection, setOpenSection] = useState("DASHBOARD")
    const [variations, setVaritions] = useState();
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
        brand: ''
    });

    const updateProduct = async (id) => {
        dispatch(findProductById(id));
        await product
        if (product) {
            console.log(product);
        }

    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        //    if(name=="images"){
        //     productData.images =imageUrls
        //    }
        if (name == "price") {
            productData.price = value
            productData.productData = price
        }
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
            productData.brand(value)
        }


    };
    const handleChange = (e) => {
        setShowCategory(e.target.value)
        productData.category = e.target.value;
        console.log(productData.category);
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
                console.log('order:', orders);
                setAllorders(orders)

            })
            .catch(error => {
                console.error('There was a problem with the fetch request:', error);
            });
    }
    useEffect(() => {
        dispatch(getAllProducts())
        getorder()
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
                console.log('Products page:', products);
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
            })
            .catch(error => {
                console.error('There was a problem with the fetch request:', error);
            });

    }
    return (
        !loading && user?.role === "ADMIN" ?
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                <div style={{ width: '20%', position: 'sticky', height: '30rem', paddingTop: '1rem', bg: 'gray', paddingLeft: '1rem', borderTop: '2px solid gray' }} >

                    <div style={{ display: 'flex', flexDirection: 'column', position: 'fixed', marginLeft: '1rem', gap: '30px', height: '30rem', columnGap: '10px' }}>
                        <p style={{ display: 'flex', alignItems: 'center', width: '15rem', cursor: 'pointer', }} onClick={() => setOpenSection("DASHBOARD")}><span style={{ color: '#0099ff', fontSize: '1.5rem', marginRight: '1rem' }} ><MdDashboard /></span>Dashboard</p>
                        <p style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setOpenSection("PRODUCTS")}> <span style={{ color: '#2EFE2E', fontSize: '1.5rem', marginRight: '1rem' }}>  <FaBoxes /></span>Products</p>
                        <p style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setOpenSection("ORDERS")}> <span
                            style={{ color: '#FACC2E', fontSize: '1.5rem', marginRight: '1rem' }}><MdLocalShipping /></span>Orders</p>
                        <p style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setOpenSection("USERS")}> <span
                            style={{ color: '#FFFF00', fontSize: '1.5rem', marginRight: '1rem' }}><FaUsers /></span> Users</p>
                        {/* <p style={{width:'15rem',height:'3rem',}} onClick={()=>setOpenSection("OVERVIEW")}>Overview</p> */}

                    </div>
                </div>

                <div style={{ width: '80%', background: '#E8E8E8' }}>
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
                                        <p>12</p>
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
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> <h1>Today orders</h1><Todayorder /> </div>
                        </div>
                    </> : ''}
                    {openSection == "ORDERS" ? <Orders /> : ''}
                    {openSection == "PRODUCTS" ? <div>
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
                                                <InputLabel id="demo-simple-select-label">{productData.category ? showCategory : "choose an option"}</InputLabel>
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
                                                label='All variaton'
                                                value={variations}
                                                fullWidth
                                                onChange={(e) => setVaritions(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} >
                                            <Button
                                                className=' w-full px-0 py-3'
                                                variant='contained'
                                                sx={{ background: "#9155FD" }}
                                                onClick={() => { productData.sizes.push(variations); setVaritions('') }}
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
                                                style={{ marginBottom: '1rem' }}
                                            />

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
                                        <Grid item xs={12} sm={6} >
                                            <Button
                                                className=' w-full px-0 py-3'
                                                variant='contained'
                                                sx={{ background: "#9155FD" }}
                                                onClick={postProduct}
                                            >
                                                Post
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </div> : ''
                        }

                        {products.map((i) => (
                            <>   <div className='border mb-3 m-10'>
                                <div className='flex align-center mx-3 mt-10  space-x-5 m-10' key={i} >
                                    <img src={i.imageUrl[0]} alt='img' style={{ width: '5rem', height: '5rem' }} />
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
                                        <Button sx={{ color: "RGB(145 85 253)" }} onClick={() => updateProduct(i._id)} >EDIT</Button>

                                        <Button sx={{ color: "RGB(145 85 253)" }} onClick={() => deleteProduct(i._id)}>delete</Button>
                                    </div>

                                </div> </div>
                            </>
                        ))}
                    </div> : ''}
                    {openSection == "USERS" ? <div>
                        <div>Users</div>
                    </div> : ''}
                    {openSection == "OVERVIEW" ? <div>
                        <div>Overview</div>
                    </div> : ''}
                </div>
            </div> : <Loader />
    )
}
