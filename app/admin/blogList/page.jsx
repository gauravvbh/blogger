'use client'

import BlogTableItem from '@/components/AdminComponents/BlogTableItem'
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

const Page = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get('/api/blog');
    setBlogs(response.data);
  }

  const deleteBlog = async (id) => {
    const response = await axios.delete('/api/blog', {
      params: { id }
    });
    if (response.data.success) {
      toast.success(response.data.message);
      fetchBlogs();
    } else {
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, [])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All blogs</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='hidden sm:block px-6 py-3'>Author Name</th>
              <th scope='col' className='px-6 py-3'>Blog title</th>
              <th scope='col' className='px-6 py-3'>Blog date</th>
              <th scope='col' className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <BlogTableItem key={blog._id} id={blog._id} title={blog.title} author={blog.author} authorImg={blog.authorImg} date={blog.date} deleteBlog={deleteBlog} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page