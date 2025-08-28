import React from 'react'

const Header = () => {
  return (
    <div className='bg-[#0077b6] text-white p-4  h-[60px] flex justify-between'>
     <div>
       <h1 className='text-lg font-bold'>Resume Builder</h1>
     </div>

      <div className='flex justify-end   h-full mr-2'>
        {/* <button className='bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200'>
          Logout</button> */}
        <button className='bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200'>
          Sign up</button>
        <button className=' text-[#154D71] px-4 py-2 rounded hover:bg-gray-200'>
          Sign In</button>
      </div>
    </div>
  )
}

export default Header
