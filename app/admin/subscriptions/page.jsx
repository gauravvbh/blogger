'use client'


import SubsTableItem from '@/components/AdminComponents/SubsTableItem'
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

const Page = () => {

  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    const response = await axios.get('/api/email');
    setEmails(response.data);
  }

  const deleteEmail=async(id)=>{
    const response = await axios.delete('/api/email',{
      params: { id }
    });
    if(response.data.success){
      toast.success(response.data.message);
      fetchEmails();
    }
    else{
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    fetchEmails();
  }, [])



  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All Subscription</h1>
      <div className='relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-left text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Email Subscription
              </th>
              <th scope='col' className='hidden sm:block px-6 py-3'>
                Date
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              emails.map((data) => (
                <SubsTableItem key={data._id} id={data._id} email={data.email} date={data.date} deleteEmail={deleteEmail} />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page