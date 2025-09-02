
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import ApiResponse from "../utils/ApiResponse.utils.js";
 const authenticate=async(req,res,next)=>{
    try {
        const token=req.cookies?.accessToken;
    
        if(!token){
            return res.json(new ApiResponse(401,null,"access denied"));
            
        }
       
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        const user=await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user){
           return res.status(401).json(new ApiResponse(401,null,"access denied"));
        }
        req.user=user;
    
        next();
    } catch (error) {
    return res.status(401).json(new ApiResponse(401,error,"access denied"));
    }
}

export default authenticate;