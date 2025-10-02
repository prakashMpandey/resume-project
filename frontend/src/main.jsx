import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'

import {Toaster} from "react-hot-toast"
import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider, Navigate} from "react-router-dom"
import LandingPage from './pages/LandingPage.jsx'
import  Home  from "./pages/Home.jsx"
import ProtectedRoutes from './components/ProtectedRoutes.jsx'
import Header from './components/partials/Header.jsx'
import App from './App.jsx'
import { useSelector } from 'react-redux'
import ResumeCreationDashboard from './pages/ResumeCreationDashboard.jsx'
import {PersistGate} from "redux-persist/integration/react"
import {store,persistor} from "./store/store.js"

const RedirectUser=({children})=>{
  const {isAuthenticated,user}=useSelector((state)=>state.auth)
  if(isAuthenticated && user)
  {
    return <Navigate to="/home" />
  }
  return children;
}

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/"element={<App/>} >
      <Route index element={<RedirectUser><LandingPage/></RedirectUser>}/>
      <Route path="home" element={<ProtectedRoutes><Home/></ProtectedRoutes>}/>
      <Route path="resume/:id/edit" element={<ProtectedRoutes><ResumeCreationDashboard/></ProtectedRoutes>}/>
    </Route>

  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
    <Toaster position="top-center" reverseOrder={false} />
       <RouterProvider router={router}/>
</PersistGate>
    </Provider>
  </StrictMode>
)
