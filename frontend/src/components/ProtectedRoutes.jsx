import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate,useNavigate } from 'react-router';
function ProtectedRoutes({children}) {

const {isAuthenticated,user}=useSelector((state)=>state.auth);

console.log("isauthenticated",isAuthenticated)
  if(!isAuthenticated){
    return <Navigate to="/" replace />
}
return children;
}

export default ProtectedRoutes
