import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../config/apiConfig';
import { Button, Grid, InputLabel, MenuItem, Select, TextField, dialogActionsClasses } from '@mui/material'
export default function Blog({value}) {
  const [blogs, setBlogs] = useState([]);
  const [blogEdit, setBlogEdit] = useState(false)
  const [blogData, setBlogData] = useState({
    id:'',
    title: '',
    description: '',
    image: '',
    slug:''
  });
  const updateblog = (id, title,description,image,slug) => {
    blogData.id = id
    blogData.title = title
    blogData.description = description
    blogData.image = image
    blogData.slug = slug
    setBlogEdit(true)
  }
  const deleteblog = async(id) => {
    if(confirm("DO you want to delete it")==true){
      try {

        const requestOptions = {
          method: 'DELETE',
  
          headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
          },
          body: JSON.stringify({id})
        };
        const response = await fetch(`${API_BASE_URL}/api/blog/delete`, requestOptions);
  
        const data = await response.json();
        if(data){
          alert("Blog deleted successfully")
        }
        
      } catch (error) {
        console.error('There was a problem with the fetch request:', error);
      }
    }
  }

  const getblogs = async () => {
    try {

      const requestOptions = {
        method: 'GET',

      };
      const response = await fetch(`${API_BASE_URL}/api/blog/allblogs`, requestOptions);

      const data = await response.json();
      setBlogs(data);
      console.log(data);
    } catch (error) {
      console.error('There was a problem with the fetch request:', error);
    }
  }
  
  const handleInputChange = (e) => {
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
        blogData.image =  responseData.secure_url
     
console.log(blogData);
    } catch (error) {
      console.error('Error uploading file:', error.message);
    }


  };
  const postblog = async () => {
    try {
      await handelfileupload(event);
      
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json' // Set the content type to JSON
        },
        body: JSON.stringify(blogData)
      };

      const response = await fetch(`${API_BASE_URL}/api/blog/update`, requestOptions);

      const data = await response.json();
      console.log('Blog created:', data);
      alert('Blog update successfully');
    } catch (error) {
      console.error('There was a problem with the fetch request:', error);
      alert('Error creating blog');
    }
  }
  useEffect(() => {
    getblogs()
    setBlogEdit(value)
  }, [])

  return (<>
    {!blogEdit ?
      <div>


        {blogs.map((i) => (
          <>
            <div className='border mb-3 m-10'>
              <div className='flex align-center mx-3 mt-10  space-x-5 m-10' key={i} >
                <img src={i.image} alt='img' style={{ width: '5rem', height: '5rem' }} />
                <div className='flex align-center justify-center flex-row ' style={{ gap: '110px' }} >
                  <div style={{ width: '11rem' }}>
                    <p>{i.title} </p>
                    <div style={{ display: 'flex', width: '14rem' }}>
                      <Button sx={{ color: "RGB(145 85 253)" }} onClick={() => updateblog(i._id, i.title, i.description, i.image,i.slug)} >EDIT <span style={{ color: 'black', paddingLeft: '1rem' }}> |</span></Button>

                      <Button sx={{ color: "RGB(145 85 253)" }} onClick={() => deleteblog(i._id)}>delete <span style={{ color: 'black', paddingLeft: '1rem' }}> |</span></Button>
                      <Button sx={{ color: "RGB(145 85 253)" }} onClick={() => navigate(`#`)} >View</Button>
                    </div>
                  </div>

                  <p >{i.description.slice(0, 80)}..</p>
                  <p style={{ width: '10rem' }}> {i.createdAt.slice(0, 10)}</p>
                  <div className="flex align-center justify-start m-y-1 space-x-2" >
                  </div>
                </div>
                <div>
                </div>

              </div>
              <div className='flex align-center justify-center mx-3  space-x-5'>


              </div> </div>
          </>
        ))}
      </div> : 
      <div>


      <div style={{marginLeft:'1rem'}}>
      <p style={{ color: 'red' }}>*If you don't want to change any field, keep that input empty</p>
        <p>Blog: {blogData.title}</p>
      </div>

        <div style={{ margin: '1rem' }}>
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

              <Grid item xs={12} sm={12} style={{ margin: '4px', marginTop: '3rem', cursor: 'pointer' }}>
                <input
                  style={{ backgroundColor: 'black', color: '#fff' }}
                  required
                  name='images'
                  label='Images'
                  type='file'
                  fullWidth
                  onChange={handelfileupload}

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
              <Grid item xs={12} sm={6} >
                <Button
                  className=' w-full px-0 py-3'
                  variant='contained'
                  sx={{ background: "tomato" }}
                  onClick={()=>setBlogEdit(false)}
                >
                  Cancel
                </Button>
                
              </Grid>
            </Grid>
          </form>
        </div>
      </div>}

  </>

  )
}
