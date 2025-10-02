import React from 'react'
import { X ,LoaderCircle} from 'lucide-react';
function DeleteModal({isOpen,onClose,handleDelete,isLoading}) {


    if(!isOpen)
    {
        return;
    }
  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div
        className="relative w-[90%] max-w-md rounded-2xl bg-white shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
    
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
          onClick={onClose}
        >
          <X size={24} />
        </button>

    
        <h2 className="mb-4 text-xl font-bold text-gray-800">Delete Resume</h2>

      
        
          <p className="text-sm font-medium text-gray-600">
            Do you want to delete the resume ?
          </p>
         

      
        <div className="flex justify-end gap-3">
          <button
            className="rounded-lg bg-gray-200 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-300 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 transition"
            onClick={handleDelete}
          >
          {isLoading ? <LoaderCircle className="animate-spin"/> : <p> Delete</p>}
            
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
