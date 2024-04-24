import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../config/apiConfig';
import { useParams } from 'react-router-dom';
export default function BlogDetails() {
  const { slug } = useParams();
  const [blog,setBlog] = useState()
  const getblog = async () => {
    try {
      const requestOptions = {
        method: 'GET',

      };
      const response = await fetch(`${API_BASE_URL}/api/blog/${slug}`, requestOptions);

      const data = await response.json();
      setBlog(data);
      console.log(data);
    } catch (error) {
      console.error('There was a problem with the fetch request:', error);
    }
  }
  useEffect(()=>{getblog()},[])
  return (
    <div>
        <div className="bg-gray-100 p-10 my-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>
         <img src={blog?.image} alt={blog?.title} className="mb-6 rounded-lg" /> 
         <p className="text-gray-700">{blog?.description}</p> 
         <p className="text-gray-700">Published: {blog?.createdAt.slice(0,10)}</p>
      </div>
    </div>
    </div>
  )
}
