import React from 'react'

function Form({text,setText}) {



  return (
    <div className=''>
      <input value={text} className='bg-black' onChange={(e)=>setText(e.target.value)} type="text" />
    </div>
  )
}

export default Form
