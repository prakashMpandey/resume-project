import React from 'react'
import SignInform from '../components/SignInform'

function SignInPage() {
  return (
    <div className='min-w-full h-screen flex items-center bg-gray-100'>
      <div className='flex-1 bg-gradient-to-br from-orange-400 via-yellow-200 to-yellow-100 h-screen hidden md:flex flex-col items-center justify-center p-8 relative'>
        {/* Logo or Avatar */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2">
          <div className="bg-white/70 rounded-full p-3 shadow-lg">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="24" fill="#FDBA74"/>
              <circle cx="24" cy="18" r="8" fill="#FFF7ED"/>
              <rect x="12" y="30" width="24" height="10" rx="5" fill="#FFF7ED"/>
            </svg>
          </div>
        </div>
        {/* Glassmorphism Card */}
        <div className="mt-24 bg-white/40 backdrop-blur-lg rounded-2xl shadow-xl px-8 py-10 flex flex-col items-center max-w-md">
          <h1 className='text-4xl font-extrabold text-orange-800 mb-2 text-center drop-shadow'>
            Welcome Back!
          </h1>
          <p className='text-lg text-orange-900 mb-4 text-center'>
            Build your professional resume with ease.<br />
            <span className="text-orange-700 font-semibold">Sign in to continue your journey towards your dream job!</span>
          </p>
          <div className="my-4">
            {/* More detailed SVG illustration */}
            <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
              <ellipse cx="60" cy="90" rx="50" ry="8" fill="#FDBA74" />
              <rect x="30" y="40" width="60" height="30" rx="8" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="2"/>
              <rect x="45" y="55" width="30" height="6" rx="3" fill="#FDBA74"/>
              <circle cx="60" cy="32" r="12" fill="#FDBA74" stroke="#FFF7ED" strokeWidth="3"/>
            </svg>
          </div>
          <blockquote className="italic text-orange-700 text-center mt-2">
            “Your resume is your first impression. Make it count!”
          </blockquote>
        </div>
      </div>
      <div className='flex-1 min-w-full h-screen flex items-center justify-center'>
        <SignInform />
      </div>
    </div>
  )



}

export default SignInPage
