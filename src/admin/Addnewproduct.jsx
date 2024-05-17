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
import { useNavigate } from 'react-router-dom';
export default function Addnewproduct() {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [editmenu, setEditmenu] = useState(false);
    const [showCategory, setShowCategory] = useState()
    const { products, loading, product } = useSelector(store => store.allproducts);
    const { categories } = useSelector(store => store.categories);
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
        discountedPrice: '',
        slug: '',
        height: '',
        width: '',
        materials: '',
        variations: []
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        //    if(name=="images"){
        //     productData.images =imageUrls
        //    }
        if (name == "price") {
            productData.price = value
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


    useEffect(() => {

    }, [productData]);

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
            fetch(`https://api.cloudinary.com/v1_1/dujcstewk/images/upload`, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
        ));

        const imageUrls = uploadResponses.map(response => response.secure_url).filter(url => url);
        productData.imageUrl = imageUrls
    }
    const addvaraitiondata = () => {
        productData.variations.push(
            { price: productData.price, discountedPrice: productData.discountedPrice, style: productData.brand, images: productData.imageUrl }
        )
        const form = document.getElementById('variationform'); // Replace 'yourFormId' with the actual ID of your form
        form.reset();
        console.log(productData);
    }
    const postProduct = () => {


        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify(productData)
        }
        console.log(productData);
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
    const [product_Id, setProduct_Id] = useState()
    const updateproductdetails = () => {
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
    useEffect(() => {

    }, []);
    return (
        <div style={{ padding: '1rem' }}>

            {editmenu ? <div>
                <p style={{ color: 'red' }}>*If you don't want to change any field, keep that input empty</p>
                <p>Product : {productData.title}</p>
            </div> : ''}
            {
                !open ?
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
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        required
                                        name='slug'
                                        label='Slug'
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        required
                                        name='height'
                                        label='Height'
                                        fullWidth
                                        onChange={handleInputChange}
                                        style={{ paddingBottom: '10px' }}
                                    /></Grid>
                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        required
                                        name='width'
                                        label='Width'
                                        fullWidth
                                        onChange={handleInputChange}
                                        style={{ paddingBottom: '10px' }}
                                    /></Grid>
                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        required
                                        name='materials'
                                        label='Materials'
                                        fullWidth
                                        onChange={handleInputChange}
                                        style={{ paddingBottom: '10px' }}
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
                                            {categories?.map((item, index) => (

                                                <MenuItem value={item.slug} key={index}>
                                                    {item.slug}
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
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column',margin:'1rem' }}>
                            {
                                productData?.variations.map((i) => (
                                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row',gap:'2rem' }}>
                                        <p>{i.price}</p>
                                        <p>{i.discountedPrice}</p>
                                        <p>{i.style}</p>
                                    </div>
                                )
                                )
                            }

                        </div>
                        <form id='variationform'>
                            <h1 style={{ margin: '1rem' }}>Add varitions section</h1>
                            <Grid item xs={12} sm={12}  >
                                <p>select all images you to upload</p>
                                <input
                                    style={{ backgroundColor: 'black', color: '#fff', margin: '1rem' }}
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

                            <Grid item xs={6} sm={6}  >

                                <TextField
                                    required
                                    name='price'
                                    label='Regular Price'
                                    fullWidth
                                    onChange={handleInputChange}
                                    style={{ paddingBottom: '10px' }}
                                />

                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <TextField
                                    required
                                    name='discountedPrice'
                                    label='Sale Price'
                                    fullWidth
                                    onChange={handleInputChange}
                                    style={{ paddingBottom: '10px' }}
                                /></Grid>
                            <Grid item xs={12} sm={6} >
                                <TextField
                                    required
                                    name='productvariaton'
                                    label='Style'

                                    fullWidth
                                    onChange={handleInputChange}
                                />

                            </Grid>
                            <Grid item xs={6} sm={6} >
                                <Button

                                    className=' w-full px-0 py-3'
                                    variant='contained'
                                    sx={{ background: "#9155FD" }}
                                    onClick={addvaraitiondata}
                                >

                                    Add  Variation
                                </Button>

                            </Grid>
                        </form>
                    </div> : ''
            }
        </div>
    )
}
