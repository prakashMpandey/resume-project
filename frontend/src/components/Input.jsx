import React from 'react'

const Input=({label,value,onChange,placeholder,name,type='text',className=[] ,...props}) =>{
  return (
    <div className='flex flex-col gap-2'>
    {label &&  <label htmlFor="" className=' capitalize text-md font-medium'>{label}</label>}
      <input type={type} 
      value={value} 
      onChange={onChange} 
      className={`py-2 px-4 placeholder:capitalize placeholder:p-1  border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`
      } 
        placeholder={placeholder}
        name={name}
        {...props}
      />

    </div>
  )
}

export default Input;
