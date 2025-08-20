import React, { use } from 'react'
import {User} from "lucide-react"
import {useSelector,useDispatch} from 'react-redux'
import { addPersonalInfo } from '../features/formSlice';
import Input from './Input';
const PersonalInfoForm = () => {

const dispatch=useDispatch();

const handlePersonalInfoChange=(e)=>{
 
  const {name,value}=e.target;
  dispatch(addPersonalInfo({[name]:value}));
}
  return (
    <div className='max-w-3xl bg-white rounded-md shadow-md p-4 '>
      <div className='flex gap-3  border-b-[0.5px]  border-gray-200' >
<User className='text-blue-500 text-2xl mb-2' />
        <h1 className='text-xl font-semibold'>Personal Information</h1>
      </div>
      <form action="">
        <div className='flex flex-col space-y-4 mt-2 p-2 '>
       
       <Input label={"full name"} name="fullName" type="text" onChange={handlePersonalInfoChange} placeholder={"enter full name"}/>
        <Input label={"Professional Headline"} name="headline" type="text" onChange={handlePersonalInfoChange} placeholder={"enter headline"}/>
        </div>
        <div className='grid grid-cols-2 gap-4 p-2 mt-4'>
             
             <Input label={"email"} type='email' name={"email"} onChange={handlePersonalInfoChange} placeholder={"enter email address"}/>
             <Input label={"phone number"} type='tel' name={"phoneNumber"} onChange={handlePersonalInfoChange} placeholder={"enter phone number "}/>

         
          <Input label={"location"} type='text' name={"location"} onChange={handlePersonalInfoChange} placeholder={"enter location"}/>
          <Input label={"LinkedIn"} type='text' name={"linkedIn"} onChange={handlePersonalInfoChange} placeholder={"enter LinkedIn profile"}/>
          <Input label={"GitHub"} type='text' name={"github"} onChange={handlePersonalInfoChange} placeholder={"enter GitHub profile"}/>  

  
          

        </div>
      </form>

      <div className='flex justify-end mt-1'>
        <button className='bg-blue-500 text-white px-4 py-2   rounded-md mt-4 hover:bg-blue-600 transition-colors duration-300'>
          Save & Continue
        </button>
      </div>
    </div>
  )
}


export default PersonalInfoForm
