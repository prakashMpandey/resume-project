import React, { Children } from 'react'
import { X } from 'lucide-react'
function ModalComponent({Children,isOpen,onClose}) {

    if(!isOpen)
    {
        return;
    }
  return (
    <div >
     <div className='relative   bg-gray-200 shadow-lg mt-5 overflow-auto rounded-lg w-[80%] max-w-5xl' onClick={(e)=>e.stopPropagation()}>
   <div className='"absolute top-4 right-2'>
     <button 
          className= " text-gray-600 hover:text-gray-900" 
          onClick={onClose}
        >
          <X size={40} />
        </button>
   </div>
   </div>
   <Children/>
    </div>
  )
}

export default ModalComponent
