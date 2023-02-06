import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Avatar from "../assets/profile.png"
import {Toaster} from "react-hot-toast"
import {useFormik} from "formik"
import { profileValidation } from '../helpers/validate'
import convertToBase64 from '../helpers/convert'

import styles from "../styles/Login.module.css";
import extend from "../styles/Profile.module.css";

const Profile = () => {
  const [file, setFile] = useState()
  const formik = useFormik({
    initialValues:{
      firstName:"",
      lastName:"",
      address:"",
      email:"",
      mobileNo:""
    },
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange:false,
    onSubmit: async values =>{
        values = await Object.assign(values, {profile:file || " "})
        console.log(values)
    }
  })
  //formik doent support file upload, handles files this way
  const onUpload = async (e) =>{
    const base64 = await convertToBase64(e.target.files[0])
    setFile(base64)
  }
  return (
    <div className='container mx-auto'>
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center h-screen'>
            <div className={`${styles.glass} ${extend.glass}`} style={{width:"45%"}}>
                <div className='title flex flex-col items-center'>
                    <h4 className='text-5xl font-bold'>Profile</h4>
                    <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                      You can update your details
                    </span>
                </div>
                <form className='py-1' onSubmit={formik.handleSubmit}>
                    <div className='profile flex justify-center py-4'>
                        <label htmlFor='profile'>
                          <img src={file || Avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt='avatar' />
                        </label>
                        <input onChange={onUpload} type="file" id="profile" name="profile" />
                    </div>
                    <div className='textbox flex flex-col items-center gap-6'>
                        <div className='name flex w-3/4 gap-10'>
                          <input {...formik.getFieldProps("firstName")} className={styles.textbox} type="text" placeholder='First Name*'/>
                          <input {...formik.getFieldProps("lastName")} className={styles.textbox} type="text" placeholder='Last Name*'/>
                        </div>
                        <div className='name flex w-3/4 gap-10'>
                          <input {...formik.getFieldProps("mobileNo")} className={styles.textbox} type="" placeholder='Mobile No.'/>
                          <input {...formik.getFieldProps("email")} className={styles.textbox} type="email" placeholder='Last Name*'/>
                        </div>
                        <div className='name flex w-3/4 gap-10'>
                          <input {...formik.getFieldProps("address")} className={styles.textbox} type="" placeholder='Address'/>
                        </div>
              
                        <button className={styles.btn} type='submit'>Update</button>
                    </div>
                    <div className='text-center py-4'>
                        <span className='text-gray-500'>Come back Later <button className='text-red-500'>Logout</button></span>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Profile;