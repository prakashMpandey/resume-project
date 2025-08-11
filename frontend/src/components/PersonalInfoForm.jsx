import React from 'react'
import {User} from "lucide-react"
const PersonalInfoForm = () => {
  return (
    <div className='bg-white rounded-md shadow-md p-4 '>
      <div className='flex gap-3  border-b-[0.5px]  border-gray-200' >
<User className='text-blue-500 text-2xl mb-2' />
        <h1 className='text-xl font-semibold'>Personal Information</h1>
      </div>
      <form action="">
        <div className='flex flex-col space-y-4 mt-2 p-2 '>
          <div className=" flex flex-col gap-2">
              <label className='text-md font-medium'>Name</label>
            <input type="text" className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your Full name' />
          </div>
          <div className="flex flex-col gap-2">
              <label className='text-md font-medium'>Professional Headline</label>
            <input type="tel" className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your Full name' />
          </div>  
        </div>
        <div className='grid grid-cols-2 gap-4 p-2 mt-4'>
             <div className="flex flex-col gap-2">
              <label className='text-md font-medium'>Email</label>
            <input type="Email" className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your Full name' />
          </div>

          <div className="flex flex-col gap-2">
              <label className='text-md font-medium'>Phone number</label>
            <input type="tel" className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your Full name' />
          </div>
          <div className="flex flex-col gap-2">
              <label className='text-md font-medium'>Location</label>
            <input type="tel" className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your Full name' />
          </div>

          <div className="flex flex-col gap-2">
              <label className='text-md font-medium'>LinkedIn</label>
            <input type="text" className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your Full name' />
          </div>

          <div className="flex flex-col gap-2">
              <label className='text-md font-medium'>GitHub</label>
            <input type="text" className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your Full name' />
          </div>
          

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
