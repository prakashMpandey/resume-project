import { useEffect, useState } from 'react'
import Form from './components/Form'
import './App.css'
import Resume from './components/Resume'
import SideMenu from './components/SideMenu'
function App() {
 

    const [text,setText]=useState('')

    useEffect(()=>{

    })
  return (
  <div className='bg-gray-100 h-screen w-full'>
     <div className="flex gap-2 items-center justify-center h-screen">
     <SideMenu/>
   {/* <Form  text={text} setText={setText}/>
      <Resume text={text}/> */}
     </div>
  
  </div>
     
    
  )
}

export default App



