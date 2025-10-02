import Template from "../models/template.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.utils.js"

const addTemplate=async(req,res)=>{
  try {

      let {name,category,componentName,sections}=req.body;

      if(typeof(sections) =="string")
      {
        sections=JSON.parse(sections)
      }

      console.log(sections,(typeof(sections)))
     
      const thumbnailLocalPath=req.file?.path;
  
      if(!thumbnailLocalPath)
      {
         throw new error("thumbnail file not found")
          
      }
      const thumbnailUrl=await uploadOnCloudinary(thumbnailLocalPath)
  
  
      if(!thumbnailUrl){
          return res.status(500).json({
              message:"file cannot be uploaded"
          })
      }
  
      const newTemplate= Template.create({
          name,
          category,
          componentName,
          thumbnail:thumbnailUrl.secure_url,
          sections:[...sections]
      })
  
      return res.status(201).json({
          message:"template added successfully",
          template:newTemplate
      })

  } catch (error) {
    return res.status(500).json({
        message:error.message
    })
  }
    
}

const getAllTemplates=async(req,res)=>{
    try {
        const templates=await Template.find({});

        if(!templates || templates.length===0){
            return res.status(404).json({
                message:"no templates found"
            
            })
        }
        return res.status(200).json({
            message:"templates fetched successfully",
            templates
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }   
}

export {addTemplate,getAllTemplates}