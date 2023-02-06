import React from 'react'
import { Link } from 'react-router-dom'
import {Toaster} from "react-hot-toast"
import {useFormik} from "formik"
import {resetPasswordValidation } from '../helpers/validate'
import styles from "../styles/Login.module.css";

const Reset = () => {
  const formik = useFormik({
    initialValues:{
        password:"",
        confirm_password:""
    },
    validate:resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange:false,
    onSubmit: async values =>{
        console.log(values)
    }
  })
  return (
    <div className='container mx-auto'>
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center h-screen'>
            <div className={styles.glass} style={{width:"50%"}}>
                <div className='title flex flex-col items-center'>
                    <h4 className='text-5xl font-bold'>Reset</h4>
                    <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                      Enter New Password
                    </span>
                </div>
                <form className='py-1' onSubmit={formik.handleSubmit}>
                    <div className='textbox flex flex-col items-center gap-6'>
                        <input {...formik.getFieldProps("password")} className={styles.textbox} type="password" placeholder='Password'/>
                        <input {...formik.getFieldProps("confirm_password")} className={styles.textbox} type="password" placeholder='Confirm Password'/>
                        <button className={styles.btn} type='submit'>Reset</button>
                    </div>
                    <div className='text-center py-4'>
                        <span className='text-gray-500'>Forgot Password? <Link className='text-red-500' to='/recover'>Recover Now!</Link></span>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Reset