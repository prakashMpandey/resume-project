import React from 'react'
import RenderResume from '../RenderResume'
import { useEffect,useRef } from 'react';

import { X ,DownloadIcon} from 'lucide-react';
function Preview({resumeData,templateComp,isOpen,onClose,handleDownload}) {


   useEffect(() => {
          if (isOpen) {
            document.body.style.overflow = "hidden";
          } else {
            document.body.style.overflow = "auto";
          }
          return () => (document.body.style.overflow = "auto");
        }, [isOpen]);

        if(!isOpen)
        {
          return;
        }
  
  


  return (
   <div className='fixed z-50   inset-0 bg-[rgba(0,0,0,0.50)] flex justify-center ' onClick={onClose}>
      <div className='relative   bg-white shadow-lg w-full mt-5 overflow-auto rounded-lg md:w-[70%] md:max-w-5xl' onClick={(e)=>e.stopPropagation()}>
   <div className='"absolute top-4 right-2'>
    <div className='flex justify-end items-center gap-2 my-2'>

       <button 
          className= " outine-gray-500 flex gap-2 text-lg shadow-sm shadow-gray-200 bg-white font-bold rounded-lg  items-center hover:text-gray-900 px-2 py-2.5 text-capitalize " 
          onClick={handleDownload}
        >
          <DownloadIcon size={20} /> <p>Download</p>
          </button>
       <button 
          className= " text-gray-600 hover:text-gray-900" 
          onClick={onClose}
        >
          <X size={40} />
        </button>
    </div>
   </div>

      <div className='' >
          <RenderResume isPrint={true} templateComp={templateComp} resumeData={resumeData}/>
        </div>
        </div>

      
        </div>
  )
}

export default Preview
