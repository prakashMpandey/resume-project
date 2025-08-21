import React, { use } from 'react'
import {User} from "lucide-react"
import Input from './Input';
const PersonalInfoForm = ({data,onChange}) => {

 
  const { fullName, headline, email, phoneNumber, location, linkedIn, github } = data;


const handlePersonalInfoChange=(e)=>{
 
}
  return (
    <div className='max-w-3xl bg-white rounded-md shadow-md p-4 '>
      <div className='flex gap-3  border-b-[0.5px]  border-gray-200' >
<User className='text-blue-500 text-2xl mb-2' />
        <h1 className='text-xl font-semibold'>Personal Information</h1>
      </div>
      <form action="">
        <div className='flex flex-col space-y-4 mt-2 p-2 '>
       
       <Input label={"full name"} name="fullName" type="text" value={fullName} onChange={onChange} placeholder={"enter full name"}/>
        <Input label={"Professional Headline"} name="headline" value={headline} type="text" onChange={onChange} placeholder={"enter headline"}/>
        </div>
        <div className='grid grid-cols-2 gap-4 p-2 mt-4'>
             
             <Input label={"email"} type='email' name={"email"} value={email} onChange={onChange} placeholder={"enter email address"}/>
             <Input label={"phone number"} type='tel' name={"phoneNumber"} value={phoneNumber} onChange={onChange} placeholder={"enter phone number "}/>

         
          <Input label={"location"} type='text' name={"location"} value={location} onChange={onChange} placeholder={"enter location"}/>
          <Input label={"LinkedIn"} type='text' name={"linkedIn"} value={linkedIn} onChange={onChange} placeholder={"enter LinkedIn profile"}/>
          <Input label={"GitHub"} type='text' name={"github"} value={github} onChange={onChange} placeholder={"enter GitHub profile"}/>  

  
          

        </div>
      </form>

    </div>
  )
}


export default PersonalInfoForm
