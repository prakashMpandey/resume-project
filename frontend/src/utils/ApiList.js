import axios from "axios"


const api=axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL,
    headers:{
        "Content-Type":"application/json"
    },
    withCredentials:true

})

const SIGN_IN_API="/users/signin"
const SIGN_UP_API="/users/signup"
const LOG_OUT_API="/users/logout"
const GET_USER_API="/users/user"


export const getResume=async(resumeId)=>{
  try {
    if(!resumeId)
    {
      return
    }

    const response=await api.get(`/resumes/${resumeId}`);

    return response.data.data;
    
  } catch (error) {
    console.log(error)
  }
}

export const updateResume=async(resumeId,section,resume)=>{

  if(!resume)
  {
    return;
  }

  const response=await api.put(`/resumes/${resumeId}`,{section,data:resume[section]})

  return response;
}

export const saveResume=async(resumeId,thumbnail)=>{


  console.log(resumeId,thumbnail)
  const formData=new FormData();
  formData.append("resumeId", resumeId);// object ko string karo
formData.append("thumbnail",thumbnail );
  
console.log(formData)
  const response=await api.patch(`/resumes/${resumeId}`,formData, {
  headers: { "Content-Type": "multipart/form-data" }});
console.log(response)
  return response;
}

export const deleteResume=async(resumeId)=>{
  try {
      if(!resumeId)
      {
          console.log('resumeId NOT foud')
      }
      const response=await api.delete(`/resumes/${resumeId}`)
return response;
  } catch (error) {
    return {success:false,message:error?.message || "some thing went wrong"}
  }
}
export const ADD_RESUME='/resumes'







export {SIGN_IN_API,SIGN_UP_API,LOG_OUT_API,api,GET_USER_API}