import { useState } from 'react'
import './App.css'
import ResumeCreationDashboard from './pages/ResumeCreationDashboard'
import Header from './components/partials/Header'
import Footer from './components/partials/Footer'
import SignInPage from './pages/SignInPage'
import SignInform from './components/SignInform'
import SignUpForm from './components/SignUpForm'

function App() {
  const [isAuthModelVisible, setAuthModalVisible] = useState(false);
  const [authType, setAuthType] = useState('');

  const openAuthModal = (type) => {
    setAuthType(type);
    setAuthModalVisible(true);
  }
  const closeAuthModal = () => {
    setAuthModalVisible(false);
  }

  // Handler to switch between sign in and sign up
  const switchAuthType = (type) => setAuthType(type);

  return (
    <div className='bg-gray-100'>
      <Header openAuthModal={openAuthModal} closeAuthModal={closeAuthModal} />

      <div className="overlay fixed inset-0  bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50" style={{ display: isAuthModelVisible ? 'flex' : 'none' }}>
        {authType === 'signin' ? (
          <SignInform switchAuthType={switchAuthType} closeAuthModal={closeAuthModal} />
        ) : (
          <SignUpForm switchAuthType={switchAuthType} closeAuthModal={closeAuthModal} />
        )}
      </div>

      {/* <ResumeCreationDashboard/> */}
      
      <Footer />
    </div>
  )
}

export default App



