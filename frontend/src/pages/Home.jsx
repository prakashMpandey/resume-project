import React, { useState,useEffect } from 'react'
import Container from '../components/Container'
import {FilePlus2,CirclePlus,Menu} from "lucide-react"
import Template_Selector from '../components/Template_Selector';
import { api } from '../utils/ApiList';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { changeLoadingState } from '../features/AuthSlice';
function Home() {
  const navigate=useNavigate()

  const dispatch=useDispatch()
  const [resumes,setResumes]=useState([]);
const [isTemplateMenuOpen,setIsTemplateMenuOpen]=useState(false);


const handleTemplateOpen=()=>{
  setIsTemplateMenuOpen(true);
}

const handleTemplateClose=()=>{
  setIsTemplateMenuOpen(false);
}

useEffect(() => {


  const fetchResumes=async()=>{
    dispatch(changeLoadingState(true))
    const response=await api.get('/resumes');

    const {data}=response.data;

    setResumes(data);

    console.log(resumes)

    dispatch(changeLoadingState(false))
  }
  fetchResumes()
}, [])

const navigateEdit=(resumeId)=>{
  navigate(`/resume/${resumeId}/edit`)
}



  return (
  <Container className='py-10 relative'>

<Template_Selector isOpen={isTemplateMenuOpen} onClose={handleTemplateClose}/>

    <div className='flex  md:justify-between gap-4'>

    <div>
      <h2 className='text-black font-bold'>My resumes</h2>
      <p className='text-gray-700 capitalize'>Start building your professional resumes</p>
    </div>
   <div className='flex gap-2 '>
   <button onClick={handleTemplateOpen} className='bg-gray-700  px-2 rounded-lg text-white  text-md font-semibold '>Templates</button>
     <button  className='bg-blue-600 py-1 px-2  rounded-lg text-white text-md flex gap-2 items-center justify-center'> <FilePlus2 className='' /><p>Create new</p> </button>
   </div>
    </div>

    <Container className='py-10'>
    {
      resumes.length==0 ? 
      <div className='flex flex-col gap-2 items-center justify-center '>
      <div className='bg-gray-100 text-green-500 p-4 rounded-full'> <FilePlus2 className='w-6 h-6'/></div>
      <h2 className='text-center font-bold text-xl text-gray-900 '>No Resumes Yet </h2>
      <p>You haven't created any resumes Start building ...</p>

      <button  onClick={handleTemplateOpen} className='mt-2 flex items-center justify-center gap-3 bg-blue-600 p-4 capitalize  rounded-xl text-white font-semibold text-lg hover:bg-blue-700 transition-all duration-200'>Create Your First Resume <FilePlus2/></button>



      </div> :<div className='grid md:grid-cols-3 grid-cols-2 gap-2'>

      <div onClick={handleTemplateOpen} className='py-10 px-6  border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center gap-2 flex-col bg-white/4 hover:bg-gray-200 hover:shadow-lg cursor-pointer transition-all duration-200'>

      <div  className='p-4 mb-2 text-white bg-blue-600 rounded-full'>
        <CirclePlus size={40} className='w-8 h-8'/>
      </div>
      <h2 className='text-black text-xl capitalize font-semibold'> New Resume</h2>
      </div> 
      {
        resumes.map((resume)=>(
          <div key={resume?._id} className='  relative  rounded-lg'  onClick={()=>{navigateEdit(resume?._id)}}>

          <div className='  border-b rounded-lg  border-gray-200 overflow-hidden '>
          <img src="960.webp" alt="" />
          </div>
          <div className='flex justify-between p-2 items-center'>
          <div className='  '>
              <h2 className='font-semibold text-black text-lg '>{resume?.name || "new Resume"}</h2>
              <p className='text-gray-700 text-lg '>Last updated {resume?.updatedAt || "28 sept 2025"}</p>
       
          </div>


          </div>
          

          </div>
        ))
      }


      </div>
    }
    </Container>

 
  </Container>
  )
}

export default Home
