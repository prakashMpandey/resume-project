import React, { use } from 'react'
import {NavLink} from "react-router-dom"
import {useSelector,useDispatch} from 'react-redux'
import {changeLoadingState, logout} from "../../features/AuthSlice.js"
import {toast} from "react-hot-toast"
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const Header = ({openAuthModal,closeAuthModal}) => {

   const navigate=useNavigate();

  const dispatch=useDispatch();
  const handleSignInClick=()=>{
    openAuthModal('signin');
  }
  const handleSignUpClick=()=>{
    openAuthModal('signup');
  }


  const handleLogout=async()=>{
  try {
   dispatch(changeLoadingState(true));
  const result=await dispatch(logout());
    
  if(result?.payload?.success){
    toast.success("logged out successfully")
  }
  navigate('/')

  } catch (error) {
    toast.error(error?.message || "logout failed" )
  }
    finally{
      dispatch(changeLoadingState(false));
    }
  }

  const {isAuthenticated,user}=useSelector((state)=>state.auth);

  
  return (
    <header className=''>
    <div className='px-4 mx-auto sm:px-6 lg:px-8'>
<div className="flex items-center justify-between h-16 lg:h-20">
       <div className='flex-shrink-0'>
       <h1 className='text-lg font-bold'>Resume Builder</h1>
     </div>

      <div className='flex ml-auto gap-4 items-center text-lg  lg:items-center lg:justify-center lg:space-x-10  '>
        {
          isAuthenticated ? (
            <div className="flex gap-4 items-center">
              <button  onClick={handleLogout} className='flex gap-1 items-center bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700'>
          Log out <ArrowRight/></button>

          
            </div>
          ) : (
          <div className='flex gap-4 items-center'> 
          <NavLink className={`text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80`}>About Us</NavLink>
          <NavLink className={`text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80`}>Contact Us</NavLink>
        <button onClick={handleSignInClick} className='px-4 py-1 rounded text-base font-semibold text-black transition-all duration-200 hover:color-red-500 hover:text-opacity-80'>
        Sign In</button>
        <button onClick={handleSignUpClick} className=' px-4 py-1 rounded text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80'>
          Sign Up</button>
          </div>
          )
        }
        {/*  */}
          
      </div>

      </div>
</div>

    
    </header>
  )
}

export default Header
