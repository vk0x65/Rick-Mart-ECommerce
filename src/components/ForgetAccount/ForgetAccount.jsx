import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ForgetAccount() {
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  let mySchema = Yup.object({
      email: Yup.string().required('Email is required').email('Invalid email address'),
    })
  
    const formik = useFormik({
      initialValues: {
        email: ''
      },
      validationSchema: mySchema,
      onSubmit: (values) => {
        sendOTPForm(values)
      },
    });
    async function sendOTPForm(values){
      return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values).then(()=>{
        navigate("/verifyotp")
      }).catch((err)=>{
        console.log(err);
        setIsLoading(false);
      })
    }
  return (
    <>
      <div className='w-full md:w-1/2 lg:w-1/3 mx-auto px-4 sm:px-0 mt-96'>
        <h1 className='text-main text-2xl md:text-3xl'>Forget Account</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className='my-2'>
            <label htmlFor="email" className='block mb-1 sm:mb-2 text-sm font-medium text-gray-900 dark:text-white'>Enter your email</label>
            <input name='email' type="email" id="email" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
            {formik.touched.email && formik.errors.email? <div className='p-3 sm:p-4 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'><p>{formik.errors.email}</p></div> : null}
          </div>
          <div className='my-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0'>
          {isLoading ? (<button type='submit' className='bg-main text-white px-4 py-2 rounded-lg w-full sm:w-auto'><i className='fa fa-spinner fa-spin'></i></button>) : (<button type='submit' className='bg-main text-white px-4 py-2 rounded-lg w-full sm:w-auto disabled:opacity-50' disabled={!(formik.isValid && formik.dirty)}>Send Code</button>)}
          </div>
        </form>
      </div>
    </>
  )
}
