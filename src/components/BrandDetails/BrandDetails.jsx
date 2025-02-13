import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../Loader/Loader'
import axios from 'axios'

export default function BrandDetails() {
  let {prodId} = useParams();
  const [brands, setBrands] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function getBrands(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${prodId}`).then((data)=>{
      setBrands(data?.data?.data)
      setIsLoading(false)
    }).catch((err)=>{
      console.log(err);
      setIsLoading(false)
  })
  }
  useEffect(()=>{
    getBrands()
  }, [])
  return (
    <>
      <div className='min-h-screen flex items-center justify-center p-4'>
        {isLoading ? <Loader /> : (
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-col items-center">
              <div className="w-full md:w-3/4 lg:w-1/2 px-3 mb-8">
                <div className="relative rounded-lg overflow-hidden">
                  <img src={brands.image} alt={brands.name} className="w-full h-auto object-cover mx-auto shadow-lg"/>
                </div>
              </div>
              <div className="w-full md:w-3/4 lg:w-1/2 px-3">
                <h1 className='py-2 text-black font-bold text-2xl text-center'>{brands.name}</h1>
                <h3 className='py-2 text-gray-700 text-center'>{brands.slug}</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
