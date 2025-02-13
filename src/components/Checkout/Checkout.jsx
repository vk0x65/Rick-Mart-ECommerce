import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';

export default function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentType, setPaymentType] = useState(null)
  let {onlinePayment, cashPayment} = useContext(CartContext)
  let {state} = useLocation();

  let mySchema = Yup.object({
      details: Yup.string().required('Details is required').min(3, 'Details should be at least 3 characters long').max(225, 'Name maximum 225 characters long'),
      phone: Yup.string().required('Phone is required').matches(/^(002)?01[0125][0-9]{8}$/, "Invalid phone number"),
    })

  const formik = useFormik({
      initialValues: {
        details: '',
        phone: '',
        city: ''
      },
      validationSchema: mySchema,
      onSubmit: (values) => {
        payOnline(values)
      },
    });
    async function payOnline(values) {
      setIsLoading(true)
      if(paymentType == "Online Payment"){
        await onlinePayment(values)
      } else {
        await cashPayment(values)
      }
    }
    useEffect(() => {
      setPaymentType(state.type)
    }, [])
  return (
    <>
      <div className="w-1/3 mx-auto">
      <h1 className='text-main text-2xl font-extrabold text-center'>{paymentType}</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className='my-2'>
            <label htmlFor="details" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Details</label>
            <input name='details' type="text" id="details" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500' onChange={formik.handleChange} value={formik.values.details} onBlur={formik.handleBlur}/>
            {formik.touched.details && formik.errors.details? <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'><p>{formik.errors.details}</p></div> : null}
          </div>
          <div className='my-2'>
            <label htmlFor="phone" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Phone</label>
            <input name='phone' type="tel" id="phone" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500' onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur}/>
            {formik.touched.phone && formik.errors.phone? <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'><p>{formik.errors.phone}</p></div> : null}
          </div>
          <div className='my-2'>
            <label htmlFor="city" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>City</label>
            <input name='city' type="text" id="city" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500' onChange={formik.handleChange} value={formik.values.city} onBlur={formik.handleBlur}/>
            {formik.touched.city && formik.errors.city? <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'><p>{formik.errors.city}</p></div> : null}
          </div>
          <div className='my-4 text-end'>
            {isLoading ? <button type='submit' className='bg-main text-white px-4 py-2 rounded-lg'><i className='fa fa-spinner fa-spin'></i></button> : <button type='submit' className='bg-main text-white px-4 py-2 rounded-lg' disabled={!(formik.isValid && formik.dirty)}>Pay Now</button>}
          </div>
        </form>
      </div>
    </>
  )
}
