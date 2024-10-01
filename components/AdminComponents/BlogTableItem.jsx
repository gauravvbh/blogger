import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const BlogTableItem = ({ authorImg, title, author, date, id, deleteBlog }) => {
    const newDate = new Date(date);
    const blogDate = newDate.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });


    return (
        <tr className='bg-white border-b'>
            <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                <Image src={authorImg ? authorImg : assets.profile_icon} width={40} height={40} alt='' className='rounded-full object-cover' />
                <p>{author ? author : "No author"}</p>
            </th>
            <td className='px-6 py-4'>
                {title ? title : "no title"}
            </td>
            <td className='px-6 py-4'>
                {blogDate ? blogDate : "11 Jan 2024"}
            </td>
            <td onClick={() => deleteBlog(id)} className='px-6 py-4 cursor-pointer'>
                x
            </td>
        </tr>
    )
}

export default BlogTableItem