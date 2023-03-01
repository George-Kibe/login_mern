import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import toast, {Toaster} from "react-hot-toast"
import useAuthStore from "../store/store"
import { generateOTP, verifyOTP } from '../helpers/helper'

import styles from "../styles/Login.module.css";

const Recover = () => {
  const navigate= useNavigate()
  const {username} = useAuthStore(state => state.auth)
  const [OTP, setOTP] = useState()

  const onSubmit = async(e) => {
    e.preventDefault();

    const {status} = await verifyOTP({ username, code: OTP})
    if(status ===201){
      toast.success("Verify successfully!");
      return navigate("/reset")
    }

    return toast.error("Wrong/Expired OTP! Check your email again!")
  }

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      console.log(OTP)
      if(OTP) return toast.success("OTP has been sent to your email!")
      return toast.error("Problem encountered while generating/sending OTP")
    })
  }, [])

  const resendOTP = async() => {
    const sendPromise = generateOTP(username)

    toast.promise(sendPromise, {
      loading: "Sending...",
      success: <b>OTP has been sent to your email!</b>,
      error: <b>Could not send OTP!</b>
    })
    sendPromise.then(OTP => {
      console.log(OTP)
    })
  }
  
  return (
    <div className='container mx-auto'>
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center h-screen'>
            <div className={styles.glass}>
                <div className='title flex flex-col items-center'>
                    <h4 className='text-5xl font-bold'>Recover Account</h4>
                    <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                      Enter OTP to recover your account
                    </span>
                </div>
                <form className='pt-5' onSubmit={onSubmit}>
                    <div className='textbox flex flex-col items-center gap-6'>
                        <span className='py-4 text-sm text-left text-gray-500'>
                          Enter 6 digit OTP sent to your email address
                        </span>
                        <input onChange={(e) => setOTP(e.target.value)} className={styles.textbox} type="" placeholder='OTP'/>
                        <button className={styles.btn} type='submit'>Recover</button>
                    </div>                   
                </form>
                <div className='text-center py-4'>
                  <span className='text-gray-500'>Can't Get OTP? <button onClick={resendOTP} className='text-red-500'>Resend OTP</button></span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Recover