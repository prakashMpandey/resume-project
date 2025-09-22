import React, { useState } from 'react'
import Container from './Container'
import { X } from 'lucide-react'
import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/ApiList'
import { useDispatch } from 'react-redux'
import { changeLoadingState } from '../features/AuthSlice'
function Template_Selector({isOpen ,onClose}) {


  const dispatch=useDispatch();

  const navigate=useNavigate();
  const [templates,setTemplates]=useState([])
  const [selectedTemplate,setSelectedTemplate]=useState(null)


  useState(()=>{

    const fetchTemplates=async()=>{
      try {
        const response=await fetch("http://localhost:4000/api/v1/templates")
        const {templates}=await response.json();
        console.log(templates)
        setTemplates(templates);
      } catch (error) {
        console.log("Error fetching templates:",error);
      } 
    }
    fetchTemplates();
   

  },[isOpen])

    useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
        return () => (document.body.style.overflow = "auto");
      }, [isOpen]);
  
  if(!isOpen) return null;

  const handleSelectTemplate=(template)=>{
    console.log("Selected template ID:",template);
    setSelectedTemplate(template);
  }

  const closeModal=()=>{
    setSelectedTemplate(null);
    onClose();
  }

  const createNewResume=async(template)=>{
try {

  dispatch(changeLoadingState(true));
  
      const response=await api.post('/resumes',{
        templateId:template._id
      });
      const {data,success}=response.data;
  
      console.log(data,success)
      if(success){
        navigate(`/resume/${data._id}/edit`);
      }
     
  
} catch (error) {
  console.log("Error creating new resume:",error);
}
finally{
  dispatch(changeLoadingState(false));
  closeModal();
}
  }
  const selectedTemplateModal=()=>{
    if(!selectedTemplate) return null;

return (

  <div className="grid md:grid-cols-2 p-4 gap-5 grid-cols-1">

  <div className='p-2 '>
    <img src={selectedTemplate.thumbnail} alt="" className='w-full h-auto rounded-lg'/>
  </div>
  <div className='p-4 mb-4' >
    <h1 className='text-black capitalize border-b-1 border-gray-400 p-2 text-3xl font-bold'>{selectedTemplate.name}</h1>

    <div className='mt-4 text-gray-700'>
      <p className='text-lg'>Each template has been crafted with care to make designing your resume an absolute breeze for you.</p>

      <ul className='list-disc mt-2 ml-5 text-md space-y-1'>
        <li>A4 / US-Letter Size</li>
        <li>Editable Text</li>
        <li>Print ready format</li>
      </ul>
    </div>
    
    <button onClick={()=>{createNewResume(selectedTemplate)}} className='mt-5 bg-blue-600 px-5 py-2 rounded-lg text-white font-semibold hover:bg-blue-700 transition-all duration-200'>Use Template</button>
    </div>

  </div>
)
  }

  
  return (
    <div className='fixed z-50  inset-0 bg-[rgba(0,0,0,0.50)] flex justify-center   ' onClick={closeModal}>
      <div className='relative   bg-gray-200 p-10 shadow-lg mt-5 overflow-auto rounded-lg w-[80%] max-w-5xl' onClick={(e)=>e.stopPropagation()}>
    <button 
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" 
          onClick={closeModal}
        >
          <X size={40} />
        </button>


    {
      selectedTemplate ? selectedTemplateModal() : (

        <>
          <h1 className='text-black mt-2 text-3xl border-b-1 p-2 border-gray-400 '>Resume Templates</h1>

    <div className='grid md:grid-cols-3 grid-cols-2 gap-5 mt-4  p-4'>


    {
      templates.map((template)=>(
        <div onClick={()=>{handleSelectTemplate(template)}} key={template._id} className=' rounded-lg overflow-hidden cursor-pointer transition-all duration-200'>
        <img src={template.thumbnail} alt="" className='hover:scale-101  transition-all duration-200'/>
        <p className='text-black text-md capitalize '>{template.name}</p>
        </div>
      ))
    }


  

    </div>
        </>
      )
    }
    </div>
    </div>
  )
}

export default Template_Selector
