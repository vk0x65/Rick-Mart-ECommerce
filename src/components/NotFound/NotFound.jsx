import React from 'react'
import error from '../../assets/404.png'
export default function NotFound() {
  return (
    <>
      <div className='container mx-auto flex flex-col justify-center items-center p-10 mt-10'>
        <img src={error} alt="error" className='w-full max-w-screen-md mt-10'/>
        <p className='text-xl text-center mt-5 mb-10'>You Lost!</p>
      </div>
    </>
  )
}