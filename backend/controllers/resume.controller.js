import {Resume} from "../models/resume.model.js"
import ApiResponse from "../utils/ApiResponse.utils.js"
import Template from "../models/template.model.js"
const createResume=async(req,res)=>{
   try {
     const {templateId}=req.body;
     const userId=req.user?._id;
 
     if(!userId){
         return res.status(401).json(new ApiResponse(401,null,"unauthorized request"))
     }
 
     if(!templateId){
         return res.status(400).json(new ApiResponse(400,null,"template is required"))
     }
 
 
     const isTemplateExists=await Template.findById(templateId);

     if(!isTemplateExists){
        throw new Error("template does not exists")
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
         template:templateId
     })
 
        if(!createdResume){
         return res.status(500).json(new ApiResponse(500,null,"something went wrong"))
        }
 
        return res.status(201).json(new ApiResponse(200,createdResume,"resume created successfully"))
 
     
   } catch (error) {
    
    return res.status(500).json(new ApiResponse(500,error,"something went wrong"))
   }
}
const updateResume=async(req,res)=>{
   try {
     const {resumeId}=req.params;
     const userId=req.user?._id
     const {section,data}=req.body;
 
     if(!resumeId){
         return res.status(400).json(new ApiResponse(400,null,"resume id is required"))
     }
 
     if(!section || !data){
         return res.status(400).json(new ApiResponse(400,null,"data is missing"))
     }
 
     const resume=await Resume.findOne({$and:[{userId:userId},{_id:resumeId}]})
 
    
     if(!resume){
         return res.status(404).json(new ApiResponse(404,null,"resume does not exists"))
     }
 
     
     resume[`${section}`]=data;
     await resume.save({validateBeforeSave:false});    
     return res.status(200).json(new ApiResponse(200,resume,"resume updated successfully"))
   } catch (error) {
    return res.status(500).json(new ApiResponse(500,null,"internal server error"));
   }
}

const deleteResume=async(req,res)=>{
   try {
     const {resumeId}=req.params;
 
     if(!resumeId){
         return res.status(400).json(new ApiResponse(400,null,"resume Id is required"))
     }
 
     const resume=await Resume.findById(resumeId);
     if(!resume){
         return res.status(404).json(new ApiResponse(404,null,"no resume found"))
     }
 
  const deletedResume=await Resume.deleteOne({_id:resumeId});

     if(!deletedResume){
        return res.status(500).json(new ApiResponse(500,null,"resume cannot be deleted"))
     }

     return res.status(200).json(new ApiResponse(200,null,"resume deleted successfully"))
 
     
   } catch (error) {
    
    return res.status(500).json(new ApiResponse(500,null,"resume cannot be deleted"))
   }

}
const getUserAllResume=async(req,res)=>{
   try {
     const userId=req.user?.id;
     
 
     if(!userId){
         return res.status(401).json(new ApiResponse(401,null,"unauthorized access"))
     }
 
     const resumes=await Resume.find({userId:userId})
 
     if(!resumes){
         return res.status(404).json(new ApiResponse(404,null,"no resume found"));
     }
 
     if(resumes.length==0){
          return res.status(200).json(new ApiResponse(200,resumes,"there is no resume"));
     }
 
     return res.status(200).json(new ApiResponse(200,resumes,"resumes fetched successfully"))
 
   } catch (error) {
    return res.status(500).json(new ApiResponse(500,null,"something went wrong"))
   }
}
const getResume=async(req,res)=>{

    try {
        const {resumeId}=req.params;
    
        if(!resumeId){
            return res.status(400).json(new ApiResponse(400,null,"resume id is required"))
        }
    
        const resume=await Resume.findById(resumeId);
        if(!resume){
            return res.status(404).json(new ApiResponse(404,null,"resume not found"))
        }
    
        return res.status(200).json(new ApiResponse(200,resume,"resume fetched successfully"))
    } catch (error) {

        return res.status(500).json(new ApiResponse(500,null,"something went wrong"))
        
    }
}


export {createResume,deleteResume,getResume,getUserAllResume,updateResume}