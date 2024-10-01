import React from 'react'

const SubsTableItem = ({ email, date, id, deleteEmail }) => {
    const emailDate = new Date(date);
    const formattedDate = emailDate.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });


    return (
        <tr className='bg-white border-b text-left'>
            <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                {email ? email : "No email"}
            </th>
            <td className='px-6 py-4 hidden sm:block'>
                {formattedDate ? formattedDate : ""}
            </td>
            <td className='px-6 py-4 cursor-pointer' onClick={() => deleteEmail(id)}>
                x
            </td>
        </tr>
    )
}

export default SubsTableItem