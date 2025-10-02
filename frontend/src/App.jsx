import { useEffect, useState } from "react";
import "./App.css";
import ResumeCreationDashboard from "./pages/ResumeCreationDashboard";
import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";
import SignInPage from "./pages/SignInPage";
import SignInform from "./components/SignInform";
import SignUpForm from "./components/SignUpForm";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { checkAuth } from "./features/AuthSlice";
import Loader from "./components/loader/Loader";


function App() {

  const dispatch=useDispatch()
  const [isAuthModelVisible, setAuthModalVisible] = useState(false);
  const [authType, setAuthType] = useState("");
  

  const openAuthModal = (type) => {
    setAuthType(type);
    setAuthModalVisible(true);
  };
  const closeAuthModal = () => {
    setAuthModalVisible(false);
  };
  const switchAuthType = (type) => setAuthType(type);


useEffect(() => {
  
  
    dispatch(checkAuth());
  
}, [dispatch]);


const { isCheckingAuth } = useSelector((state) => state.auth);

if (isCheckingAuth) {
  
return <Loader/>

  
}

  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen grid grid-cols-1 gap-1">
      <Header openAuthModal={openAuthModal} closeAuthModal={closeAuthModal} />

      <div
        className="overlay fixed inset-0  bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50"
        style={{ display: isAuthModelVisible ? "flex" : "none" }}
      >
        {authType === "signin" ? (
          <SignInform
            switchAuthType={switchAuthType}
            closeAuthModal={closeAuthModal}
          />
        ) : (
          <SignUpForm
            switchAuthType={switchAuthType}
            closeAuthModal={closeAuthModal}
          />
        )}
      </div>
    
      {/* <ResumeCreationDashboard/> */}
     <div className="h-[calc[100vh-60px]]">
       <Outlet/>
     </div>
      <Footer />
    </div>
  );}

export default App;
