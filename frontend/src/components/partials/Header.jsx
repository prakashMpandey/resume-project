import React from 'react'

const Header = ({openAuthModal,closeAuthModal}) => {

  const handleSignInClick=()=>{
    openAuthModal('signin');
  }
  const handleSignUpClick=()=>{
    openAuthModal('signup');
  }
  
  return (
    <div className='bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 text-white p-4  h-[60px] flex justify-between'>
     <div>
       <h1 className='text-lg font-bold'>Resume Builder</h1>
     </div>

      <div className='flex justify-end items center   h-full mr-2'>
        {/* <button className='bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200'>
          Logout</button> */}
        <button onClick={handleSignInClick} className='bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200'>
          Sign In</button>
        <button onClick={handleSignUpClick} className=' text-[#154D71] px-4 py-2 rounded hover:bg-gray-200'>
          Sign Up</button>
      </div>

      <div>

      </div>
    </div>
  )
}

export default Header
