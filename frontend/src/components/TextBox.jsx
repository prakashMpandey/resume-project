import React from 'react'

function TextBox( {name,label,value,onChange,placeholder}) {
  return (
   
     <div className="flex flex-col gap-2 mt-2">
              <label className="text-md font-medium">{label}</label>
              <textarea
                value={value}
                name={name}
                onChange={onChange}
                className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder={placeholder}
              ></textarea>
            </div>
      
    
  )
}

export default TextBox
