import { useEffect, useState } from 'react'
import './App.css'
import SideMenu from './components/SideMenu'
import Header from './components/Header'
import Preview from './components/Preview'
import Footer from './components/Footer'
import PersonalInfoForm from './components/PersonalInfoForm'
function App() {
 

    const [text,setText]=useState('')

    useEffect(()=>{

    })
  return (
  <div className='bg-gray-100  '>

  <Header/>
     <div className="flex flex-row gap-4 h-[calc(100vh-30px)] my-1   lg:my-5 xl:my-8">
     <SideMenu />
  <div className='p-2 '>
    <PersonalInfoForm/>
  </div>
  <div className='p-2  overflow-auto h-[calc(100vh-30px)]'>
    <Preview/>
  </div>
  
     </div>
  <Footer/>
  
  </div>
     
    
  )
}

export default App



