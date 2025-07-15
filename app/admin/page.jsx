import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
  return (
    redirect('/admin/addProduct')
  )
}

export default page