import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function VerifyOtp() {
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  let mySchema = Yup.object({
    resetCode: Yup.string().required('OTP is required').matches(/^\d+$/, 'OTP must contain only numbers').length(6, 'OTP must be exactly 6 digits')
    })
  
    const formik = useFormik({
      initialValues: {
        resetCode: ''
      },
      validationSchema: mySchema,
      onSubmit: (values) => {
        verifyOTPForm(values)
      },
    });
    async function verifyOTPForm(values){
      setIsLoading(true);
      return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values).then(()=>{
        setIsLoading(false);
        navigate("/forgetpassword")
      }).catch((err)=>{
        console.log(err);
        setIsLoading(false);
      })
    }
  return (
    <>
      <div className='w-full md:w-1/2 lg:w-1/3 mx-auto px-4 sm:px-0 mt-96'>
        <h1 className='text-main text-2xl md:text-3xl'>Confirm OTP</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className='my-2'>
            <label htmlFor="resetCode" className='block mb-1 sm:mb-2 text-sm font-medium text-gray-900 dark:text-white'>Enter reset code</label>
            <input name='resetCode' type="text" id="resetCode" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500' onChange={formik.handleChange} value={formik.values.resetCode} onBlur={formik.handleBlur}/>
            {formik.touched.resetCode && formik.errors.resetCode? <div className='p-3 sm:p-4 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'><p>{formik.errors.resetCode}</p></div> : null}
          </div>
          <div className='my-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0'>
          {isLoading ? (<button type='submit' className='bg-main text-white px-4 py-2 rounded-lg w-full sm:w-auto'><i className='fa fa-spinner fa-spin'></i></button>) : (<button type='submit' className='bg-main text-white px-4 py-2 rounded-lg w-full sm:w-auto disabled:opacity-50' disabled={!(formik.isValid && formik.dirty)}>Submit</button>)}
          </div>
        </form>
      </div>
    </>
  )
}
