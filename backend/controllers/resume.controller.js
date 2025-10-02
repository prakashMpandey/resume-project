import {Resume} from "../models/resume.model.js"
import ApiResponse from "../utils/ApiResponse.utils.js"
import Template from "../models/template.model.js"
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.utils.js";
import { ChildProcess } from "child_process";
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
const updateResumeSection=async(req,res)=>{
   try {
     const {resumeId}=req.params;
     const userId=req.user?._id
     const {section,data}=req.body;

     console.log("current data :",section,data)

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

     console.log("response",resume)
     return res.status(200).json(new ApiResponse(200,resume,"resume updated successfully"))
   } catch (error) {
    return res.status(500).json(new ApiResponse(500,null,"internal server error"));
   }
}

const updateResumeThumbNail=async(req,res)=>{
   try {

     const {resumeId}=req.params;
     const userId=req.user?._id

 const thumbnailPath=req.file?.path
 
 if(!thumbnailPath)
 {
     throw new Error("no thumbnail path found")
 }
 
     if(!resumeId){
          return res.status(400).json(new ApiResponse(400,null,"resume id is required"))
      }
 
      const resume=await Resume.findOne({$and:[{userId:userId},{_id:resumeId}]})
 
      if(!resume)
      {
         throw new Error("resume does not exists");
      }
 
      const thumbnailUrl=await uploadOnCloudinary(thumbnailPath);
 
      console.log("thumbnail :" ,thumbnailUrl)
      if(!thumbnailUrl)
      {
         throw new Error("no thumbnail url found")
      }
 
      resume.currentThumbNail=thumbnailUrl.url;
      await resume.save({validateBeforeSave:false});

      console.log(resume)
 
      return res.status(200).json(new ApiResponse(200,resume,"resume updated successfully"))
 
   } catch (error) {
    console.log(error)
    throw new Error("something went wrong")
   }
    //  const updateResume= await Resume.findByIdAndUpdate(resumeId,,{new:true});


     

}

const saveResume=async(req,res)=>{

    
    const {resumeId}=req.params;
    const {content}=req.body;


    if(!resumeId)
    {
        throw new Error("resume id not found")
    }

    if(!content)
    {
        throw new Error("no content form");
    }
     const data=JSON.parse(content);
   

     const resume=await Resume.findOne({$and:[{userId:req.user._id},{_id:resumeId}]});

     if(!resume)
     {
        throw new Error("no resume found");
     }

     const updateResume=await Resume.findByIdAndUpdate(resumeId,{$set:data,});

     console.log("update resume :",updateResume)
   
    return res.status(200).json(new ApiResponse(200,null,"resume updated"))

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
 
     const resumes=await Resume.find({userId:userId}).populate("template")
 
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
    
        const resume=await Resume.findById(resumeId).populate("template");
        if(!resume){
            return res.status(404).json(new ApiResponse(404,null,"resume not found"))
        }
    
        return res.status(200).json(new ApiResponse(200,resume,"resume fetched successfully"))
    } catch (error) {

        return res.status(500).json(new ApiResponse(500,null,"something went wrong"))
        
    }
}

export const updateResumeImage=async(req,res)=>{
 try {
    console.log("hello")
       const {resumeId}=req.params;
       const resumeImageLocalPath=req.file?.path;
   
       console.log(req.file)
       if(!resumeImageLocalPath)
       {
           throw new Error("no image found");
       }
   
       const resume=await Resume.findOne({$and:[{_id:resumeId },{userId:req.user._id}]})
   
       if(!resume)
       {
           throw new Error("no resume found to update")
       }


       const CloudinaryresumeImage=await uploadOnCloudinary(resumeImageLocalPath);
   
       if(!CloudinaryresumeImage)
       {
           throw new Error("file not uploaded on cloudinary")
       }

       if(resume.resumeImage!="")
       {
        let resumePublicUrl=resume.personalInfo.resumeImage;
           resume.personalInfo.resumeImage=CloudinaryresumeImage.url;
        await deleteOnCloudinary(resumePublicUrl);
       }
       else{
          resume.personalInfo.resumeImage=CloudinaryresumeImage.url;
       }
   
   
       await resume.save({validateBeforeSave:false});

       return res.status(200).json(new ApiResponse(200,null,"resume image updated successfully"))
 } catch (error) {
    throw new Error(error.message || "something went wrong")
 }

}


export {createResume,deleteResume,getResume,getUserAllResume,updateResumeThumbNail,updateResumeSection,saveResume}