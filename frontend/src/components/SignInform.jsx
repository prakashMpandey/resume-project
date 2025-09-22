import { Input } from '@mui/material'
import React from 'react'
import {useState} from "react"
import PasswordInput from './PasswordInput';
import { X } from 'lucide-react';

import toast from 'react-hot-toast';
import {useSelector,useDispatch} from "react-redux"
import { signin } from '../features/AuthSlice.js';
import { useNavigate } from 'react-router';

function SignInform({closeAuthModal , switchAuthType}) {

  const navigate=useNavigate()
    const [loginData,setLoginData]=useState({
        textData:'',
        password:''
    })

    const dispatch=useDispatch()


    const handleChange=(e)=>{
        const {name,value}=e.target;
        console.log(name)
        setLoginData({...loginData,[name]:value})
    }

    const handleSubmit=async(e)=>{
      e.preventDefault();
      try {

        const response=await  dispatch(signin(loginData));
        console.log("response :",response);
        
        if(response.meta.requestStatus==='fulfilled'){
          toast.success("signed in successfully")

          closeAuthModal()
          navigate("/home")

        }
        else{
          toast.error(response?.payload || "sign in failed")
        }
        
      } catch (error) {
        toast.error(error?.message || "sign in failed")
      }
      finally{
        setLoginData({
          textData:"",
          password:""
        })
      }
     
    }
  return (
    <div className="bg-white  relative p-8 rounded-lg shadow-lg min-w-[320px] transition-all linear duration-150 delay-50" >
    <div>
        <h2 className='text-2xl font-bold mb-4'>Sign In</h2>
    </div>
    <div>
    <button onClick={closeAuthModal}><X className='w-5 h-6  font-bold absolute top-2 right-3 text-gray-900 hover:text-blue-600 '/>
</button>
    </div>
      <form  onSubmit={handleSubmit}>
        <Input type="text" value={loginData.textData} name="textData" onChange={handleChange} placeholder='Enter your email or username' className='border-2 border-gray-300 rounded-md p-2 w-full mb-4'/>
       <PasswordInput  value={loginData.password} name="password" onChange={handleChange} placeholder='Enter your password' className='border-2 border-gray-300 rounded-md p-2 w-full mb-4'/>
        <button className='bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600'>Sign In</button>
      </form>
      <div>
        <p className='text-sm mt-4'>Don't have an account? <span className='text-blue-500 cursor-pointer'><button onClick={()=>switchAuthType("signup")}>Sign Up</button></span></p>
      </div>
    </div>
  )
}

export default SignInform
