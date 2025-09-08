import React from 'react'
import {Eye,EyeOff} from "lucide-react"
function PasswordInput({name,placeholder,value,onChange,className=[]}) {

    const [isVisible,setIsVisible]=React.useState(false);


  return (
    <div>
        <div className='flex flex-col gap-2 h-full'>
     <label htmlFor="" className=' capitalize text-md font-medium'>{name}</label>
     <div className='relative w-full'>
         <input type={isVisible?"text":"password"}
      value={value} 
      onChange={onChange} 
      className={`py-2 px-4  placeholder:capitalize placeholder:p-1  border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`
      } 
        placeholder={placeholder}
        name={name}
      />
     <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            tabIndex={-1}
          >
            {isVisible ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
     </div>

    </div>
    </div>
  )
}

export default PasswordInput
