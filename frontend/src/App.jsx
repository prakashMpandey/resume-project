import { useEffect, useState } from 'react'
import './App.css'
import ResumeCreationDashboard from './pages/ResumeCreationDashboard'
import Header from './components/partials/Header'
import Footer from './components/partials/Footer'

function App() {
 

    const [text,setText]=useState('')

    useEffect(()=>{

    })
  return (
  <div className='bg-gray-100  '>

  <Header/>
  <ResumeCreationDashboard/>
  <Footer/>
  
  </div>
     
    
  )
}

export default App



