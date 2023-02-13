import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from "../assets/profile.png"
import {Toaster} from "react-hot-toast"
import {useFormik} from "formik"
import { usernameValidate } from '../helpers/validate'
import styles from "../styles/Login.module.css";
import useAuthStore from '../store/store'

const Login = () => {
  const navigate = useNavigate()

  const setUsername = useAuthStore(state => state.setUsername)
  const username = useAuthStore(state => state.auth.username)
  
  const formik = useFormik({
    initialValues:{
        username:""
    },
    validate:usernameValidate,
    validateOnBlur: false,
    validateOnChange:false,
    onSubmit: async values =>{
        console.log(values)
        //set username
        setUsername(values.username)
        navigate("/password")
    }
  })
  useEffect(() => {
    console.log(username)

  }, [])
  
  return (
    <div className='container mx-auto'>
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center h-screen'>
            <div className={styles.glass}>
                <div className='title flex flex-col items-center'>
                    <h4 className='text-5xl font-bold'>Hello Again!</h4>
                    <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                        Explore More by connecting with us.
                    </span>
                </div>
                <form className='py-1' onSubmit={formik.handleSubmit}>
                    <div className='profile flex justify-center py-4'>
                        <img src={Avatar} className={styles.profile_img} alt='avatar' />
                    </div>
                    <div className='textbox flex flex-col items-center gap-6'>
                        <input {...formik.getFieldProps("username")} className={styles.textbox} type="text" placeholder='Username'/>
                        <button className={styles.btn} type='submit'>Let's Go</button>
                    </div>
                    <div className='text-center py-4'>
                        <span className='text-gray-500'>Not a Member? <Link className='text-red-500' to='/register'>Register</Link></span>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login