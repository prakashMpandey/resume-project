import React from 'react'
import { ArrowRight, Download,FileCheck2,ClockFading } from 'lucide-react'
import Container from '../components/Container'
function LandingPage() {
  return (
    <div className='p-4'>

  <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <h1 className='text-4xl font-bold sm:text-6xl text-black lg:text-7xl'>Craft</h1>
          <div className='relative inline-flex flex-col '>
            <h1 className=" text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
              Professional 
              
              <div className='block relative '>
              <span className="text-green-600 relative inline-block">
              Resumes
                <div className='absolute bottom-0 left-0 h-1 bg-green-500 rounded-full w-full animate-underline'>
                </div>
              </span>
                
              </div>
            </h1>

            <p className='mt-6 capitalize text-base font-semibold text-gray-900 sm:text-xl'><span >Create Job Winning resumes with expertly designed templates </span> <span>
              ATS friendly , recruiters friendly and tailored to your career goals
            </span> </p>
            
            <div className='mt-10 flex  sm:items-center sm:gap:4 gap-6'>

            <button className='flex gap-1 bg-green-600 p-2  py-2 rounded-lg text-white font-semibold hover:bg-green-700 text-lg'>
           <span>Start Building</span> 
              <ArrowRight className='inline-block ml-2 animate-pulse'/>
            </button>
            <button className='bg-blue-600 p-2 pxy-3 rounded-lg text-white font-semibold hover:bg-blue-800 text-lg'>
            View Templates
          
            </button>
            </div>
          </div>
        </div>

       
        <div>
          <img src="./resume.png" className="w-full "  alt="Hero" />
        </div>
      
      </div>

      <Container className='py-10 bg-green-50 mt-16 rounded-lg'>
      <h2 className='text-3xl font-bold text-center mb-8'>Why Choose Our Resume Builder</h2>

      <div className='grid md:grid-cols-3 gap-8 sm:grid-cols-1'>
     
       <div className='bg-gray-50 text-center flex p-6 rounded-lg shadow-sm items-center flex-col mx-auto mb-4 '>
      
      <div className='bg-blue-500 rounded-lg p-2 text-white font-bold text-center '>

<FileCheck2 className='w-full '/>
      </div>
      <h2 className='text-black my-1 text-lg font-bold capitalize text-center '>ATS Friendly Templates</h2>
      <p className='text-gray-700 font-semibold'>Pass through applicant tracking systems with optimized formats</p>
      </div>

      <div className='bg-gray-50 text-center flex p-6 rounded-lg shadow-sm items-center flex-col mx-auto mb-4 '>
      <div className='bg-orange-500 rounded-lg p-2 text-white font-bold text-center '>
<ClockFading className="w-full" />
      </div>
      <h2 className='text-black my-1 text-lg font-bold capitalize text-center '>Quick And Easy</h2>
      <p className='text-gray-700 font-semibold capitalize'>Make your resume in minutes not hours</p>
      </div>
      <div className='bg-gray-50 text-center flex p-6 rounded-lg shadow-sm items-center flex-col mx-auto mb-4 '>
      
    {/* card 1 */}
    
    
      <div className='bg-green-500 rounded-lg p-2 text-white font-bold text-center '>
<Download className='w-full '/>
      </div>
      <h2 className='text-black my-1 text-lg font-bold capitalize text-center '>Instant Export</h2>
      <p className='text-gray-700 font-semibold'>Download high quality PDF'S intantly with perfect formatting</p>
      </div>


      </div>

      </Container>

           <Container className='py-10 bg-green-50 mt-16 rounded-lg'>

      <div className="text-center mb-10">
        <h2 className='text-3xl font-bold mb-5'>Professional Resume Templates</h2>
        <p className='text-xl capitalize text-green-600 font-semibold'>Choose from our collection of professionally designed templates</p>

        <div className='grid md:grid-cols-3 gap-6 '>
          
        </div>
      </div>
      </Container>

      <Container className='py-10 bg-green-50 mt-16 rounded-lg'>

      <div>
  <h2 className="text-3xl font-bold text-center mb-12">Build Your Resume in 3 Easy Steps</h2>

  <div className='grid md:grid-cols-3 sm:grid-cols-1 gap-6'>
<div className="flex gap-1">
      <div className="text-5xl text-center mb-1 font-bold text-green-500 ">1.</div>
     <div>
       <h3 className="text-xl font-semibold mb-2">Choose a Template</h3>
      <p className="text-gray-600">Select from our professional templates designed for your industry</p>
     </div>
  </div>


 <div className="flex gap-1">
      <div className="text-5xl text-center mb-1 font-bold text-green-500 ">2.</div>
     <div>
       <h3 className="text-xl font-semibold mb-2">Fill  Your Details</h3>
      <p className="text-gray-600">Enter your personal information, work experience, education, skills, and more.</p>
     </div>
    </div>

    {/* 3 */}
  <div className="flex gap-1">
      <div className="text-5xl text-center mb-1 font-bold text-green-500 ">3.</div>
     <div>
       <h3 className="text-xl font-semibold mb-2">Download or Share</h3>
      <p className="text-gray-600">Once you're happy with your resume, download it in PDF, DOCX, or TXT format.</p>
     </div>
    </div>

   
  </div>
      </div>
      </Container>

 


      <Container className="py-16 bg-green-50 mt-16 rounded-lg">
      <div className='text-center max-w-3xl mx-auto'>

        <h2 className='text-2xl font-bold text-center'>Ready to Build Your Professional Resume</h2>
        <p className=' text-lg text-green-600'>Join thousands of professional who have landed their dream job</p>

        <button  className='mt-4 bg-green-600 transition-all duration-150 linear text-xl text-white font-bold text-center p-4 rounded-lg hover:bg-green-700'>Start Building Now</button>
      </div>
      </Container>

      </Container>
    </div>
  )
}

export default LandingPage
