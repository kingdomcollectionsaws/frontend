import React, { useEffect, useState } from 'react'
import { Button, Grid, InputLabel, MenuItem, Select, TextField, dialogActionsClasses } from '@mui/material'
import { API_BASE_URL } from '../config/apiConfig';
import { event } from 'react-ga';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../customer/state/category/categorySlice';

export default function Category() {
    const dispatch = useDispatch();
    const { categories, error } = useSelector(store => store.categories);
    useEffect(() => {
        dispatch(getCategories());
        console.log(categories);

    }, [])
    const [categoryData, setcategoryData] = useState(
        { name: '', image: '', slug: '' }
    )
    const handelfileupload = async (event) => {

        const files = document.getElementsByName('images')[0].files;

        // Check if files exist
        if (files.length === 0) {
            return; // No files to upload
        }

        const formData = new FormData();
        formData.append('file', files[0]); // Upload the first file only
        formData.append('upload_preset', 'pnegpfre');

        try {
            const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/dujcstewk/image/upload`, {
                method: 'POST',
                body: formData,
            });

            const responseData = await uploadResponse.json();
            if (responseData.secure_url) {
                categoryData.image = responseData.secure_url; // Assign the secure URL to categoryData.image
            } else {
                // Handle error case where secure_url is not present in the response
                console.error('Error uploading image:', responseData);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }

    }
    const post = async () => {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify(categoryData)
        }
        fetch(`${API_BASE_URL}/api/categories/add`, requestOptions)
            .then(response => {
                // if (!response.ok) {
                //     throw new Error('Network response was not ok');
                // }
                return response.json();
            })
            .then(res => {
                const form = document.getElementsById('form');
            form.reset()
                alert('Category added successfully')
            })
            .catch(error => {
                console.error('There was a problem with the fetch request:', error);
            });
            

    }
    const deletecategory = async (id) => {
        if(confirm("DO you want to delete it") == true){
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
        }
        fetch(`${API_BASE_URL}/api/categories/delete/${id}`, requestOptions)
            .then(response => {
                // if (!response.ok) {
                //     throw new Error('Network response was not ok');
                // }
                return response.json();
            })
            .then(res => {
                alert('Category deleted successfully')
            })
            .catch(error => {
                console.error('There was a problem with the fetch request:', error);
            });
        }
    }
    return (

        <div style={{ display: 'flex', flexDirection: 'column', margin: '2rem',  }}>
            <div>
                <form  id='form'>
                    <Grid style={{ display: 'flex', gap: '10px' }}>
                        <Grid item xs={6} sm={6}  >

                            <input
                                style={{ backgroundColor: 'black', color: '#fff', margin: '1rem' }}
                                required
                                name='images'
                                label='Images'
                                type='file'
                                fullWidth

                                multiple
                                onChange={handelfileupload}

                            />

                        </Grid>

                        <Grid item xs={6} sm={6}  >

                            <TextField
                                required
                                name='slug'
                                label='Category slug'

                                onChange={(event) => categoryData.slug = event.target.value}
                                style={{ paddingBottom: '10px' }}
                            />

                        </Grid>
                        <Grid item xs={6} sm={6}  >

                            <TextField
                                required
                                name='name'
                                label='Category name'

                                onChange={(event) => categoryData.name = event.target.value}
                                style={{ paddingBottom: '10px' }}
                            />

                        </Grid>
                        <Grid item xs={6} sm={6} >
                            <Button

                                className=' w-full px-0 py-3'
                                variant='contained'
                                sx={{ background: "#9155FD" }}
                                onClick={post}
                            >

                                Add  Category
                            </Button>

                        </Grid>
                    </Grid>
                </form>
            </div>
            <div>
                {categories?.map((i) => (
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',gap:'20px',marginBottom:'1rem' }}>
                        <img src={i?.image} alt="img" style={{width:'5rem',height:'5rem'}} />
                        <p>{i?.name}</p>
                        <p>{i?.slug}</p>
                        <button style={{backgroundColor:'black',color:'#fff'}} onClick={()=>deletecategory(i._id)}>Delete</button>
                    </div>
                ))}
            </div>

        </div>
    )
}
