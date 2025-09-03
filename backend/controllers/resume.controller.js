import {Resume} from "../models/resume.model.js"
import ApiResponse from "../utils/ApiResponse.utils.js"

const createResume=async(req,res)=>{
   try {
     const {template}=req.body;
     const userId=req.user?._id;
 
     if(!userId){
         return res.status(401).json(new ApiResponse(401,null,"unauthorized request"))
     }
 
     if(!template){
         return res.status(400).json(new ApiResponse(400,null,"template is required"))
     }
 
 
    
 
     const createdResume=await Resume.create({
          userId:userId,
         personalInfo:{
             fullName:"",
             email:"",
             mobileNo:"",
             linkedIn:"",
             github:"",
             headline:"",
             location:"",
             summary:""
         },
         education:[],
         experience:[],
         skills:[],
         certificates:[],
         projects:[],
         template:template
     })
 
        if(!createdResume){
         return res.status(500).json(new ApiResponse(500,null,"something went wrong"))
        }
 
        return res.status(201).json(new ApiResponse(200,createdResume,"resume created successfully"))
 
     
   } catch (error) {
    
    return res.status(500).json(new ApiResponse(500,error,"something went wrong"))
   }
}

const updateResume=async(req,res)=>{}
const deleteResume=async(req,res)=>{}
const getUserAllResume=async(req,res)=>{}


export {createResume}