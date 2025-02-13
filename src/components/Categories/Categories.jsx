import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function getCategories(){
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories").then((data)=>{
      setCategories(data.data.data)
      setIsLoading(false)
    }).catch((err)=>{
      console.log(err);
      setIsLoading(false)
  })
  }
  useEffect(()=>{
    getCategories()
  }, [])

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      {isLoading ? <Loader  /> : <div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {categories.map((category)=>
        <div key={category._id} className='group relative transition-all duration-300 hover:shadow-lg rounded-xl overflow-hidden'>
          <div className="category p-2 sm:p-3 border border-gray-100 rounded-xl hover:border-gray-200">
            <Link to={`/categoryDetails/${category._id}`}>
            <div className='relative aspect-[3/4] rounded-lg overflow-hidden'>
              <img src={category.image} alt="category" className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'/>
            </div>
            <div className='pt-3 pb-2'>
              <h3 className='text-main font-medium text-sm md:text-base line-clamp-1'>{category.name}</h3>
              <p className="text-gray-500 text-xs md:text-sm mt-1 line-clamp-2">{category.slug}</p>
              <div className="text-gray-400 text-xs mt-2">
                <p>Updated: {formatDateTime(category.updatedAt)}</p>
              </div>
            </div>
            </Link>
          </div>
        </div>)
        }
      </div>
      </div> }
    </>
  )
}
