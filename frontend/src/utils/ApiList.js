import axios from "axios"

const api=axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL,
    headers:{
        "Content-Type":"application/json"
    },
    withCredentials:true

})

const loginUser=async(userData)=>{
    // const {username,password}=userData;
    console.log(userData)

    const {data}=await api.post("/users/signin",userData)
    return data;
    
}
const signUpUser=async(userData)=>{
    // const {username,password}=userData;
    console.log(userData)

    const {data}=await api.post("/users/signup",userData)

    return data;
}

export {loginUser,signUpUser}