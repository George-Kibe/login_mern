import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from "../assets/profile.png"
import toast, {Toaster} from "react-hot-toast"
import {useFormik} from "formik"
import { registerValidation } from '../helpers/validate'
import convertToBase64 from '../helpers/convert'
import { registerUser } from '../helpers/helper'

import styles from "../styles/Login.module.css";

const Register = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState()
  const formik = useFormik({
    initialValues:{
      email:"",
      username:"",
      password:""
    },
    validate:registerValidation,
    validateOnBlur: false,
    validateOnChange:false,
    onSubmit: async values =>{
        values = await Object.assign(values, {profile:file || " "})
        console.log(values)
        let registerPromise = registerUser(values)
        toast.promise(registerPromise, {
          loading: 'Creating user in Database!',
          success: <b>User Registration Successful</b>,
          error: <b>Could Not Register!</b>
        });
        registerPromise.then(function(){ navigate('/') })
    }
  })
  //formik doent support file upload, handle files this way
  const onUpload = async (e) =>{
    const base64 = await convertToBase64(e.target.files[0])
    setFile(base64)
  }
  //console.log(file)
  return (
    <div className='container mx-auto'>
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center h-screen'>
            <div className={styles.glass} style={{width:"45%"}}>
                <div className='title flex flex-col items-center'>
                    <h4 className='text-5xl font-bold'>Register</h4>
                    <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                      Happy to join us!
                    </span>
                </div>
                <form className='py-1' onSubmit={formik.handleSubmit}>
                    <div className='profile flex justify-center py-4'>
                        <label htmlFor='profile'>
                          <img src={file || Avatar} className={styles.profile_img} alt='avatar' />
                        </label>
                        <input onChange={onUpload} type="file" id="profile" name="profile" />
                    </div>
                    <div className='textbox flex flex-col items-center gap-6'>
                        <input {...formik.getFieldProps("email")} className={styles.textbox} type="email" placeholder='Email*'/>
                        <input {...formik.getFieldProps("username")} className={styles.textbox} type="text" placeholder='Username*'/>
                        <input {...formik.getFieldProps("password")} className={styles.textbox} type="password" placeholder='password*'/>
                        <button className={styles.btn} type='submit'>Register</button>
                    </div>
                    <div className='text-center py-4'>
                        <span className='text-gray-500'>Already Have an Account? <Link className='text-red-500' to='/'>Sign In Instead</Link></span>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register;