import React, { useState } from 'react'
import { Button, Grid ,TextField } from '@mui/material'
import { API_BASE_URL } from '../config/apiConfig';
export default function AddBlog() {
    const [blogData, setBlogData] = useState({
        title: '',
        description: '',
        image: '',
        slug:''
    });
    const handleInputChange = (e)=>{
        const { name, value } = e.target;
  if (name == "title") {
    blogData.title = value
}
if (name == "description") {
    blogData.description = value
}
if (name == "slug") {
    blogData.slug = value.toLowerCase()
}
    }
    const handelfileupload = async (event) => {
        const files = event.target.files;
    
        if (!files) {
            console.error('No file selected');
            return;
        }
    
        // Get the first file
        const file = files[0];
    
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'pnegpfre');
    
        try {
            const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/dujcstewk/image/upload`, {
                method: 'POST',
                body: formData,
            });
    
            if (!uploadResponse.ok) {
                throw new Error('Failed to upload file');
            }
    
            const responseData = await uploadResponse.json();
    
            setBlogData(prevState => ({
                ...prevState,
                image: responseData.secure_url
            }));
    
        } catch (error) {
            console.error('Error uploading file:', error.message);
        }

       
    };
    const [blogs, setBlogs] = useState([]);
    const postblog = async () => {
        try {
          //  await new Promise(resolve => setTimeout(resolve, 3000));
            await handelfileupload(event);
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Set the content type to JSON
                },
                body: JSON.stringify(blogData)
            };

            const response = await fetch(`${API_BASE_URL}/api/blog/create`, requestOptions);
          
            const data = await response.json();
            console.log('Blog created:', data);
            alert('Blog created successfully');
        } catch (error) {
            console.error('There was a problem with the fetch request:', error);
            alert('Error creating blog');
        }
    }
    
  return (
    <div>
         <div style={{margin:'1rem'}}>
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
                           
                            <Grid item xs={12} sm={12} style={{margin:'4px',marginTop:'3rem',cursor:'pointer'}}>
                                <input
                                    style={{backgroundColor:'black',color:'#fff'}}
                                    required
                                    name='images'
                                    label='Images'
                                    type='file'
                                    fullWidth
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
                       
                            
                            <Grid item xs={12} sm={6} >
                                <Button
                                    className=' w-full px-0 py-3'
                                    variant='contained'
                                    sx={{ background: "#9155FD" }}
                                  onClick={postblog}
                                >
                                    Post
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div> 
    </div>
  )
}
