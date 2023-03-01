import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from "../assets/profile.png"
import toast, {Toaster} from "react-hot-toast"
import {useFormik} from "formik"
import { passwordValidate } from '../helpers/validate'
import { loginUser } from '../helpers/helper'
import useAuthStore from '../store/store'
import useFetch from '../hooks/fetch.hook'
import styles from "../styles/Login.module.css";

const Password = () => {
  const navigate = useNavigate();
  const username = useAuthStore(state => state.auth.username)
  const [{isLoading, apiData, serverError}] = useFetch(`user/${username}`)
  const formik = useFormik({
    initialValues:{
        password:""
    },
    validate:passwordValidate,
    validateOnBlur: false,
    validateOnChange:false,
    onSubmit: async values =>{
        //console.log(values)
        let loginPromise = loginUser({ username, password:values.password})
        toast.promise(loginPromise, {
            loading: "Validating User!",
            success: <b>Login Successful!</b>,
            error: <b>Invalid Password!</b>
        });

        loginPromise.then(res => {
            let {token} = res.data;
            localStorage.setItem("token", token);
            navigate('/profile')
        })
    }
  })

  //console.log(isLoading, apiData, serverError)
  if(isLoading) return <h2 className='text-2xl font-bold'> Loading...</h2>
  if(serverError) return <h2 className='text-xl text-red-500'>{serverError.message}</h2>
  return (
    <div className='container mx-auto'>
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center h-screen'>
            <div className={styles.glass}>
                <div className='title flex flex-col items-center'>
                    <h4 className='text-5xl font-bold'>Hello {apiData?.firstName || apiData?.username}</h4>
                    <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                        Explore More by connecting with us.
                    </span>
                </div>
                <form className='py-1' onSubmit={formik.handleSubmit}>
                    <div className='profile flex justify-center py-4'>
                        <img src={apiData?.profile || Avatar} className={styles.profile_img} alt='avatar' />
                    </div>
                    <div className='textbox flex flex-col items-center gap-6'>
                        <input {...formik.getFieldProps("password")} className={styles.textbox} type="password" placeholder='password'/>
                        <button className={styles.btn} type='submit'>Sign In</button>
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

export default Password