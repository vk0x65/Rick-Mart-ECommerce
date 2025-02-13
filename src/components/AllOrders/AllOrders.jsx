import React from 'react'
import success from '../../assets/paid.png'

export default function AllOrders() {
  return (
    <>
      <div className='container mx-auto flex flex-col justify-center items-center'>
        <img src={success} alt="Success" className='w-full max-w-screen-md' />
        <p className='mt-4 text-xl text-center mb-10'>Your order has been placed successfully!</p>
      </div>
    </>
  )
}
