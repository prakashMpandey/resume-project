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
export const ADD_RESUME='/resumes'







export {SIGN_IN_API,SIGN_UP_API,LOG_OUT_API,api,GET_USER_API}